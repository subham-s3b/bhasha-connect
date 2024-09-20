const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running.");
});

io.on('connection', (socket) => {
console.log('A user connected: ', socket.id);

  socket.emit('me', socket.id);


  socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on('callUser', ({ userToCall, signalData, from, name }) => {
		// console.log("UserCalled" )
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
		io.to(userToCall).emit('callNotification', { signal: signalData, from, name });

	  });
	
	  socket.on('answerCall', ({ signal, to }) => {
		io.to(to).emit('callAccepted', signal);
	  });
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));