import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();//context created and exported

const ContextProvider = (props) => {//context provider fxn


    //CREATED 6 STATES
    const [input, setInput] = useState("");//used to save the input data
    const [recentPrompt, setRecentPrompt] = useState(""); //input field data(recent data) will be saved in recent prompt and will be displayed in the main comp
    const [prevPrompts, setPrevPrompts] = useState([]);//stores all the input history and display it in the 'Recent' tab in sidebar
    const [showResult, setShowResult] = useState(false);//once its true it hide Greet text and the cards shown on page and display the result in that space
    const [loading, setLoading] = useState(false);//if this is true, it enables the loading animation anf after loading completes,it becomes false, to show our output data
    const [resultData, setResultData] = useState("");//to display our result on our page

    const delayPara = (index, nextWord) => {//ADDING typing effect
   setTimeout(()=>{
setResultData(prev=>prev+nextWord)//You're building the string incrementally, appending each word to the previous result.No matter how fast your timeouts stack up, the prev inside here always represents the current text.
   },75*index)//EACH word appears afer 75ms 

    }

  const newChat=()=>{//MAKING NEW CHAT BUTTON FXNAL
setLoading(false);//removes loading
setShowResult(false);//greet and card screen becomes visible
  }

    const onSent = async (prompt) => {//This code defines an asynchronous function named onSent that takes a prompt (i.e., the user's input/question) and sends it to Gemini using a helper function called runChat.
        setResultData("");//previous resp removed and is reset
        setLoading(true);
        setShowResult(true);
        let response;
        if(prompt!==undefined){//Means: The function was called with a parameter — probably by clicking a previous item from the sidebar. You don’t push this into prevPrompts again, because it's already there (user clicked a history item). You're just re-using that prompt.
        response = await runChat(prompt);//	IMPORTS/Calls another function (runChat) and waits for the response to finish before continuing.-->async turns a function into one that returns a Promise; await pauses the function execution until the Promise resolves (or rejects).
        setRecentPrompt(prompt);//update recentPrompt with this value
    }
        else{//Means: The user typed in the input field and clicked "send", so the function was triggered without arguments.
         setPrevPrompts(prev=>[...prev,input]);// add the new prompt to history
        response = await runChat(input);// send the new input to Gemini
                 setRecentPrompt(input);// update the most recent prompt
   
    }
        let responseArray = response.split("**");// Gemini (or many other LLMs) often return answers like:This is **very important** to note;To solve THIS ISSUE OF GETTING ** instead of bold words;
        //  This splits the response into a string array whenever ** comes. Eg: "This is **very important** to note"   THIS LINE BECOMES=======>["This is ", "very important", " to note"]
        let newResponse="";//1. solves ** bold problem
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 == 0) {  //is index is even 
                newResponse += responseArray[i];
            }
            else {// if index is odd  
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }//now newResponse gets updates with solved issue of bold

        let newResponse2 = newResponse.split("*").join("</br>");
        //2. newResponse2 solves * next line problem//so newResponse2 is the final response after fixing both bold and line change issue
        
        let finalResponseArray = newResponse2.split(" ");
        for(let i=0; i<finalResponseArray.length;i++){
            const nextWord=finalResponseArray[i];
            delayPara(i,nextWord+" ");//this fxn itslf calls the setResultData
        }
        // setResultData(newResponse2);(NOW NO NEED TO CALL setResultData , bcz delayPara is itself calling that fxn)
        setLoading(false);
        setInput("");

    }
    //  onSent("i have pain in my left shoulder rotater cuff");//calling the onSent fxn and giving a random prompt isnide it-->ANSWER WILL BE  IN CONSOLE

    const contextValue = {//created an object inside context provider fxn(iss contextProvider ke andar jo bhi cheezen hain ,unhe ,we can use anywhere in our [rpject using useContext])
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,//NOTE THAT WE ADDED newChat here int contextValue object
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;