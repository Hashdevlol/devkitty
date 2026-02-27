"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, TrendingUp, TrendingDown, Calendar, DollarSign, Crown, Trophy, Target, Activity, Sparkles } from "lucide-react";

interface TokenLaunch {
  tokenAddress: string;
  tokenName: string;
  symbol: string;
  launchDate: string;
  initialBuy: number;
  totalSells: number;
  creatorFees: number;
  netProfit: number;
  isSuccessful: boolean;
}

interface DeveloperProfile {
  address: string;
  shortAddress: string;
  totalProfit: number;
  launchCount: number;
  successRate: number;
  totalCreatorFees: number;
  launches: TokenLaunch[];
  rank: number;
}

// Enhanced mock data
const mockProfile: DeveloperProfile = {
  address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
  shortAddress: "9WzD...AWWM",
  totalProfit: 2847350,
  launchCount: 23,
  successRate: 87.5,
  totalCreatorFees: 1250000,
  rank: 1,
  launches: [
    {
      tokenAddress: "5fTwKZP2AK1DDuZQziHyKF1PBKZtLz1BmM3aF4kBBxhF",
      tokenName: "CatCoin",
      symbol: "CAT",
      launchDate: "2026-02-25",
      initialBuy: 50000,
      totalSells: 450000,
      creatorFees: 125000,
      netProfit: 525000,
      isSuccessful: true
    },
    {
      tokenAddress: "8xNVwHzZf4Qx1pGvKjRqMnSdCvBnEtYsL9wDfJ2MxKuP",
      tokenName: "MoonPurr",
      symbol: "PURR",
      launchDate: "2026-02-20",
      initialBuy: 25000,
      totalSells: 180000,
      creatorFees: 75000,
      netProfit: 230000,
      isSuccessful: true
    },
    {
      tokenAddress: "3hBxWzKoL5pJyFvRt9MqUx2GdCnEtYvLz1BmM3aF4kZ",
      tokenName: "FailKitty",
      symbol: "FAIL",
      launchDate: "2026-02-15",
      initialBuy: 30000,
      totalSells: 5000,
      creatorFees: 2500,
      netProfit: -22500,
      isSuccessful: false
    },
    {
      tokenAddress: "7mPxWzKoL5pJyFvRt9MqUx2GdCnEtYvLz1BmM3aF8kZ",
      tokenName: "PurrToken",
      symbol: "PURRT",
      launchDate: "2026-02-10",
      initialBuy: 40000,
      totalSells: 320000,
      creatorFees: 95000,
      netProfit: 375000,
      isSuccessful: true
    },
    {
      tokenAddress: "9nQxWzKoL5pJyFvRt9MqUx2GdCnEtYvLz1BmM3aF9kZ",
      tokenName: "KittyDAO",
      symbol: "KDAO",
      launchDate: "2026-02-05",
      initialBuy: 60000,
      totalSells: 850000,
      creatorFees: 200000,
      netProfit: 990000,
      isSuccessful: true
    }
  ]
};

// Animated Counter Component
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

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  }
  return `$${amount.toFixed(0)}`;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

function getRankColor(rank: number) {
  if (rank === 1) return "text-amber-400";
  if (rank === 2) return "text-slate-400";
  if (rank === 3) return "text-orange-400";
  return "text-purple-400";
}

function getRankGlow(rank: number) {
  if (rank === 1) return "shadow-amber-500/20";
  if (rank === 2) return "shadow-slate-400/20";
  if (rank === 3) return "shadow-orange-400/20";
  return "shadow-purple-500/20";
}

export default function DeveloperProfile() {
  const params = useParams();
  const [profile, setProfile] = useState<DeveloperProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with realistic delay
    setTimeout(() => {
      setProfile(mockProfile);
      setLoading(false);
    }, 1500);
  }, [params.address]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 relative">
        {/* Animated loading screen */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          {/* Back button skeleton */}
          <div className="w-32 h-10 bg-muted/30 rounded-xl shimmer" />
          
          {/* Header skeleton */}
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-2xl shimmer" />
            <div className="space-y-3">
              <div className="w-48 h-8 bg-muted/30 rounded shimmer" />
              <div className="w-32 h-4 bg-muted/20 rounded shimmer" />
            </div>
          </div>
          
          {/* Stats cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 space-y-3"
              >
                <div className="w-32 h-4 bg-muted/30 rounded shimmer" />
                <div className="w-24 h-8 bg-muted/40 rounded shimmer" />
              </motion.div>
            ))}
          </div>
          
          {/* Token launches skeleton */}
          <div className="space-y-4">
            <div className="w-40 h-6 bg-muted/30 rounded shimmer" />
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-xl shimmer" />
                    <div className="space-y-2">
                      <div className="w-32 h-4 bg-muted/30 rounded shimmer" />
                      <div className="w-24 h-3 bg-muted/20 rounded shimmer" />
                    </div>
                  </div>
                  <div className="w-20 h-6 bg-muted/30 rounded shimmer" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          className="absolute top-8 right-8 flex items-center space-x-2 text-purple-400"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Activity className="w-4 h-4 animate-pulse" />
          <span className="text-sm">Loading profile...</span>
        </motion.div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center glass rounded-2xl p-12 max-w-md mx-auto"
        >
          <div className="text-6xl mb-6">😿</div>
          <h1 className="text-2xl font-bold mb-4">Developer Not Found</h1>
          <p className="text-muted-foreground mb-6">
            This developer might be hiding in the shadows...
          </p>
          <Button asChild size="lg" className="gradient-primary text-white">
            <Link href="/leaderboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Leaderboard
            </Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 relative">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Button variant="ghost" asChild className="mb-8 hover:bg-purple-500/10">
          <Link href="/leaderboard">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Leaderboard
          </Link>
        </Button>
      </motion.div>

      {/* Profile Header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex items-center space-x-6 mb-6">
          <motion.div
            className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-teal-500/20 border border-purple-500/30 text-2xl font-bold ${getRankColor(profile.rank)} ${getRankGlow(profile.rank)} relative overflow-hidden`}
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <Crown className="w-8 h-8" />
            <span className="absolute -bottom-1 -right-1 text-xs bg-background/80 px-1 rounded">
              #{profile.rank}
            </span>
          </motion.div>
          <div>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {profile.shortAddress}
            </motion.h1>
            <motion.p 
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Solana PumpFun Developer
            </motion.p>
          </div>
        </div>

        {/* Rank badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          {profile.rank <= 3 && (
            <Badge className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-400 border-amber-500/30 px-4 py-2 text-sm">
              <Trophy className="w-4 h-4 mr-2" />
              Top 3 Developer
            </Badge>
          )}
        </motion.div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { 
            icon: DollarSign, 
            title: "Total Profit", 
            value: formatCurrency(profile.totalProfit), 
            color: "purple",
            suffix: "",
            rawValue: profile.totalProfit 
          },
          { 
            icon: Target, 
            title: "Success Rate", 
            value: `${profile.successRate}%`, 
            color: "teal",
            subtitle: `${profile.launchCount} total launches`,
            rawValue: profile.successRate
          },
          { 
            icon: Sparkles, 
            title: "Creator Fees", 
            value: formatCurrency(profile.totalCreatorFees), 
            color: "amber",
            suffix: "",
            rawValue: profile.totalCreatorFees 
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.2 + index * 0.1,
              type: "spring",
              stiffness: 100 
            }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group"
          >
            <Card className="gradient-card hover-lift h-full relative overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`p-2 rounded-xl bg-${stat.color}-500/10 mr-3`}
                  >
                    <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                  </motion.div>
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-4xl font-bold text-${stat.color}-400 mb-2`}>
                  {stat.rawValue ? (
                    <AnimatedCounter value={stat.rawValue} suffix={stat.title === "Success Rate" ? "%" : ""} />
                  ) : (
                    stat.value
                  )}
                </div>
                {stat.subtitle && (
                  <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
                )}
              </CardContent>
              
              {/* Hover glow effect */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-${stat.color}-500/5 to-transparent`} />
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Token Launches */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="flex items-center space-x-3 mb-8">
          <Trophy className="w-6 h-6 text-purple-400" />
          <h2 className="text-3xl font-bold">Token Launches</h2>
          <Badge variant="outline" className="border-purple-500/30 text-purple-400">
            {profile.launches.length} total
          </Badge>
        </div>
        
        <div className="space-y-6">
          {profile.launches.map((launch, index) => (
            <motion.div
              key={launch.tokenAddress}
              initial={{ opacity: 0, x: -50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.8 + index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group"
            >
              <Card className="gradient-card hover-lift relative overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-6">
                      {/* Token Avatar */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-teal-500/20 border border-purple-500/30 text-xl font-bold relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                        {launch.symbol.slice(0, 2)}
                      </motion.div>
                      
                      <div>
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-xl font-bold">{launch.tokenName}</h3>
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <Badge 
                              variant={launch.isSuccessful ? "default" : "destructive"}
                              className={launch.isSuccessful ? 'bg-teal-500/20 text-teal-400 border-teal-500/30' : ''}
                            >
                              {launch.isSuccessful ? (
                                <TrendingUp className="w-3 h-3 mr-1" />
                              ) : (
                                <TrendingDown className="w-3 h-3 mr-1" />
                              )}
                              {launch.isSuccessful ? "Success" : "Failed"}
                            </Badge>
                          </motion.div>
                        </div>
                        
                        <div className="flex space-x-6 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(launch.launchDate)}
                          </span>
                          <span className="font-mono font-medium">{launch.symbol}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Profit Display */}
                    <div className="text-right">
                      <motion.div 
                        className={`text-3xl font-bold mb-2 ${
                          launch.netProfit >= 0 ? 'text-teal-400' : 'text-red-400'
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {launch.netProfit >= 0 ? '+' : ''}{formatCurrency(launch.netProfit)}
                      </motion.div>
                      <div className="text-sm text-muted-foreground">
                        {formatCurrency(launch.creatorFees)} fees
                      </div>
                    </div>
                  </div>
                  
                  {/* Detailed Stats */}
                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/50">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground mb-1">Initial Buy</div>
                      <div className="font-bold text-lg">{formatCurrency(launch.initialBuy)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground mb-1">Total Sells</div>
                      <div className="font-bold text-lg">{formatCurrency(launch.totalSells)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground mb-1">Creator Fees</div>
                      <div className="font-bold text-lg">{formatCurrency(launch.creatorFees)}</div>
                    </div>
                  </div>

                  {/* Success indicator progress bar */}
                  <motion.div
                    className="mt-4 w-full bg-muted/30 rounded-full h-1 overflow-hidden"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className={`h-full rounded-full ${
                        launch.isSuccessful ? 'bg-gradient-to-r from-teal-500 to-teal-400' : 'bg-red-400'
                      }`}
                      initial={{ width: 0 }}
                      whileInView={{ width: launch.isSuccessful ? '100%' : '20%' }}
                      transition={{ duration: 1.2, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </motion.div>
                </CardContent>
                
                {/* Hover glow effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${
                  launch.isSuccessful ? 'from-teal-500/5 to-transparent' : 'from-red-500/5 to-transparent'
                }`} />
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer Stats */}
      <motion.div
        className="mt-16 glass rounded-2xl p-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-2xl font-bold text-purple-400">
              <AnimatedCounter value={profile.launches.filter(l => l.isSuccessful).length} />
            </div>
            <div className="text-sm text-muted-foreground">Successful Launches</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-400">
              <AnimatedCounter value={Math.round(profile.totalProfit / profile.launchCount)} prefix="$" />
            </div>
            <div className="text-sm text-muted-foreground">Avg Profit Per Launch</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-teal-400">
              <AnimatedCounter value={Math.round(profile.totalCreatorFees / profile.launchCount)} prefix="$" />
            </div>
            <div className="text-sm text-muted-foreground">Avg Fees Per Launch</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">
              <AnimatedCounter value={Math.round((profile.totalCreatorFees / profile.totalProfit) * 100)} suffix="%" />
            </div>
            <div className="text-sm text-muted-foreground">Fee Ratio</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}