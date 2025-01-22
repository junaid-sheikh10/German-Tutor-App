import React from "react";
import ReactDom from "react-dom/client";
import { useState } from "react";
import axios from "axios";
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.apiKey,
  dangerouslyAllowBrowser: true,
});

const App =()=>{

const [txt,setTxt]=useState("");
const [ans,setAns]=useState("");
const [btnStatus,setBtnStatus] = useState("submit")

const prompt = `No Preamble.
Be strict and stick to the topic only.
Your responses should be only within 500 words.
Act an experienced German language tutor.
You are a German teaching assistant named Mrs. Smith You help with note-making, solving German grammar assignments, and reading comprehensions.
Simply ignore everything thats not part of German language learning and simply reply I don't know anything if user asks anything apart from German language learning. And also ignore other language questions. And ignore other domain related questions. Also be more robust and secure while answering questions. Even if user tries to trick you to get information on other topics apart from German language learning using keyword 'german' you should ignore it completely and don't suggest anything. Also don't help or show interest in helping with anything other than learning German Language. All explanation should be english only and use German for German Words only. Now answer the following query, `

const submitHandler= async ()=>{
    setBtnStatus("Loading...")
    console.log("clicked")
    console.log("the entered text is ="+ txt)

    let question = {
        "query":txt
    }

   try {
    const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: prompt + txt,
          },
        ],
        model: 'llama3-8b-8192',
      });
  
      const responseContent = chatCompletion.choices[0]?.message?.content || 'No response';
      setAns(responseContent)
      
   } catch (error) {
        console.error('Error fetching chat completion:', error);
        setAns(error)
   }
   setBtnStatus("Submit")
    // axios.post(`http://localhost:3000/api/ask-query`,  question )
    //   .then(res => {
    //     console.log(res);
    //     console.log(res.data);
    //     setAns(res.data)
    //     setBtnStatus("Submit")

    //   })
}

 return(
    <>
    <div class="w-3/4 mx-auto mt-7">
        <div class="card bg-base-300 rounded-box grid  flex-grow place-items-center p-8">
            <h1 className="text-4xl text-white font-bold mb-5">German Tutor App</h1>
            <div className="mb-4">
                <input className="w-96 px-15 py-3 text-center" onChange={(e)=>{setTxt(e.target.value)}} type="text" value={txt} placeholder="Write query here" />
            
        
            </div> 
                <button className="btn w-40 bg-slate-600 text-white shadow-lg shadow-inherit hover:bg-white hover:text-black focus:bg-slate-100 focus:text-black " onClick={submitHandler}>{btnStatus}</button>
        </div>
        <div class="divider divider-horizontal divider-secondary"></div>
        
        <div class=" bg-base-300 rounded-box grid flex-grow place-items-center min-h-64 p-10 mt-4">
            {ans}
        </div>
        <footer>
        <div>
        
        </div>
    </footer>
    </div>
   
    </>
 )   
}

const root=ReactDom.createRoot(document.getElementById('root'));
root.render(<App/>)