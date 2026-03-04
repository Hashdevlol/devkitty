"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";

// Animated counter
const AnimatedCounter = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen">
      {/* Grid Background */}
      <div className="grid-bg" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-8 py-5 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl">🐱</span>
            <span className="text-xl font-bold tracking-tight">DevKitty</span>
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/leaderboard" className="text-sm text-gray-400 hover:text-white transition-colors">
              Leaderboard
            </Link>
            <Link href="/leaderboard" className="btn-primary text-sm px-6 py-3">
              Explore Devs →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20">
        <div className="max-w-6xl mx-auto px-8 py-24">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-xs text-gray-400 uppercase tracking-widest">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Live Analytics
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-8"
            >
              Track the top
              <br />
              <span className="text-gray-500">PumpFun earners.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-xl mb-12 leading-relaxed"
            >
              Real-time analytics on the most profitable developers. See who&apos;s winning, what they&apos;re launching, and how much they&apos;re making.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex gap-4"
            >
              <Link href="/leaderboard" className="btn-primary text-base px-8 py-4">
                View Leaderboard →
              </Link>
              <a href="https://github.com/hashdevlol/devkitty" className="btn-secondary text-base px-8 py-4">
                GitHub
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 bg-[#050505]">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-4 divide-x divide-white/5">
            {[
              { value: 2.8, prefix: "$", suffix: "M+", label: "Volume Tracked" },
              { value: 1247, prefix: "", suffix: "", label: "Devs Indexed" },
              { value: 8934, prefix: "", suffix: "", label: "Tokens Analyzed" },
              { value: 67, prefix: "", suffix: "%", label: "Avg Win Rate" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="py-16 text-center"
              >
                <div className="text-4xl font-bold tracking-tight mb-2">
                  {stat.prefix}{typeof stat.value === 'number' && stat.value < 100 ? stat.value : <AnimatedCounter value={stat.value} />}{stat.suffix}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Everything you need to research devs.
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Stop aping blind. Know exactly who you&apos;re following.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "📊", title: "Profit Tracking", desc: "Real-time P&L for every developer across all their launches." },
              { icon: "📈", title: "Success Rates", desc: "Historical win rates and patterns. Spot consistent winners." },
              { icon: "🔍", title: "Launch Analytics", desc: "Deep dive into tokens — entry points, peak MC, holders." },
              { icon: "💰", title: "Creator Fees", desc: "Track revenue from initial buys, sells, and trading fees." },
              { icon: "👛", title: "Wallet Analysis", desc: "Connected wallets, funding patterns, coordinated activity." },
              { icon: "⚡", title: "Real-time Data", desc: "Sub-second updates powered by Helius API." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#0a0a0a] border border-white/5 p-8 hover:border-white/10 transition-colors"
              >
                <span className="text-3xl mb-4 block">{feature.icon}</span>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Performers */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-2">Top Performers</h2>
              <p className="text-gray-500">The most profitable PumpFun developers.</p>
            </div>
            <Link href="/leaderboard" className="btn-secondary text-sm px-6 py-3">
              View All →
            </Link>
          </motion.div>

          <div className="bg-[#0a0a0a] border border-white/5">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 text-xs text-gray-500 uppercase tracking-wider">
              <div className="col-span-1">#</div>
              <div className="col-span-4">Developer</div>
              <div className="col-span-2 text-right">Profit</div>
              <div className="col-span-2 text-right">Win Rate</div>
              <div className="col-span-3 text-right">Launches</div>
            </div>
            
            {/* Table Rows */}
            {[
              { rank: 1, wallet: "9WzD...AWWM", profit: "$2.8M", rate: "87.5%", launches: 127 },
              { rank: 2, wallet: "HN7c...YWrH", profit: "$1.9M", rate: "72.2%", launches: 89 },
              { rank: 3, wallet: "4k3D...kX6R", profit: "$1.5M", rate: "58.1%", launches: 234 },
              { rank: 4, wallet: "Bx2M...pQr7", profit: "$847K", rate: "81.3%", launches: 56 },
              { rank: 5, wallet: "7nKf...3xWm", profit: "$623K", rate: "69.4%", launches: 142 },
            ].map((dev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
              >
                <div className="col-span-1 text-gray-500 font-medium">
                  {dev.rank === 1 ? "🥇" : dev.rank === 2 ? "🥈" : dev.rank === 3 ? "🥉" : dev.rank}
                </div>
                <div className="col-span-4 font-mono text-sm">{dev.wallet}</div>
                <div className="col-span-2 text-right font-semibold text-green-400">{dev.profit}</div>
                <div className="col-span-2 text-right">{dev.rate}</div>
                <div className="col-span-3 text-right text-gray-400">{dev.launches}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-7xl block mb-8">🐱</span>
            <h2 className="text-5xl font-bold tracking-tight mb-6">
              Stop aping blind.
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Know who&apos;s building. Know who&apos;s winning.
            </p>
            <Link href="/leaderboard" className="btn-primary text-lg px-10 py-5">
              Explore the Leaderboard →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl">🐱</span>
            <span className="font-semibold">DevKitty</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="https://github.com/hashdevlol/devkitty" className="hover:text-white transition-colors">GitHub</a>
          </div>
          <div className="text-sm text-gray-600">© 2026 DevKitty</div>
        </div>
      </footer>
    </div>
  );
}
