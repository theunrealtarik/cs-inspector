from flask_socketio import SocketIO
from pymem import Pymem
from lib.lib import Entity
from lib.offsets import *
from typing import List
import json


class Inspector():
  def __init__(self, process: Pymem, client, socket: SocketIO) -> None:
    self.process = process
    self.client = client
    self.socket = socket
  
  def update(self):
    self.entities: List[Entity] = []

    self.local_player = self.process.read_int(self.client + dwLocalPlayer)
    self.local_team = self.process.read_int(self.local_player + m_iTeamNum)
 
    for i in range(1, 64 + 1):
      entity = self.process.read_int(self.client + dwEntityList + i * 0x10)
      if not entity:
        continue
      
      entity_team = self.process.read_int(entity + m_iTeamNum)
      if entity_team != self.local_team:
        self.process.write_int(entity + m_bSpotted, 1)
        if len(self.entities) < 5:
          self.entities.append(Entity(
            addr=entity,
            team_id=entity_team,
            health=self.process.read_int(entity + m_iHealth),
            armor=self.process.read_int(entity + m_ArmorValue)
          ))

    self.data = json.dumps([vars(e) for e in self.entities])
    self.socket.emit("data", str(self.data))