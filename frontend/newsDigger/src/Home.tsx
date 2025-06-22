import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Bottom from './components/bottom'
import { authApi } from '@/api';
import React from "react";

export default function LoginPage() {
  const handleGoogleLogin = () => {
    authApi.googleLogin();
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-4">
      <div className="w-full max-w-sm">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tighter text-gray-900">
            NewsDigger
          </h1>
          <p className="mt-3 text-base text-gray-500">
            Curated dev newsletter, zero noise.
          </p>
        </header>

        <main className="space-y-8">
          <div className="space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Log in</h2>
              <p className="text-gray-500">Log in with your desired provider.</p>
            </div>
            <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
              <span className="mr-2">G</span>
              Continue with Google
            </Button>
          </div>
          
          <div className="space-y-3 text-center">
            <p className="text-gray-500">Log in with an email.</p>
            <div className="space-y-4">
              <Input 
                type="email" 
                placeholder="Enter your email"
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