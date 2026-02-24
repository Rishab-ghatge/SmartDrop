"use client";

import { useState } from "react";
import { signOut } from "@/app/actions";
import AuthModal from "./AuthModal";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";

export default function AuthButton({ user }) {
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (user) {
    return (
      <form action={signOut}>
        <Button className="cursor-pointer gap-2" variant="ghost" size="sm" type="submit">
          <LogOut className="w-4 h-4" />
          Sign Out
        </ Button >
      </form>
    );
  }

  return (
    <>
      <Button onClick={()=>setShowAuthModal(true)} className="cursor-pointer bg-[#ff7c2d] text-white text-lg hover:text-[#ff7c2d]" variant="outline">
        <LogIn/>
        Get Started
      </Button>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}
