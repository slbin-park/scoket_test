import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const Chat = ({ chat_data, send_chat }) => {
    const [chat, set_chat] = useState('')
    let { params } = useParams();
    return (
        <div className='chat_div'>
            <div className='chat_data'>
                <div>
                    <h1>
                        채팅방입니다.
                    </h1>
                    <div className='chat_list'>
                        대화내용
                    </div>
                    {chat_data !== undefined ?
                        chat_data.map((data) => {
                            console.log(data)
                            return (
                                <div className='chat_list'>
                                    {data}
                                </div>
                            )
                        })
                        :
                        <>
                        </>
                    }
                </div>
                <div className='chat_send'>
                    <input className='joinInput'
                        onChange={(event) => set_chat(event.target.value)}
                    >
                    </input>
                    <button onClick={(e) => {
                        send_chat(e, chat)
                    }}>전송
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat