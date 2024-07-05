"use client";

import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Header() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <header className="w-full">
      <div className="flex z-50 top-0 left-0 right-0 items-center justify-between p-4 w-full p-6">
        <div>LOGO</div>
        <div>
          {isLoading && <p>Loading...</p>}
          {!isAuthenticated && !isLoading && (
            <>
              <SignInButton mode="modal" fallbackRedirectUrl="/documents">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </SignInButton>
              <SignInButton mode="modal" fallbackRedirectUrl="/documents">
                <Button size="sm">Get TITLE free</Button>
              </SignInButton>
            </>
          )}
          {isAuthenticated && !isLoading && (
            <>
            <Button variant="ghost" size="sm">
              <Link href="/documents">Enter</Link>
            </Button>
            <UserButton
                afterSignOutUrl="/"
            />
            </>
          )}          
        </div>
      </div>
    </header>
  );
}

export default Header;
