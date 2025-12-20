"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { LandingFooter } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import { Mail, Twitter, MapPin, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[800px] bg-violet-500/5 rounded-full blur-[100px] -z-10" />
      </div>

      <LandingNavbar />

      <main className="pt-32 pb-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full text-xs font-semibold mb-8 border border-border/50">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>We'd love to hear from you</span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
                Get in <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">touch.</span>
              </h1>

              <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
                Have questions about the project? Want to contribute? Or just want to say hi? We're here to help you get started.
              </p>

              <div className="space-y-8">
                <div className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:border-violet-200 transition-all duration-300">
                    <Mail className="w-6 h-6 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email us</h3>
                    <p className="text-muted-foreground">support@lume.so</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:border-blue-200 transition-all duration-300">
                    <Twitter className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Twitter</h3>
                    <p className="text-muted-foreground">@lumeproject</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:border-green-200 transition-all duration-300">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Community Base</h3>
                    <p className="text-muted-foreground">Distributed Global Team</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 relative overflow-hidden"
            >
              {/* Form Background Pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">First Name</label>
                    <input className="w-full h-12 px-5 rounded-xl border border-gray-200 bg-gray-50/50 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none" placeholder="Jane" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">Last Name</label>
                    <input className="w-full h-12 px-5 rounded-xl border border-gray-200 bg-gray-50/50 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-900">Email</label>
                  <input className="w-full h-12 px-5 rounded-xl border border-gray-200 bg-gray-50/50 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none" placeholder="jane@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-900">Message</label>
                  <textarea className="w-full h-40 p-5 rounded-xl border border-gray-200 bg-gray-50/50 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none resize-none" placeholder="How can we help?" />
                </div>

                <Button size="lg" className="w-full h-12 rounded-full bg-black hover:bg-gray-900 text-white font-bold text-base shadow-lg shadow-black/10">
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
