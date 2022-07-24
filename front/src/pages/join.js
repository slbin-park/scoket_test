import React, { useRef, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Join.css'
import io from "socket.io-client";   //모듈 가져오기
import Message from './component/message';
import Chat from './component/chat'


const Join = () => {
    const socket = useRef();
    let navigate = useNavigate();
    // io("http://localhost:3001");  //3001번 포트 사용(서버)
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [msg, set_msg] = useState([])
    const [chat_data, set_chat_data] = useState([]);
    const [rom_name, set_rom_name] = useState('')
    const location = useLocation();

    useEffect(() => {
        socket.current = io("http://localhost:3001");
        socket.current.on('message', (message) => {
            set_msg((prev) => message)
        })
        socket.current.on('chat message', (message) => {
            // console.log(message)
            set_chat_data((prev) => [...prev, message])
        })
    }, [])

    // 방 만들기
    const make_room = () => {
        if (room === '') {
            alert("방 이름을 입력해주세요.")
        }
        else {
            socket.current.emit("roommake", room);
        }
    }

    // 방 들어가기
    const join_room = (e, room_name) => {
        if (name === '') {
            alert('이름을 입력해주세요 . ')
        }
        else {
            navigate(`/chat/${name}/${room_name}`)
            set_rom_name(room_name)
            socket.current.emit("roomjoin", room_name);
        }
    }

    const send_chat = (e, chat) => {
        const data = {
            room_name: rom_name,
            msg: chat
        }
        socket.current.emit("chat message", data);
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
                <button className={'button mt-20'} onClick={(e) => make_room(e)} type='submit'>
                    방만들기
                </button>
            </div>
            <Message msg={msg} join_room={join_room} name={name} />
        </div>
    )
}

export default Join