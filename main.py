from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from threading import Thread
from pymem import Pymem
import pymem.process as mem
import time

from inspector import Inspector



app = Flask(__name__)
cors = CORS(app)
socket = SocketIO(app, cors_allowed_origins="*")

app.config['SECRET'] = "sex_legend"

@socket.on("connect")
def on_connect():
  print("connected")
  


# inspector loop
def update():
  while True:
    try:
      process = Pymem("csgo.exe")
      client = mem.module_from_name(process.process_handle, "client.dll").lpBaseOfDll
      socket.emit("game", f"{process.process_id}")

      Inspector(
        process,
        client,
        socket
      ).update()
    except:
      socket.emit("game", None)
      exit(1)
    
    time.sleep(0.2)

# run
if __name__ == "__main__":
  inspector = Thread(target=update)
  inspector.daemon = True
  inspector.start()
  socket.run(app)
  pass