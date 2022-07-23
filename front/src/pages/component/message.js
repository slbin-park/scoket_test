import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Message = ({ msg, join_room, name }) => {
    return (
        <div className='msg_data'>
            {msg !== undefined ?
                msg.map((data) => {
                    console.log(data)
                    return (
                        <Link to={`/chat/${name}/${data}`}>
                            <button className={'button mt-20'}>
                                {data}
                            </button>
                        </Link>
                    )
                })
                :
                <>
                </>
            }
        </div>
    )
}

export default Message