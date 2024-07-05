import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header/>
      <h1>LANDING PAGE</h1>      
    </main>
  );
}
