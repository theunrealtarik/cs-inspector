![enter image description here](https://i.ibb.co/N7byhvx/Frame-14.png)

## CS-Inspector

CSI is a third-party software application designed for the popular online multiplayer game, Counter Strike Global Offensive. The program comes with a modern and user-friendly interface that enables players to easily inspect various aspects of their opponents' performance, such as their health, ammunition, location ...

### DISCLAIMER ⚠

It is worth noting that using CSI is considered cheating and is strictly prohibited by the game's developers. Players who are caught using this program risk having their accounts permanently banned from the game.

### Installation

CSI is currently undergoing development, it is currently possible to clone the repository and run the program on your device. To do so, you will need to download [Node](https://nodejs.org/en) and [Python3.11](https://www.python.org/) beforehand.

```
git clone https://github.com/Txreq/cs-inspector
cd cs-inspector
```

After that, it's necessary to obtain all the required dependencies and construct the web interface in the following manner:

```
pip install -r requirements.txt

cd client

npm install
npm run build
```

Go back to the root directory where `main.py` lives and run it using the Python interpreter

```
python main.py
```
