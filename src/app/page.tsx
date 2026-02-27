"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Users, DollarSign, Sparkles, Zap, Shield } from "lucide-react";

// Animated counter component
const AnimatedCounter = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
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

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col relative">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.span
              className="text-7xl mb-6 block"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15,
                delay: 0.2 
              }}
            >
              🐱
            </motion.span>
            
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-teal-400 bg-clip-text text-transparent">
                DevKitty
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Track the most profitable PumpFun developers. Analyze their launches, 
              success rates, and creator fees with our{" "}
              <span className="text-purple-400 font-semibold">purr-fect</span> analytics platform.
            </motion.p>
          </motion.div>
          
          <motion.div
            className="flex gap-6 justify-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button asChild size="lg" className="gradient-primary text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-purple-500/25">
                <Link href="/leaderboard">
                  View Leaderboard <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-2 glass hover:bg-white/5">
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="glass rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">
                $<AnimatedCounter value={15} />M+
              </div>
              <div className="text-sm text-muted-foreground">Total Profits Tracked</div>
            </div>
            
            <div className="glass rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold text-teal-400 mb-2">
                <AnimatedCounter value={1250} />+
              </div>
              <div className="text-sm text-muted-foreground">Developers Analyzed</div>
            </div>
            
            <div className="glass rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">
                <AnimatedCounter value={89} />%
              </div>
              <div className="text-sm text-muted-foreground">Data Accuracy</div>
            </div>
          </motion.div>

          <motion.div
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Powered by Helius API • Real-time Solana data
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 relative">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why <span className="text-purple-400">DevKitty</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced analytics meet beautiful design for the ultimate PumpFun experience
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Profit Tracking",
                description: "Real-time monitoring of profits from token launches, sells, and creator fees with detailed breakdowns",
                color: "purple",
                delay: 0.2
              },
              {
                icon: Shield,
                title: "Success Analytics",
                description: "Deep insights into historical success rates, launch patterns, and developer performance metrics",
                color: "teal",
                delay: 0.4
              },
              {
                icon: Zap,
                title: "Live Data",
                description: "Lightning-fast updates with comprehensive earnings breakdowns and fee structures",
                color: "purple",
                delay: 0.6
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: feature.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className={`gradient-card border-${feature.color}-500/20 hover-lift h-full relative overflow-hidden`}>
                  <CardHeader className="text-center pb-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`inline-flex p-4 rounded-2xl bg-${feature.color}-500/10 mb-4`}
                    >
                      <feature.icon className={`h-8 w-8 text-${feature.color}-400`} />
                    </motion.div>
                    <CardTitle className="text-xl font-bold mb-3">{feature.title}</CardTitle>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-${feature.color}-500/5 to-transparent`} />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Performers Preview */}
      <section className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent" />
        <div className="container mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <Sparkles className="inline w-8 h-8 text-amber-400 mr-3" />
              Top Performers
            </h2>
            <p className="text-xl text-muted-foreground">
              See who's making the most on PumpFun right now
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {[
              { rank: "🥇", title: "Top Earner", addr: "9WzD...AWWM", profit: 2.8, rate: 87.5, color: "amber", delay: 0.2 },
              { rank: "🥈", title: "Runner Up", addr: "HN7c...YWrH", profit: 1.9, rate: 72.2, color: "slate", delay: 0.4 },
              { rank: "🥉", title: "Third Place", addr: "4k3D...kX6R", profit: 1.5, rate: 58.1, color: "orange", delay: 0.6 }
            ].map((performer, index) => (
              <motion.div
                key={performer.addr}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: performer.delay,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.05 }}
                className={index === 0 ? "md:-mt-4" : index === 2 ? "md:mt-4" : ""}
              >
                <Card className={`gradient-card border-${performer.color}-400/30 hover-lift animated-border relative overflow-hidden`}>
                  <CardHeader className="text-center pb-4">
                    <motion.div 
                      className="text-5xl mb-4"
                      animate={{ 
                        rotate: index === 0 ? [0, 10, -10, 0] : 0,
                        scale: index === 0 ? [1, 1.1, 1] : 1 
                      }}
                      transition={{ 
                        duration: index === 0 ? 2 : 0, 
                        repeat: index === 0 ? Infinity : 0 
                      }}
                    >
                      {performer.rank}
                    </motion.div>
                    <CardTitle className={`text-${performer.color}-400 text-lg font-bold`}>
                      {performer.title}
                    </CardTitle>
                    <CardDescription className="font-mono text-sm">
                      {performer.addr}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className={`text-3xl font-bold text-${performer.color}-400 mb-2`}>
                      $<AnimatedCounter value={performer.profit} />M
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">Total Profit</div>
                    <motion.div 
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs bg-${performer.color}-500/10 text-${performer.color}-400`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <AnimatedCounter value={performer.rate} />% Success Rate
                    </motion.div>
                  </CardContent>
                  
                  {/* Rank-based glow */}
                  {index === 0 && <div className="absolute inset-0 animate-pulse bg-amber-500/5 rounded-xl" />}
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button asChild size="lg" className="gradient-primary text-white px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-purple-500/25">
                <Link href="/leaderboard">
                  View Full Leaderboard <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}