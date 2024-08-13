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
       src="/emptyBox.jpg" 
       alt="Notion"
       width={300}
       height={300}  
       />     
       <h2>
          Welcome {user?.fullName} Jotion
        </h2>  
        <Button onClick={onCreate}>
          <PlusCircle className='w-4 h-4 mr-2' />
          Create a note text
        </Button>
    </div>
  )
}

export default Documentpage