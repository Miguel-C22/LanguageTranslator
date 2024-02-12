import React, { useState, useEffect } from 'react';
import openAiCall from '../customHook/openAiCall'
function Home() {
    const [changeImg, setChangImg] = useState(false)
    const {
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
    } = openAiCall()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        apiCall()
        setPrompt("")
        setApiResponse("")
        if(changeImg){
            apiImg()
            setLoadingImg(true)
            setChangImg(false)
            setApiImage("")
        }
    }

  return (
    <div className='container'>

    <form onSubmit={handleSubmit}>

        <img src="./images/Frame.png" className='frame' alt="" />

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here"
        />

        <div className='translate'>
            {loading && <p>Loading...</p>}
            {apiResponse && <div>{apiResponse}</div>}
        </div>

        {apiImage && <img className='apiImg' src={`data:image/png;base64,${apiImage}`} width={125} height={80}></img>}
        {loadingImg && <p>Loading Img...</p>}

        <button type="submit"  disabled={loading}>
          Translate
        </button>

         <select name="cars" id="cars" onChange={(e) => {
            setLanguage(e.target.value)
            setChangImg(true)
            }}  required>
            <option value="" disabled selected>Select a language</option>
            <option value="spanish">Spanish</option>
            <option value="thai">Thai</option>
            <option value="german">German</option>
            <option value="japanese">Japanese</option>
        </select>

      </form>

    </div>
  )
}

export default Home