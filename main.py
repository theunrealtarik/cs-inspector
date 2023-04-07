from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from threading import Thread
from pymem import Pymem
import pymem.process as proc
import time

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
      client = proc.module_from_name(process.process_handle, "client.dll").lpBaseOfDll
      
      print(process, client)
      
      if(client and process):
        socket.emit("game", f"{process.process_id}")
        
      
    except:
      socket.emit("game", None)
      pass
    time.sleep(1)

# run
if __name__ == "__main__":
  inspector = Thread(target=update)
  inspector.daemon = True
  inspector.start()
  socket.run(app)
  pass