import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ChatListIcon from "../components/ChatListIcon";
import Loader from "../components/loader";
import NestedChat from "../components/NestedChat";
import { createRoom, getP2PChatByUserId, getparcipiantsByUserId, getRooms } from "../servFunctions/functions";
import { isMobile } from "react-device-detect";

const Main=()=>{
    const [chats,setChats]=useState([])
    const [parcipiants,setParcipiants]=useState([])
    //const [rooms,setRooms]=useState([])
    const [isErr,setIsErr]=useState(true)
    const [isLoading,setIsLoading]=useState(false)
    //const [roomName,setRoomName]=useState('')
    const [activeChat,setActiveChat]=useState('0')
    const [opponent,setOpponent]=useState('0')
    const [gridCodeText,setGridCodeText]=useState('')
    const router=useHistory()
    useEffect(()=>{
      setIsLoading(true)
      getP2PChatByUserId(localStorage.getItem("userID"),setChats,setIsErr)
      isMobile?setGridCodeText('1fr'):setGridCodeText('20% 1fr')
      console.log(isMobile)
      setTimeout(()=>{setIsLoading(false)},3000)
    },[])

    /*const createChat=()=>{
        createRoom(roomName)
        setRoomName("")
        getparcipiantsByUserId(localStorage.getItem('userID'),setParcipiants,setIsErr)
    } */

    

    return(
        <div style={{overflowY:"hidden"}}>
          {isLoading?
            <><Loader/></>
          :
            <>
              <div style={{display:"grid",gridTemplateColumns:`${gridCodeText}`,gridTemplateRows:"100%",flex:"1 1 auto"}}>
                <div style={{maxHeight:"100%",borderRight:'1px solid gray'}}>
                  
                  <Link to={`/usersearch`}>search users</Link>
                  {isErr?
                    <div>no chats yet bro(</div>
                  :
                    <div style={{minHeight:"89vh"}}>
                      <strong>chats</strong>
                      {chats.map(p=>
                        <div key={p._id}>
                          <ChatListIcon data={p} setActiveChat={setActiveChat} setOpponent={setOpponent} />
                        </div>  
                      )}
                      {/*rooms.map(p=>
                        <div key={p._id}>
                          {p.name}
                        </div>  
                      )*/}
                      {/*<div>
                        <strong>add room</strong>
                        <input value={roomName} onChange={(e)=>setRoomName(e.target.value)}/>
                        <button onClick={createChat}>+</button>
                      </div>*/}
                    </div>
                  }

                </div>
              <div>
                {activeChat==0&&opponent==0?
                  <><div style={{textAlign:"center"}}><strong>No chat selected</strong></div></>
                :
                  <><NestedChat id={activeChat} opponent={opponent}/></>
                }
              </div>
            </div>             
            </>
          }

        </div>
    )
}

export default Main