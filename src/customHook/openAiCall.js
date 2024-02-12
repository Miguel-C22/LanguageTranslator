import React, { useState, useEffect } from 'react';
import OpenAI from "openai";

function AiCall () {
    const [prompt, setPrompt] = useState('');
    const [apiResponse, setApiResponse] = useState('');
    const [language, setLanguage] = useState('')
    const [loading, setLoading] = useState(false);
    const [loadingImg, setLoadingImg] = useState(false);
    const [apiImage, setApiImage] = useState('');

    const apiCall = async () => {

        const messages = [
            {
                role: 'system',
                content: `please translate in ${language}` 
            },
            {
                role: 'user',
                content: prompt
            }
        ]
       
          const openai = new OpenAI({ 
            apiKey: process.env.REACT_APP_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true //Need this for running on localhost
          });
            
          const result = await openai.chat.completions.create({ //When using React you need to do (openai.chat.completions.create)
            model: 'gpt-4',
            messages: messages,
            max_tokens: 16,
            temperature: 1.1
          });
          
          
          setApiResponse(result.choices[0].message.content);
          setLoading(false);
    }

    const apiImg = async () => {
      const openai = new OpenAI({ 
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true //Need this for running on localhost
      });

      const response = await openai.images.generate({
        model: 'dall-e-3', // default dall-e-2
        prompt: `${language} flag`, //required
        n: 1, //default 1 
        size: '1024x1024', //default 1024x1024
        style: 'natural', //default vivid (other option: natural)
        response_format: 'b64_json' //default url 
        //This will make it so the image only lasts an hour  (response_format: 'url')
        // The (response_format: 'b64_json') will make the image last forever 
    })
      setApiImage(response.data[0].b64_json)
      setLoadingImg(false)
    }
        
 
      return {
        prompt, 
        setPrompt, 
        apiResponse, 
        setApiResponse,
        apiCall, 
        loading, 
        setLoading,
        setLanguage,
        apiImg,
        apiImage,
        setLoadingImg,
        loadingImg,
        setApiImage
      }
}

export default AiCall