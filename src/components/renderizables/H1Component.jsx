import React, {useState} from 'react';

function H1Component() {
    const [text, setText] = useState("Título H1");

    const handleChange = (e) => {
        setText(e.target.value);
    };

    return(
        <>
        <input 
            type="text" 
            className="text-4xl font-bold outline-none focus:outline-none w-full" 
            value={text}  
            onChange={handleChange}            
        />        
        </>
    )
}

export default H1Component;