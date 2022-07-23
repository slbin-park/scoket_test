import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Join.css'
import io from "socket.io-client";   //모듈 가져오기
import Message from './component/message';
import Chat from './component/chat'
const socket = io("http://localhost:3001");  //3001번 포트 사용(서버)

const Join = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [msg, set_msg] = useState([])
    const [chat_data, set_chat_data] = useState([]);
    const [rom_name, set_rom_name] = useState('')
    useEffect(() => {
        socket.on('message', (message) => {
            set_msg((prev) => message)
        })
        socket.on('chat message', (message) => {
            // console.log(message)
            set_chat_data((prev) => [...prev, message])
        })
    }, [])

    // 방 만들기
    const Click_btn = () => {
        socket.emit("roommake", room);
    }

    const join_room = (e, room_name) => {
        set_rom_name(room_name)
        socket.emit("roomjoin", room_name);
    }

    const send_chat = (e, chat) => {
        const data = {
            room_name: rom_name,
            msg: chat
        }
        socket.emit("chat message", data);
    }

    return (
        <div className='joinOuterContainer'>
            <div className='joinInnerContainer'>
                <h1 className='heading'>JOIN</h1>
                <div>
                    <input
                        placeholder='이름'
                        className='joinInput'
                        type='text'
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div>
                    <input
                        placeholder='채팅방'
                        className='joinInput mt-20'
                        type='text'
                        onChange={(event) => setRoom(event.target.value)}
                    />
                </div>
                <button className={'button mt-20'} onClick={(e) => Click_btn(e)} type='submit'>
                    방만들기
                </button>
            </div>
            <Message msg={msg} join_room={join_room} name={name} />
        </div>
    )
}

export default Join