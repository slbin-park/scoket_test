const express = require('express');
const app = express();
cors = require('cors');
const httpServer = require("http").createServer();
// express http 서버 생성
// const { Server } = require("socket.io");
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});//cors 오류로 인한 설정

app.use(cors());
app.use(express.json());

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

let room = []
// 룸생성 저장하는곳

io.on('connection', function (socket) {
    console.log(socket.id, '가 연결되었습니다.');

    // io.emit('message', `${socket.id} 가 들어왔습니다.`);
    io.emit('message', room);

    // 방만들기
    socket.on("roommake", (name) => {  //roomjoin 이벤트명으로 데이터받기 //socket.on
        console.log(name, '로 방이 만들어짐');
        room.push(name)
        console.log(room)
        io.emit('message', room);
        socket.join(name);               //userid로 방 만들기
    });

    // 룸 들어오기
    socket.on("roomjoin", (room_name) => {  //roomjoin 이벤트명으로 데이터받기 //socket.on
        console.log(room_name)
        socket.nickname = room_name.nickname;
        console.log('sk nickname = ', socket.nickname)
        console.log(socket.id)
        console.log(`${room_name.nickname} 님이 ${room_name.room} 으로 접속했습니다.`);
        socket.join(room_name.room); // room으로 접속
        // console.log(socket.rooms)
        io.to(room_name.room).emit('chat message', { message: `${socket.nickname} 님이 접속했습니다.` });
    });

    // 룸으로 채팅 보내기
    socket.on('chat message', (msg) => {
        console.log('채팅 메세지에 nickname : ', socket.nickname)
        console.log(socket.nickname)

        const room_name = msg.room_name;
        io.to(room_name).emit('chat message', { nickname: socket.nickname, message: msg.msg });
        // io.emit('chat message', msg);
    });

    socket.emit('msg', `${socket.id} 연결 되었습니다.`);

    socket.on('msg', function (data) {
        console.log(socket.id, data);
        socket.emit('msg', `Server : "${data}" 받았습니다.`);
    });

    socket.on('disconnect', () => {
        console.log('disconnect')
        // io.emit('chat message', `${socket.id} 가 나갔습니다.`);
    })

});
// This will emit the event to all connected sockets
// 전체 사람에게 이벤트를 보냄


httpServer.listen(3001, () => {
    console.log('listening on *:3001');
});