'use client'

import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { Item } from "./Item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

function DocumentList(level, parentDocumentId, data) {
    const paramas = useParams();
    const router = useRouter();
    const [expanded, setExpanded] = useState(false);

    const onExpand = (documentId) => {
        setExpanded(
            documentId === paramas.documentId ? !expanded : false
        );
    }    
    
    const documents = useQuery(api.documents.getSidebar,{
        parentDocument: (Object.keys(parentDocumentId).length === 0 && parentDocumentId.constructor === Object) ? undefined : parentDocumentId
    });    
    
    const onRedirect = (documentId) => { 
        router.push(`/documents/${documentId}`);
    }

    if(documents === undefined){
        return (
            <>
            <Item.Skeleton level={level} />
            {level === 0 && (
                <>
                <Item.Skeleton level={level} />
                <Item.Skeleton level={level} />
                </>
            )}
            </>
        )
    }

  return (
    <>
        {documents.length == 0 && (
            <p
            style={{ paddingLeft: "12px" }}
            className={cn("hidden text-sm font-medium text-muted-foreground/80",                                
            )}
            >
                No pages inside
            </p>)
        }
        {/* <p
            style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
            className={cn("hidden text-sm font-medium text-muted-foreground/80", 
                expanded && "last:block",
                level === 0 && "hidden",
            )}
        >No pages inside</p> */}
        
        {documents?.map((document)=>(
            <div key={document._id}>
                <Item
                    id={document._id}
                    label={document.title}
                    onClick={() => onRedirect(document._id)}
                    icon={FileIcon}
                    documentIcon={document.icon}
                    active={paramas.documentId === document._id}
                    onExpand={()=>onExpand(document._id)}
                    expanded={expanded[document._id]}
                    level={level}
                />

                {expanded[document._id] && (
                    <DocumentList
                        level={level + 1}
                        parentDocumentId={document._id}
                    />
                )}

            </div>
        ))}
    </>
  )
}

export default DocumentList