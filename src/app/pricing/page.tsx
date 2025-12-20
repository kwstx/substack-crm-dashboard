"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { motion } from "framer-motion";
import { Check, Zap, Heart, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <LandingNavbar />

      <main className="pt-32 pb-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-6">
              Our Gift to Creators
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Pricing? <br />
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">It's completely free.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We believe every writer deserves premium tools to grow their audience.
              No credit cards, no hidden fees, no "Pro" unlockables.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-violet-500 rounded-[2.5rem] blur-2xl opacity-20" />

          <div className="relative bg-white rounded-[2rem] p-8 md:p-12 border border-gray-100 shadow-xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">The Everything Plan</h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-gray-900">$0</span>
                <span className="text-muted-foreground font-medium">/forever</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10">
              {[
                "Unlimited Subscribers",
                "Advanced Segmentation",
                "Automated Workflows",
                "Real-time Analytics",
                "Email Support",
                "Community Access"
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-gray-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <Link href="/dashboard">
              <Button size="lg" className="w-full h-14 rounded-full bg-gray-900 hover:bg-gray-800 text-white font-bold text-lg shadow-lg shadow-gray-200">
                Start for Free
              </Button>
            </Link>
            <p className="text-center text-xs text-muted-foreground mt-4 font-medium">
              Seriously. Just sign in and start growing.
            </p>
          </div>
        </motion.div>

        <div className="max-w-3xl mx-auto mt-24 text-center">
          <h2 className="text-3xl font-bold mb-12">Why free?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-12 h-12 mx-auto bg-violet-100 rounded-2xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="font-bold mb-2">Community First</h3>
              <p className="text-sm text-muted-foreground">We come from the Substack community. This is our way of giving back.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold mb-2">Growth Focus</h3>
              <p className="text-sm text-muted-foreground">We want to help 10,000 writers reach sustainability. Barriers to entry stick.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 mx-auto bg-amber-100 rounded-2xl flex items-center justify-center mb-4">
                <Gift className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-bold mb-2">Open Future</h3>
              <p className="text-sm text-muted-foreground">We believe the future of creator tools should be accessible to everyone.</p>
            </div>
          </div>
        </div>
      </main>


    </div>
  );
}
