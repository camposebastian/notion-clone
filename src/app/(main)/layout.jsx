"use client"

import Header from "@/components/Header";
import Navigation from "./_components/Navigation";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

export default function RootLayout({ children }) {

    const { isAuthenticated, isLoading } = useConvexAuth();
    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (!isAuthenticated) {
        return redirect("/");
    }

  return (
    <div className="h-full flex">
        <Navigation/>
        <main className="flex-1 w-full overflow-y-auto">
        {children}
        </main>
    </div>
  )
    
}
