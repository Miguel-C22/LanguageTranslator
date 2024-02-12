Example On how to run a openAi in React 
import React, { useState } from 'react';
import OpenAI from "openai";

const ChatBot = () => {
  const [prompt, setPrompt] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const messages = [
        {
            role: 'system',
            content: 'You are a helpful assistant that explains things in language a 10-year-old can understand. Your answers are always less than 100 words.' 
        },
        {
            role: 'user',
            content: prompt
        }
    ]
   
      const openai = new OpenAI({ 
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true 
      });
        
      const result = await openai.chat.completions.create({ //When using React you need to do (openai.chat.completions.create)
        model: 'gpt-4',
        messages: messages,
        max_tokens: 16, // The max_tokens setting. Max_tokens limits the number of tokens the model outputs. This does not effect the size of the users input
        temperature: 1.1
      });

   
      setApiResponse(result.choices[0].message.content);
 

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here"
        />
        <button type="submit"  disabled={loading}>
          Submit
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {apiResponse && <div>{apiResponse}</div>}
    </div>
  );
};

export default ChatBot;