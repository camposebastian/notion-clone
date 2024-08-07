'use client'

import { useQuery, useMutation } from "convex/react"
import { api } from "../../../../../../convex/_generated/api"
import Toolbar from "@/components/Toolbar"
import Cover from "@/components/Cover"
import { Editor } from "@/components/Editor"
import NewEditor from "@/components/NewEditor"

function DocumentIdPage({params}) {
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

  
  return (
    <div className="pb-40">
      <Cover url={document.converImage} />      
      <div className="md:max-w-3xl lg:max-w-6xl mx-auto">
        <Toolbar
          initialData={document}
        />
        <Editor 
        onChange={onChange}
        initialContent={document.content}
        />

        <NewEditor/>

      </div>
    </div>
  )
}

export default DocumentIdPage