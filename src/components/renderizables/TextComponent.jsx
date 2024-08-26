import { useState } from "react";

const TextComponent = ({ id, updateEditorContent }) => {
  const [content, setContent] = useState("Componente de Texto"); 

  const handleChange = (e) => {
    setContent(e.target.value);
    updateEditorContent(id, { type: 'text', content: e.target.value });
  };

  return(
    <div className="p-4 bg-gray-100">
      <textarea 
        value={content}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
    </div>
  )};

  export default TextComponent;