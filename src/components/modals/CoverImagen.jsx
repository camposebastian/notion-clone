"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useCoverImageStore } from "../../../hooks/useCoverImage";
import { useState } from "react";

import { useEdgeStore } from "@/lib/edgestore";
import { useParams } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export const CoverImageModal = ()=>{

    const params = useParams();
    const update = useMutation(api.documents.update);

    const [file, setFile] = useState(null)
    const { edgestore } = useEdgeStore();

    const coverImage = useCoverImageStore()

    const onChange = async (e) => {
           
        setFile(e.target.files[0])

        const res = await edgestore.publicFiles.upload({
            file
        })
        console.log(res)
        await update({ id: params.documentId, converImage: res.url })

        onClose();
    }

    const onClose = () => {
        setFile(undefined)
        coverImage.onClose()
    }

    return(
        <>
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>            
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">Cover Image</h2>
                </DialogHeader>
                <div>
                    <input type="file" onChange={onChange} />
                    TODO: Upload image
                </div>                
            </DialogContent>
        </Dialog>
        </>
    )
}