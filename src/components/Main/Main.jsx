import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context';
const Main = () => {
    const{onSent,recentPrompt,setRecentPrompt,showResult,loading,resultData,setInput,input}=useContext(Context);
    
    const handleCardClick=(prompt)=>{
        setRecentPrompt(prompt);
        onSent(prompt);
    }

      // main comp div contains->
    //1) nav div(contains para,user image)
    //2) main-container div(contains 'greet' div and 'cards' div)
    //(a) greet(contains 2 paras)
    //(b) cards(contains 4 'card' divs)
    // c) main-bottom(contains search-bottom class containing 1 input box and 3 images; and a <p> tag giving bottom-info)
    return (
        <div className='main'>

            <div className='nav'>
                <p>NexAI </p>
                <img src={assets.user_icon} />
            </div>

            <div className='main-container'>
                {!showResult ? <> <div className='greet'>{/* when icon clicked , showResult becomes true then we dont see greet and cards, we see an empty div (later we see loading animation for that time) */}
                    <p><span>Hello, Dev👋</span></p>
                    <p>How can I help you?</p>
                </div>

                <div className='cards'>

                    <div className='card' onClick={()=>handleCardClick("Suggest beautiful palces to see on an upcoming roaad trip")}>
                        <p>Suggest beautiful palces to see on an upcoming roaad trip</p>
                        <img src={assets.compass_icon} />
                    </div>
                    <div className='card' onClick={()=>handleCardClick("Briefly summarise this concept: urban planning")}>
                        <p>Briefly summarise this concept: urban planning</p>
                        <img src={assets.bulb_icon} />
                    </div>
                    <div className='card' onClick={()=>handleCardClick("Brainstorming team bonding actvities for our work retreat")}>
                        <p>Brainstorming team bonding actvities for our work retreat</p>
                        <img src={assets.message_icon} />
                    </div>
                    <div className='card' onClick={()=>handleCardClick("Optimise the given code")}>
                        <p>Optimise the given code</p>
                        <img src={assets.code_icon} />

                    </div>

                </div>  
                </>
                : <div className='result'>
                    <div className='result-title'>
                        <img src={assets.user_icon }/>
                        <p>{recentPrompt}</p> {/*asked question*/}
                        
                    </div>

                    <div className='result-data'>
                        <img src={assets.gemini_icon}/>{/*NexAI icon */}
                        {loading ? <div className='loader'>{/* if loading is true, show the loading animation, else show the answer ie paragraph*/}
                            <hr />
                            <hr />
                            <hr />{/*we made these 3 hr tags and gave them css to convert them into a good css */}
                        </div>
                        :<p dangerouslySetInnerHTML={{__html:resultData}}></p> }  {/* Use dangerouslySetInnerHTML when  You want formatted output (e.g. bold, line breaks), means if we want  html tags like <b>,<i>,<br> to actually work, and not just be visible as a text in our page */}
                </div>
            </div>
            } 
                
                <div className='main-bottom'>
                    <div className='search-box'>
                        <input onChange={(e)=>setInput(e.target.value)} value={input}type='text' placeholder='Ask NexAI'/>{/*when we type anything(any change in input field), then our input state will be updates; e means event here*/}
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input ?<img onClick={()=>onSent()} src={assets.send_icon} alt="" /> :null}{/*whens end icon clicked , onSent is called */}
                            {/*in above line we also added fxnality that--> if input==true means if input field has any content then onlySEND ICON IS VISIBLE in the search box*/}
                        </div>
                    </div>
                    <p className='bottom-info'>NexAI is still learning and may generate incorrect or incomplete answers. Please verify information before using it.</p>
                </div>

            </div>


        </div>
    )
}

export default Main;
