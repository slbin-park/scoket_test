const express = require('express');
const app = express();
const http = require('http');
// express http 서버 생성
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
// 중요한 함수 두가지
// socekt.on('이벤트 명 ', callback function)
// socket.on('이벤트 명',Data) 이벤트 명을 지정하고 데이터를 보냄
// connection 연결되었을때 , disconnection 열결이 해제되었을떄

// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//         io.emit('chat message', msg);
//     });
// });

io.on('connection', function (socket) {
    console.log(socket.id, 'Connected');
    io.emit('chat message', `${socket.id} 가 들어왔습니다.`);

    socket.on('chat message', (msg) => {
        console.log(`메세지 = ${msg}`)
        io.emit('chat message', msg);
    });

    socket.emit('msg', `${socket.id} 연결 되었습니다.`);

    socket.on('msg', function (data) {
        console.log(socket.id, data);
        socket.emit('msg', `Server : "${data}" 받았습니다.`);
    });

    socket.on('disconnect', () => {
        console.log('disconnect')
        io.emit('chat message', `${socket.id} 가 나갔습니다.`);
    })
});
// This will emit the event to all connected sockets
// 전체 사람에게 이벤트를 보냄


server.listen(3000, () => {
    console.log('listening on *:3000');
});