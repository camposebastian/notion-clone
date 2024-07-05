'use client'

import { useUser } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { toast } from 'sonner';
import Image from 'next/image';

function Documentpage() {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({
      title: 'Untitled',     
    });
    toast.promise(promise, {
      loading: 'Creating document...',
      success: 'Document created',
      error: 'Could not create document',
    });
  }

  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <Image
       src="https://media.istockphoto.com/id/182381290/photo/open-box.jpg?s=612x612&w=0&k=20&c=H1wDEUPrUfDtPRCb2cN87VLzGUrHLdZzj-K4Bxn1eeE=" 
       alt="Notion"
       width={300}
       height={300}  
       />     
       <h2>
          Welcome {user?.fullName}&apos;s Jotion
        </h2>  
        <Button onClick={onCreate}>
          <PlusCircle className='w-4 h-4 mr-2' />
          Create a note text
        </Button>
    </div>
  )
}

export default Documentpage