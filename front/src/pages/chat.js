import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import io from "socket.io-client";   //모듈 가져오기
const socket = io("http://localhost:3001");  //3001번 포트 사용(서버)

export const Chat = () => {
    let { nickname, room } = useParams();
    // console.log(nickname, room)
    const [chat_data, set_chat_data] = useState([]);
    const [chat, set_chat] = useState('');

    useEffect(() => {
        socket.emit("roomjoin", { nickname, room });

        socket.on('chat message', (msg) => {
            console.log(msg)
            set_chat_data((prev) => [...prev, { nickname: msg.nickname, message: msg.message }])
        })
    }, [])

    const send_chat = (e) => {
        e.preventDefault();
        const data = {
            room_name: room,
            msg: chat
        }
        socket.emit("chat message", data);
    }
    return (
        <div className='chat_data'>
            <div>
                <h1>
                    {room} 채팅방입니다.
                </h1>
                <div className='chat_list'>
                    대화내용
                </div>
                {chat_data.length !== 0 ?
                    chat_data.map((data) => {
                        return (
                            <div className='chat_list'>
                                이름 : {data.nickname} 내용 : {data.message}
                            </div>
                        )
                    })
                    :
                    <>
                    </>
                }
            </div>
            <form className='chat_send' onSubmit={(e) => {
                send_chat(e)
            }}>
                <input className='joinInput'
                    onChange={(event) => set_chat(event.target.value)}
                >
                </input>
                <button className='send_btn' onClick={(e) => {
                    // send_chat(e)
                }}>전송
                </button>
            </form>
        </div>
    )
}

export default Chat