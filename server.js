const app = require('express')();
const server = require('http').createServer(app);


const io = require('socket.io')(server, {
        cors:
        {
                origin: "*"
        }
});

let users = {};

io.on('connection', socket => {

        socket.on('new-user-joined', name => { 
                console.log(`${name} joined chat`);
                users[socket.id] = name;
                // socket.emit('userChecok', users)
                socket.emit('my-self', name);
                socket.broadcast.emit('user-joined', name);
        })
        
        socket.on('send', message => {
                socket.emit('user-recieve', {message: message});
                socket.broadcast.emit('recieve', { message: message, name: users[socket.id] });
        })
        
        console.log("Connnection establised");
});

console.log(users);

server.listen(3000)
