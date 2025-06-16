// src/pages/LoginPage.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Bottom from './components/bottom'
import React from "react";

export default function LoginPage() {
  return (
    // Main container to center the content on the page
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-4">

      <div className="w-full max-w-sm">

        {/* Header Section: "NewsDigger" and subtitle */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tighter text-gray-900">
            NewsDigger
          </h1>
          <p className="mt-3 text-base text-gray-500">
            Curated dev newsletter, zero noise.
          </p>
        </header>

        {/* Main Login Form Area */}
        <main className="space-y-8">
          
          {/* Section 1: Provider & Google Login */}
          <div className="space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Log in</h2>
              <p className="text-gray-500">Log in with your desired provider.</p>
            </div>
            <Button variant="outline" className="w-full">
              {/* 
                Add your Google Icon component here. 
                For example, using the 'lucide-react' library:
                <Mail className="mr-2 h-4 w-4" /> 
              */}
              <span className="mr-2">G</span> {/* Placeholder for your icon */}
              Continue with Google
            </Button>
          </div>
          
          {/* Section 2: Email Login */}
          <div className="space-y-3 text-center">
            <p className="text-gray-500">Log in with an email.</p>
            <div className="space-y-4">
              <Input 
                type="email" 
                placeholder=" " // The space prevents the label from collapsing on some browsers
                className="text-center"
              />
              <Button type="submit" className="w-full bg-[#6D28D9] hover:bg-[#5B21B6] text-white">
                Send link
              </Button>
            </div>
          </div>

        </main>
        
        <Bottom/>

      </div>
    </div>
  );
}