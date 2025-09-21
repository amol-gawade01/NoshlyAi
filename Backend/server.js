const app = require('./app')
const http = require('http')
const connectToDB = require('./DB/db')
const {Server} = require('socket.io')
const port = process.env.PORT || 3000 
const cronJob = require('./utils/cronJob')
const server = http.createServer(app)
connectToDB();

const io = new Server(server, {
  cors: { origin: "*" },
});

server.listen(port,() => {
    console.log(`server is running on port ${port}`)
})

cronJob();
module.exports.io = io;


