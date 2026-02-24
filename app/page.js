import { createClient } from "@/utils/supabase/server";
import { getProducts } from "./actions";
import AddProductForm from "@/components/AddProductForm";
import ProductCard from "@/components/ProductCard";
import { TrendingDown, Shield, Bell, Rabbit } from "lucide-react";
import AuthButton from "@/components/AuthButton";
import Image from "next/image";
// import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = user ? await getProducts() : [];

  const FEATURES = [
    {
      icon: Rabbit,
      title: "Lightning Fast",
      description: "Accurate price extraction in seconds from modern, dynamic websites."
    },
    {
      icon: Shield,
      title: "Always Reliable",
      description: "Designed to handle anti-bot systems across major e-commerce platforms."
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Never miss a deal with real-time price drop notifications."
    }
  ];

  return (
    <main className="min-h-screen w-full bg-[#f9fafb] relative">
      <div className="absolute inset-0 z-0" style={{ backgroundImage: `
        linear-gradient(to right, #d1d5db 1px, transparent 1px),
        linear-gradient(to bottom, #d1d5db 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
        WebkitMaskImage:
         "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
        maskImage:
         "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",}}/>

      <div className="relative z-10">

        <header className=" w-full sticky top-6 z-10 mt-5">
          <div className="border max-w-7xl shadow-lg rounded-4xl mx-auto px-4 py-2.5 flex justify-between items-center">
            <div>
              <Image className="h-12 w-auto" src={'/cr.png'} width={600} height={200} alt="smart drop logo"/>
            </div>
              <AuthButton user={user}/>
          </div>
        </header>

        <section className="px-6 py-24">
            <div className="max-w-7xl mx-auto text-center">
              
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Buy at the Best Price, Every Time</h1>
              <p className="text-slate-600 max-w-xl mx-auto mb-10 text-lg">Paste a product link and let us watch the price for you. Get notified the moment it drops.</p>

              <AddProductForm user={user}/>
              
              {products.length === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {FEATURES.map((elem,idx)=>{
                    const Icon = elem.icon;
                    return <div key={idx} className="bg-white rounded-xl p-8 shadow-sm border">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-orange-100 flex items-center justify-center text-orange-500 text-xl">
                              <Icon/>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">{elem.title}</h3>
                            <p className="text-slate-500 text-sm">
                              {elem.description}
                            </p>
                          </div>
                  })}
                </div>
              )}
            </div>
        </section>

        {/* Products Grid */}
        {user && products.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 pb-20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Your Tracked Products
              </h3>
              <span className="text-sm text-gray-500">
                {products.length} {products.length === 1 ? "product" : "products"}
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 items-start">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {user && products.length === 0 && (
              <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
                <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12">
                  <TrendingDown className="w-16 h-16 text-gray-400 mx-auto mb-4"/> 
                  <h3 className="text-x1 font-semibold text-gray-900 mb-2">No products yet</h3 >
                  <p className="text-gray-600">Add your first product above to start tracking prices!</p>
                </div>
              </section>
        )}

      </div>
    </main>
  );
}
