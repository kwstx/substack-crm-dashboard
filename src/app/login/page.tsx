"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { register, authenticate } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LandingNavbar } from "@/components/landing/navbar";
import { LandingFooter } from "@/components/landing/footer";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    if (isLogin) {
      const res = await authenticate(undefined, formData);
      if (res) {
        toast.error(res);
        setLoading(false);
      } else {
        // Success redirect handled by NextAuth
      }
    } else {
      const res = await register(formData);
      if (res?.error) {
        toast.error(res.error);
        setLoading(false);
      } else {
        toast.success("Account created! Redirecting to dashboard...");
        // Automatically sign in the user
        const loginRes = await authenticate(undefined, formData);
        if (loginRes) {
          toast.error(loginRes);
          setLoading(false);
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-violet-500/5 rounded-full blur-[100px] -z-10" />
      </div>

      <LandingNavbar />

      <main className="pt-24 md:pt-32 pb-20 px-6 relative min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-3">
              {isLogin ? "Welcome back" : "Create an account"}
            </h1>
            <p className="text-muted-foreground">
              {isLogin ? "Sign in to access your subscriber dashboard" : "Get started with your free account"}
            </p>
          </div>

          <Card className="border-gray-200 shadow-xl bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden">
            <CardContent className="p-8 space-y-6">
              <form action={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="text-sm font-bold text-gray-900 mb-1.5 block">Name</label>
                    <div className="relative">
                      <input
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        required
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-sm font-bold text-gray-900 mb-1.5 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-bold text-gray-900">Password</label>
                    {isLogin && (
                      <Link href="#" className="text-sm text-violet-600 hover:text-violet-700 font-medium">
                        Forgot password?
                      </Link>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      className="w-full h-12 pl-10 pr-12 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div className="text-sm">
                    <label className="text-sm font-bold text-gray-900 mb-1.5 block">Substack URL (Optional)</label>
                    <input
                      name="substackUrl"
                      type="url"
                      placeholder="https://yourname.substack.com"
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-full bg-black hover:bg-gray-900 text-white font-bold shadow-lg shadow-black/10 mt-2"
                >
                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {isLogin ? "Sign In" : "Create Account"}
                  {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-8 bg-white/50 backdrop-blur-sm py-2 px-4 rounded-full border border-gray-200/50 inline-block mx-auto min-w-full">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-violet-600 hover:text-violet-700 font-bold underline-offset-4 hover:underline">
              {isLogin ? "Get Started" : "Log in"}
            </button>
          </p>
        </div>
      </main>


    </div>
  );
}
