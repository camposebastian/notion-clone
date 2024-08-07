"use client"

import React from "react";
import NewEditor from "@/components/NewEditor";

function page() {
  return (
    <div className="pb-40">
      <div className="relative w-full h-[35vh] group h-[12vh]">
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">                  
        </div>
      </div>
      <div className="md:max-w-3xl lg:max-w-6xl mx-auto">
        <NewEditor />
      </div>
    </div>
  );
}

export default page;
