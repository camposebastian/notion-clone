'use client'

import { useQuery } from "convex/react"
import { useParams } from "next/navigation"
import { api } from "../../../../convex/_generated/api";
import { MenuIcon, ReceiptIndianRupee } from "lucide-react";
import Title from "./Title";
import Banner from "./Banner";

function Navbar({isCollapsed, onResetWidth}) {
    const params = useParams();
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId
    });

    if(document === undefined){
        return (
            <nav className="bg-background px-3 py-2 w-full items-center gap-x-4">
                <Title.Skeleton />
            </nav>
        )
    }

    if(document === null){
        return null
    }

  return (
    <>
    <nav className="bg-background px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
            <MenuIcon
            role="button"
            className="text-muted-foreground w-6 h-6"
            onClick={onResetWidth}
            />
        )}
        <div className="flex items-center justify-between w-full">
            <Title
                initialData={document}
            />
        </div>
    </nav>
    {document.isArchived && (
        <Banner
            documentId={document._id}
        />
    )}
    </>
  )
}

export default Navbar