import React, {useState} from 'react';

function ParagraphComponent() {
    const [text, setText] = useState("Este es un párrafo de ejemplo.");

    const handleChange = (e) => {
        setText(e.target.value);
    };

    return(
        <>
        <input 
            type="text" 
            className="text-base outline-none focus:outline-none w-full" 
            value={text}  
            onChange={handleChange}            
        />        
        </>
    )
}

export default ParagraphComponent;