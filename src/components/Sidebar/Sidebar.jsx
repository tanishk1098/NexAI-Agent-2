import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';
const Sidebar = () => {
const[extended,setExtended]= useState(false);//adding fxnality to menu button so that, on clicking menu button ,th sidebar EXTENDS(true condition),and on clicking it again(or in default condtion) ,it remains collapsed/hidden ONLY(false) 
const{onSent,prevPrompts,setRecentPrompt,newChat} = useContext(Context);//TO ADD FXNALITY OF SAVING PAST CHATS IN THE SIDEBAR RECENT SECTION

const loadPrompt= async(prompt)=>{//fxnality which enables opening of prompt when clicked from recent section of saved prompts
 setRecentPrompt(prompt);
    await onSent(prompt);//loadPrompt fxn automatically calls onSent fxn
}

    return (//Sidebar contains 2 MAIN COMP->
        //1)Top->menu icon,new-chat(icons and para), recent(contains recent-title, recent-entry)
        //2)Bottom-> Question,History,Settings
        <div className='sidebar'>

            <div className='top'>
                <img onClick={()=>setExtended(prev=>!prev)}className='menu' src={assets.menu_icon} alt="" />{/*So on clicking the MENU icon, the state changes frm prev to !prev; means if state was true, it becomes false and vice versa*/}

                <div onClick={()=>newChat()} className='new-chat'>
                    <img src={assets.plus_icon}></img>
                   {extended ? <p className='fade'>New Chat</p> : null} {/*we created a class fadeIn to make new chat appearance as faded,and we have to specially create a class (INSTEAD OF DIRECTLY GIVING ANIMATION CSS TO #root in index.css)for animation of newchat bcz it is inside a condition of if else => if extended is true then new chat will appear */}
                </div>
               
                {extended ? <div className="recent">
                    <p className='recent-title'>Recent</p>
                    {prevPrompts.map((item,index)=> {
                        return(
                            <div onClick={()=>loadPrompt(item)} className="recent-entry">
                        <img src={assets.message_icon}className='recent-icon' />
                        <p>{item.slice(0,18)}...</p>{/*here item will be saved in the sidebar, and it represents an element of  prevPrompts array,WE USED SLICE PROPERTY TO SHOW ONLY A PARTICULAR NO. OF CHARACTERS (OF PROMPTS) IN THE SIDEBAR */} 
                    </div>  
                        )
                    })}
                    
                </div> 
                : null}
            </div>
            {/* TOP PORTION OVER */}

            <div className='bottom'>
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} />
                   {extended ? <p>Help</p> : null}
                </div>

                 <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} />
                   {extended ? <p>Activities</p> : null}
                </div>

                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} />
                   {extended ? <p>Settings</p> : null}
                </div>
                <img />
            </div>

        </div>
    )
    // All the css properities of recent-entry element will also be applied to these 3 elements in the bottom div 
}

export default Sidebar