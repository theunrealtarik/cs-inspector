from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_socketio import SocketIO
from threading import Thread
from pymem import Pymem
import pymem.process as mem
import time
import os

from inspector import Inspector

app = Flask(__name__, static_folder='dist')
cors = CORS(app)
socket = SocketIO(app, cors_allowed_origins="*")

app.config['SECRET'] = "CSI"
app.static_folder = "dist"

@socket.on("connect")
def on_connect():
  print("connected")
  
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


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