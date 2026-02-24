"use client";

import { useState } from "react";
import { addProduct } from "@/app/actions";
import AuthModal from "./AuthModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AddProductForm({ user }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("url", url);

    const result = await addProduct(formData);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.message || "Product tracked successfully!");
      setUrl("");
    }

    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex justify-center items-center gap-4 max-w-2xl mx-auto mb-16">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste product URL (Amazon, Myntra, etc.)"
            className="h-10 text-lg flex-1 rounded-lg border-2 border-[#ff7c2d] focus:outline-none"
            disabled={loading}
          />

          <Button
            type="submit"
            disabled={loading}
            className="h-10 cursor-pointer bg-[#ff7c2d] text-white text-lg hover:text-[#ff7c2d]" 
            variant='outline'
          >
            {loading ? (
              <>
                <Loader2 className='mr-1 h-4 w-4 animate-spin'/>
                Adding...
              </>
            ) : (
              "Track Price"
            )}
          </Button>
      </form>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}
