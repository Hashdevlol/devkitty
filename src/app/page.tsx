"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

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

// Stagger container
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
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
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <motion.span 
              className="text-3xl"
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              🐱
            </motion.span>
            <span className="text-xl font-bold tracking-tight">DevKitty</span>
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/leaderboard" className="text-sm text-gray-400 hover:text-white transition-colors uppercase tracking-wider">
              Leaderboard
            </Link>
            <Link href="/leaderboard" className="btn-primary text-sm">
              Explore Devs →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24">
        <div className="max-w-7xl mx-auto px-6 py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-xs text-gray-400 uppercase tracking-widest">
                  <span className="live-dot" />
                  Live PumpFun Analytics
                </span>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] mb-8"
              >
                Track the
                <br />
                <span className="text-gray-500">top earners.</span>
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-gray-400 max-w-md mb-10 leading-relaxed"
              >
                Real-time analytics on the most profitable PumpFun developers. See who&apos;s winning, what they&apos;re launching, and how much they&apos;re making.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex gap-4">
                <Link href="/leaderboard" className="btn-primary">
                  View Leaderboard
                </Link>
                <button className="btn-secondary">
                  Learn More
                </button>
              </motion.div>
            </motion.div>

            {/* Right Column - Floating Cat + Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                {/* Floating cat */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-center mb-8"
                >
                  <span className="text-[180px] leading-none block">🐱</span>
                </motion.div>
                
                {/* Stats cards floating around */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute top-8 -left-8 card-dark p-4"
                >
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Top Earner</div>
                  <div className="text-2xl font-bold">$2.8M</div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute top-24 -right-4 card-dark p-4"
                >
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Success Rate</div>
                  <div className="text-2xl font-bold text-green-400">87.5%</div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-16 left-1/2 -translate-x-1/2 card-dark p-4"
                >
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Devs Tracked</div>
                  <div className="text-2xl font-bold">1,247</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <div className="text-center">
              <div className="stat-value"><AnimatedCounter value={2847} prefix="$" suffix="K" /></div>
              <div className="stat-label mt-2">Total Volume Tracked</div>
            </div>
            <div className="text-center">
              <div className="stat-value"><AnimatedCounter value={1247} /></div>
              <div className="stat-label mt-2">Developers Indexed</div>
            </div>
            <div className="text-center">
              <div className="stat-value"><AnimatedCounter value={8934} /></div>
              <div className="stat-label mt-2">Tokens Analyzed</div>
            </div>
            <div className="text-center">
              <div className="stat-value"><AnimatedCounter value={67} suffix="%" /></div>
              <div className="stat-label mt-2">Avg Success Rate</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="section-label mb-6">Why DevKitty</div>
            <h2 className="section-title max-w-2xl">
              Know who&apos;s making money before you ape.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-px bg-white/5">
            {[
              {
                num: "01",
                title: "Profit Tracking",
                desc: "Real-time P&L for every developer. See total profits from launches, trading fees, and creator rewards."
              },
              {
                num: "02", 
                title: "Success Rates",
                desc: "Historical win rates and launch patterns. Know who consistently delivers vs. one-hit wonders."
              },
              {
                num: "03",
                title: "Launch Analytics",
                desc: "Deep dive into individual tokens. Entry/exit points, peak MC, holder distribution, and more."
              },
              {
                num: "04",
                title: "Creator Fees",
                desc: "Track revenue from initial buys, sells, and trading fees. Understand the full revenue picture."
              },
              {
                num: "05",
                title: "Wallet Analysis",
                desc: "See connected wallets, funding patterns, and on-chain behavior. Spot coordinated activity."
              },
              {
                num: "06",
                title: "Real-time Data",
                desc: "Powered by Helius API. Sub-second updates on new launches, trades, and position changes."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-black p-10 hover:bg-[#0a0a0a] transition-colors group"
              >
                <div className="text-xs text-gray-600 mono mb-6">{feature.num}</div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-colors">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Performers Preview */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <div className="section-label mb-6">Leaderboard</div>
              <h2 className="section-title">Top Performers</h2>
            </div>
            <Link href="/leaderboard" className="btn-secondary text-sm">
              View All →
            </Link>
          </motion.div>

          <div className="space-y-px">
            {[
              { rank: 1, wallet: "9WzD...AWWM", profit: "$2.8M", rate: "87.5%", launches: 127 },
              { rank: 2, wallet: "HN7c...YWrH", profit: "$1.9M", rate: "72.2%", launches: 89 },
              { rank: 3, wallet: "4k3D...kX6R", profit: "$1.5M", rate: "58.1%", launches: 234 },
              { rank: 4, wallet: "Bx2M...pQr7", profit: "$847K", rate: "81.3%", launches: 56 },
              { rank: 5, wallet: "7nKf...3xWm", profit: "$623K", rate: "69.4%", launches: 142 },
            ].map((dev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="table-row bg-black hover:bg-[#111] transition-colors"
              >
                <div className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-8">
                    <span className="text-2xl font-bold text-gray-600 w-8">
                      {dev.rank === 1 ? "🥇" : dev.rank === 2 ? "🥈" : dev.rank === 3 ? "🥉" : `#${dev.rank}`}
                    </span>
                    <span className="mono text-lg">{dev.wallet}</span>
                  </div>
                  <div className="flex items-center gap-12">
                    <div className="text-right">
                      <div className="text-xs text-gray-500 uppercase tracking-wider">Profit</div>
                      <div className="text-lg font-bold text-green-400">{dev.profit}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 uppercase tracking-wider">Success</div>
                      <div className="text-lg font-semibold">{dev.rate}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 uppercase tracking-wider">Launches</div>
                      <div className="text-lg font-semibold text-gray-400">{dev.launches}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="text-8xl block mb-8"
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            >
              🐱
            </motion.span>
            <h2 className="text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
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
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🐱</span>
            <span className="font-bold">DevKitty</span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/leaderboard" className="text-sm text-gray-500 hover:text-white transition-colors">
              Leaderboard
            </Link>
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
              Twitter
            </a>
            <a href="https://github.com/hashdevlol/devkitty" className="text-sm text-gray-500 hover:text-white transition-colors">
              GitHub
            </a>
          </div>
          <div className="text-sm text-gray-600">
            © 2026 DevKitty
          </div>
        </div>
      </footer>
    </div>
  );
}
