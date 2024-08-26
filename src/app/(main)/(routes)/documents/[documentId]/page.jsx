'use client'

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from "convex/react"
import { api } from "../../../../../../convex/_generated/api"
import Toolbar from "@/components/Toolbar"
import Cover from "@/components/Cover"
import { Editor } from "@/components/Editor"
import NewEditor from "@/components/NewEditor"

/* componentes */
import ParagraphComponent from "@/components/renderizables/ParagraphComponent";
import H1Component from "@/components/renderizables/H1Component";
import H2Component from "@/components/renderizables/H2Component";
import TextComponent from "@/components/renderizables/TextComponent";
import ImageGallery from "@/components/renderizables/ImageGallery";
import FrecuenlyQuestions from "@/components/renderizables/FrecuenlyQuestions";
import {  ChevronDown,  ChevronUp,  Image,  Type,  Heading1,  Heading2,  AlignLeft, FileQuestion, Trash2 } from "lucide-react";

const components = [
  { name: "Galería de Imágenes", icon: Image, component: ImageGallery },
  { name: "F&Q", icon: FileQuestion, component: FrecuenlyQuestions },
  { name: "Texto", icon: Type, component: TextComponent },
  { name: "H1", icon: Heading1, component: H1Component },
  { name: "H2", icon: Heading2, component: H2Component },
  { name: "Párrafo", icon: AlignLeft, component: ParagraphComponent },
];

function DocumentIdPage({params}) {

  //const [editors, setEditors] = useState([{ id: Date.now() }]);  
  const [editors, setEditors] = useState(() => {
    const savedEditors = localStorage.getItem('dashboardEditors');
    return savedEditors ? JSON.parse(savedEditors) : [{ id: Date.now(), content: {} }];
  });

  useEffect(() => {
    localStorage.setItem('dashboardEditors', JSON.stringify(editors));
  }, [editors]);

  const document = useQuery(api.documents.getById,{
    documentId: params.documentId
  })

  const update = useMutation(api.documents.update);  

  const onChange = (content) => {
    update({
      id: params.documentId,
      content: JSON.stringify(content.document),
    })
  }
  
  if(document===undefined){
    return(<div>
      Loading...
    </div>)
  }

  if(document===null){
    return(<div>
      Not found
    </div>)
  }

  const addEditor = () => {    
    setEditors(prevEditors => [...prevEditors, { id: Date.now() }]);   
  }

  const removeEditor = (id) => {    
    if (editors.length > 1) {
      setEditors(prevEditors => prevEditors.filter(editor => editor.id !== id));
    }
  }

  const updateEditorContent = (id, content) => {    
    setEditors(prevEditors =>
      prevEditors.map(editor =>
        editor.id === id ? { ...editor, content } : editor
      )
    );
  };
  
  return (
    <div className="pb-40">
      <Cover url={document.converImage} />      
      <div className="md:max-w-3xl lg:max-w-6xl mx-auto">
        <Toolbar
          initialData={document}
        />

        {editors.map(editor => (
          <NewEditor key={editor.id} id={editor.id} components={components} addEditor={addEditor} removeEditor={removeEditor} updateEditorContent={updateEditorContent} />
        ))}

      </div>
    </div>
  )
}

export default DocumentIdPage