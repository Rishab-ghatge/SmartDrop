"use client";

import { createClient } from "@/utils/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AuthModal({ isOpen, onClose }) {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    const { origin } = window.location;

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Track Price Drops Automatically</DialogTitle>
          <DialogDescription className="text-center">
            Sign in with Google to get alerts when prices fall.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center">
            <Button 
            onClick={handleGoogleLogin}
            className="cursor-pointer bg-black text-white text-md hover:text-black" 
            variant="outline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.67 1.22 9.15 3.61l6.85-6.85C35.82 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.5 24.5c0-1.63-.15-3.2-.43-4.72H24v9.44h12.7c-.55 2.94-2.22 5.43-4.7 7.11l7.26 5.63C43.78 37.73 46.5 31.6 46.5 24.5z"/>
                <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.98-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.81l-7.26-5.63c-2.02 1.36-4.6 2.16-8.64 2.16-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Sign in with Google
            </Button>
          </div>
      </DialogContent>
    </Dialog>
  );
}
