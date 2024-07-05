'use client'

import { useEffect, useRef, useState } from 'react';
import {ChevronsLeft, MenuIcon, Plus, PlusCircle, Search, Settings} from 'lucide-react'
import { useMediaQuery } from 'usehooks-ts';
import { useParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import UserItem from './UserItem';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Item } from './Item';
import { toast } from 'sonner';
import DocumentList from './DocumentList';
import Navbar from './Navbar';

function navigation() {
    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");    
    const params = useParams();

    /* const documents2 = useQuery(api.documents.getSidebar);
    console.log(documents2) */
    const create = useMutation(api.documents.create);

    const isResazingRef = useRef(false);
    const sidebarRef = useRef(null);
    const navbarRef = useRef(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);
    
    useEffect(() => {
        if (isMobile) {
           colllapse();
        }else{
            resetWidth();
        }
    }, [isMobile])

    useEffect(() => {
        if (isMobile) {
            colllapse();
        }
    }, [pathname, isMobile])

    const handleMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
                
        isResazingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);        
    }

    const handleMouseMove = (e) => {
        if (!isResazingRef.current) return;
        let newWidth = e.clientX;

        if(newWidth < 240 ) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);            
            navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);            
        }
    }

    const handleMouseUp = () => {
        isResazingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);        
    }

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sidebarRef.current.style.width = isMobile ? "100%" : "240px";            
            navbarRef.current.style.setProperty("left", isMobile ? "0" : "calc(100% - 240px)");
            navbarRef.current.style.setProperty("width", isMobile ? "100%" : "240px");

            setTimeout(() => {
                setIsResetting(false);
            }, 300);
        }
    }

    const colllapse = () =>{
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);

            sidebarRef.current.style.width = "0";
            navbarRef.current.style.setProperty("left", "0");
            navbarRef.current.style.setProperty("width", "100%");

            setTimeout(() => {
                setIsResetting(false);
            }, 300);
        }
    }

    const handleCreate = () => {
        const promise = create({ title: "Untitled", });
        
        toast.promise(promise, {
          loading: "Creating document...",
          success: "Document created",
          error: "Could not create document",
        });
    }

  return (
    <>
    <aside
        ref={sidebarRef}
        className={cn(
            'group/sidebar h-full overflow-y-auto bg-secondary relative flex w-60 flex-col z-[9]',
            isResetting && "transition-all ease-in-out duration-300",
            isMobile && "w-0",
        )}
    >
        <div
            onClick={colllapse}
            role='button'
            className={cn('w-6 h-6 text-muted-foreground rounded-sm hover:bg-neutral-300 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition',                
                isMobile && "opacity-100",
            )}   
        >
            <ChevronsLeft className='w-6 h-6' />
        </div>
        <div>
            <UserItem />
            <Item
                label="Search"
                icon={Search}
                isSearch={true}
                onClick={() => {}}
            />
            <Item
                label="Settings"
                icon={Settings}
                onClick={() => {}}
            />
            <Item 
                onClick={handleCreate} 
                label="New page" 
                icon={PlusCircle} 
            />
        </div>
        <div className='mt-4'>            
            <DocumentList />
            <Item
                onClick={handleCreate}
                icon={Plus}
                label={"Add a page"}
            />
        </div>

        <div 
            onMouseDown={handleMouseDown}
            onClick={resetWidth}
            className='opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0'
        />

    </aside>
    <div
        ref={navbarRef}
        className={cn(
            "absolute top-0 z-[9] left-60 w-[calc(100%-240px)]",
            isResetting && "transition-all ease-in-out duration-300",
            isMobile && "left-0 w-full",
        )}
    >
        {params.documentId ? (
            <Navbar 
            isCollapsed={isCollapsed}
            onResetWidth={resetWidth}
            />                    
        ):(
            <nav className='bg-transparent px-3 py-2 w-full'>
            {isCollapsed && <MenuIcon onClick={resetWidth} role='button' className='w-6 h-6 text-muted-foreground' />}
            </nav>
        )
        }
        
    </div>
    </>
  )
}



export default navigation