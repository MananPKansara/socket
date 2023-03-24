const socket = io("http://127.0.0.1:3000");

do{
    user = prompt('Enter new user');
}while(user==null)
socket.emit('new-user-joined', user);

socket.on('my-self', (name) => {
    let heading = document.querySelector('.heading');
    heading.textContent = `Welcome ${name}`;
})  

socket.on('user-joined', (name) => {
    // console.log(`event emited for ${name}`);
    let elem = document.createElement('div');
    elem.classList.add('message', 'fs-4', 'text-center', 'my-5')
    elem.textContent =`${name} has joined the chat`;

    let messageContainer = document.querySelector('.message-container');
    messageContainer.appendChild(elem);
});

socket.on('recieve', (data) => {
    console.log("Recieved");
    let elem = document.createElement('div');
    elem.classList.add('message', 'fs-4', 'text-left', 'my-5')
    elem.textContent =`${data.name} : ${data.message}`;

    let messageContainer = document.querySelector('.message-container');
    messageContainer.appendChild(elem);
});

socket.on('user-recieve', (data) => {
    let elem = document.createElement('div');
    elem.classList.add('message', 'fs-4', 'my-5')
    elem.style.textAlign = 'right'
    elem.textContent =`${data.message}`;

    let messageContainer = document.querySelector('.message-container');
    messageContainer.appendChild(elem);
})

socket.on('userChecok', (user) => {
    console.log(user);
})

function sendMessage()
{
    let message = document.getElementById('message');
    socket.emit('send', message.value);
    message.value = "";
}
