import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Message = ({ msg, join_room, name }) => {
    return (
        <div className='msg_data'>
            {msg !== undefined ?
                msg.map((data, i) => {
                    // console.log(data)
                    return (
                        <div key={i}>
                            <button onClick={(e) => join_room(e, data)} className={'button mt-20'}>
                                {data}
                            </button>
                        </div>
                    )
                })
                :
                <>
                </>
            }
        </div>
    )
}

export default React.memo(Message);