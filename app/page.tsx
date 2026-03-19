import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { Sparkles, CheckCircle2, Shield, ArrowRight, Activity, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "HabitFlow | Build Better Habits",
  description: "HabitFlow helps you build consistency, track your progress, and take control of your daily routines with a beautiful, distraction-free interface.",
  openGraph: {
    title: "HabitFlow | Build Better Habits",
    description: "HabitFlow helps you build consistency, track your progress, and take control of your daily routines.",
    type: "website",
    url: "https://habitflow.app",
    siteName: "HabitFlow",
  },
};

export default async function LandingPage() {
  const { userId } = await auth();
  
  // "Zero-Drag" Redirect to Dashboard immediately
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-zinc-950/60 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-400" />
          <span className="font-bold text-lg tracking-tight text-white">HabitFlow</span>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/sign-in" className="text-zinc-400 hover:text-white transition-colors">
            Log In
          </Link>
          <Link 
            href="/sign-up" 
            className="rounded-full bg-white text-black px-4 py-2 hover:bg-zinc-200 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Abstract Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 translate-x-1/4 -translate-y-1/4 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative mx-auto max-w-4xl text-center z-10">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500 mb-6 drop-shadow-sm leading-tight">
            Master your habits.<br />Achieve your goals.
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed px-4">
            HabitFlow helps you build consistency, track your progress, and take control of your daily routines with a beautiful, distraction-free interface.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/sign-up"
              className="group flex items-center justify-center gap-2 rounded-full bg-indigo-600 text-white px-8 py-3.5 text-base font-semibold hover:bg-indigo-500 transition-all shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] w-full sm:w-auto"
            >
              Start Building Streaks
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/sign-in"
              className="rounded-full border border-zinc-800 bg-zinc-950/50 backdrop-blur px-8 py-3.5 text-base font-semibold text-zinc-300 hover:bg-zinc-900 hover:text-white transition-all w-full sm:w-auto text-center"
            >
              Log In
            </Link>
          </div>
        </div>

        {/* CSS Hybrid App UI Mockup */}
        <div className="relative mx-auto mt-20 max-w-5xl z-10 perspective-[2000px] hidden sm:block">
          <div className="rounded-xl ring-1 ring-white/10 bg-zinc-950/90 backdrop-blur-2xl shadow-2xl shadow-indigo-500/10 overflow-hidden flex transform transition-transform duration-700 ease-out hover:scale-[1.01] hover:-translate-y-2 origin-bottom h-[450px]">
            {/* Sidebar Mockup */}
            <div className="hidden md:flex flex-col w-64 border-r border-white/5 bg-zinc-900/30 p-5 shrink-0">
              <div className="flex items-center gap-3 mb-10 px-2 mt-2">
                <div className="w-7 h-7 rounded bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-inner" />
                <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
              </div>
              <div className="space-y-4">
                <div className="h-10 w-full bg-indigo-600/10 rounded-md flex items-center px-4 gap-3 border border-indigo-500/20">
                  <div className="w-4 h-4 rounded bg-indigo-500/50" />
                  <div className="h-3 w-20 bg-indigo-400/50 rounded" />
                </div>
                <div className="h-8 w-full rounded-md flex items-center px-4 gap-3 opacity-60">
                  <div className="w-4 h-4 rounded bg-zinc-700" />
                  <div className="h-3 w-16 bg-zinc-700 rounded" />
                </div>
                <div className="h-8 w-full rounded-md flex items-center px-4 gap-3 opacity-40">
                  <div className="w-4 h-4 rounded bg-zinc-800" />
                  <div className="h-3 w-28 bg-zinc-800 rounded" />
                </div>
              </div>
            </div>
            
            {/* Main Content Mockup */}
            <div className="flex-1 p-8 md:p-10 relative bg-gradient-to-br from-zinc-900/10 to-zinc-950">
              <div className="flex items-center justify-between mb-10">
                <div className="h-8 w-48 bg-zinc-800 rounded-lg animate-pulse" />
                <div className="h-9 w-28 bg-indigo-600 rounded-lg shadow-sm flex items-center justify-center opacity-90">
                   <div className="w-3 h-3 rounded-full bg-white/20 mr-2" />
                   <div className="h-3 w-12 rounded bg-white/40" />
                </div>
              </div>
              
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between gap-4 p-5 rounded-xl bg-zinc-900/40 border border-white/5 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 ${i === 1 ? 'border-indigo-500 bg-indigo-500/20' : i === 2 ? 'border-emerald-500 bg-emerald-500/20' : 'border-zinc-700'}`} />
                      <div className="flexflex-col gap-2">
                        <div className="h-4 w-40 bg-zinc-700 rounded mb-2" />
                        <div className="h-2 w-24 bg-zinc-800 rounded" />
                      </div>
                    </div>
                    <div className={`h-6 w-20 rounded-md flex justify-center items-center ${i === 1 ? 'bg-rose-500/10 border border-rose-500/20' : 'bg-zinc-800'}`}>
                       <div className={`h-2 w-10 rounded ${i === 1 ? 'bg-rose-500/50' : 'bg-zinc-700'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Overlay gradient to fade out bottom cleanly */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-24 px-6 md:px-12 mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">Everything you need to succeed.</h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">Built from the ground up to be frictionless, private, and insanely intelligent.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hero Feature (AI) - Spans 2 columns */}
          <div className="md:col-span-2 relative overflow-hidden rounded-3xl bg-zinc-900/40 border border-white/5 p-8 sm:p-10 group hover:bg-zinc-900/60 transition-colors">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-500/10 blur-[60px] rounded-full group-hover:bg-indigo-500/20 transition-colors" />
            <Sparkles className="w-8 h-8 text-indigo-400 mb-6" />
            <h3 className="text-2xl font-bold mb-3 text-zinc-100">AI-Powered Insights</h3>
            <p className="text-zinc-400 max-w-md leading-relaxed">
              HabitFlow uses advanced on-device AI to analyze your completion rates and automatically adjust your task priorities. Never fall behind on what truly matters. (Coming Sprint 3)
            </p>
          </div>

          {/* Secondary Feature 1 */}
          <div className="rounded-3xl bg-zinc-900/40 border border-white/5 p-8 sm:p-10 hover:bg-zinc-900/60 transition-colors">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-6" />
            <h3 className="text-xl font-bold mb-3 text-zinc-100">Zero-Friction</h3>
            <p className="text-zinc-400 leading-relaxed text-sm">
              With quick command modals and instant optimistic UI updates, you spend less time managing tasks and more time doing them.
            </p>
          </div>

          {/* Secondary Feature 2 (Spans 3 cols on desktop) */}
          <div className="md:col-span-3 rounded-3xl bg-gradient-to-r from-zinc-900/60 to-zinc-900/20 border border-white/5 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 group">
            <div className="max-w-xl">
              <Shield className="w-8 h-8 text-purple-400 mb-6" />
              <h3 className="text-2xl font-bold mb-3 text-zinc-100">Privacy First Architecture</h3>
              <p className="text-zinc-400 leading-relaxed">
                Your data is yours. We offer explicit privacy modes that permanently exclude sensitive tasks from being sent to our AI models for analysis.
              </p>
            </div>
            <div className="shrink-0 p-8 rounded-2xl bg-zinc-950/80 border border-white/5 group-hover:border-purple-500/30 transition-colors shadow-inner">
              <Lock className="w-16 h-16 text-zinc-600 group-hover:text-purple-400 transition-colors" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Footer */}
      <footer className="border-t border-zinc-800/50 py-12 px-6 text-center text-sm text-zinc-500 mt-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p>© {new Date().getFullYear()} HabitFlow. All rights reserved.</p>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800/60 bg-zinc-900/30 hover:bg-zinc-900/80 cursor-default transition-colors">
            <Activity className="w-4 h-4 text-zinc-400" />
            <span className="font-semibold text-zinc-300 tracking-wide text-xs uppercase">A PeoLabs Project</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
