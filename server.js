const io = require('socket.io')(3000, {
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
        socket.emit('user-joined', name); 
    })

    socket.on('send', message => {
        socket.emit('recieve', {message:message, name:users[socket.id]})
    })

    console.log("Connnection establised");
});