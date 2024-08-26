import React, { useState } from "react";

const H2Component = ({id, updateEditorContent}) => {
  const [text, setText] = useState("Título H2");

  const handleChange = (e) => {
    setText(e.target.value);
    updateEditorContent(id, { type: "h2", content: e.target.value });
  };

  return (
    <input
      type="text"
      className="text-3xl font-semibold outline-none focus:outline-none w-full"
      value={text}
      onChange={handleChange}
    />
  );
};

export default H2Component;
