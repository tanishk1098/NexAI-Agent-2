// MY OLD GEMINI.JS FILE PRESENT INSIDE CONFIG-->


// const apiKey="";//inside these "" was api key earlier ...
// To run this code you need to install the following dependencies:
// # Install the Google Generative AI SDK for Node.js
// npm install @google/generative-ai


//TO USE THIS GEN AI FEATURE , WE USE useContext

import {//wrote import here by replacing const, that was written before
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";//removed require and () fom here
//youtube teacher used gemini-1.0-pro but it was not working on my system, so use this 1.5-flash
const MODEL_NAME = import.meta.env.VITE_GEMINI_MODEL || "gemini-2.5-flash";//stored my model name into this variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;//stored our gemini api key into this var



async function runChat(prompt) {//we added 'prompt; parameter inside parenthesishere(prompt is the input like a question/message from the user.)
  const genAI = new GoogleGenerativeAI(API_KEY);//Initializes the Gemini API with your key.
  
  console.log("✅ Using model:", MODEL_NAME);
console.log("✅ API Key present:", !!API_KEY);

  const model = genAI.getGenerativeModel({ model: MODEL_NAME });//Chooses the Gemini model (gemini-1.5-flash) for generating text.

  const generationConfig = {//Settings to control how the AI responds.
    temperature: 0.9,// creativity level (higher = more random)
    topK: 1,// controls diversity
    topP: 1,
    maxOutputTokens: 2048,// max length of the response
  };

  const safetySettings = [//Tells the model to block harmful content like harassment, hate speech, etc.
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({//Starts a new chat session with the model.
    generationConfig,
    safetySettings,
    history: [],
  });

  try {
    const result = await chat.sendMessage(prompt);//Sends the prompt to the model.(here also we added our parameter 'prompt');//await:-Waits for the AI to respond.
    const response = result.response;//response of AI is stored int response variable
    console.log(response.text());//SO WE GET A RESPONSE IN CONSOLE ,DUE TO THIS LINE
    return response.text();
  } catch (error) {
    console.error("Gemini API error:", error);//if any error (like 429) occurs, it will be logged in the console
    return "❌ Error: You’ve exceeded the free tier quota. Please wait and try again later.";
  }
}

//This function sends a prompt to Gemini, gets the AI's response, and prints it

export default runChat;

