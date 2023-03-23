const socket = io("http://127.0.0.1:3000");

let user = prompt('Enter new user');
socket.emit('new-user-joined', user);

socket.on('user-joined', function(name) {
    let elem = document.createElement('div');
    elem.id = "elem"
    elem.textContent =`${name} has joined the chat`;

    document.body.appendChild(elem)
});

socket.on('recieve', (data) => {
    console.log("Recieved");
});

socket.emit('send', "Manan")