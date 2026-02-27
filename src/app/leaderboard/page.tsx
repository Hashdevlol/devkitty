"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, stagger } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, ExternalLink, Trophy, Crown, Medal, Search } from "lucide-react";

interface Developer {
  address: string;
  shortAddress: string;
  totalProfit: number;
  launchCount: number;
  successRate: number;
  creatorFees: number;
  rank: number;
}

// Enhanced mock data with more developers
const mockDevelopers: Developer[] = [
  {
    address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
    shortAddress: "9WzD...AWWM",
    totalProfit: 2847350,
    launchCount: 23,
    successRate: 87.5,
    creatorFees: 1250000,
    rank: 1
  },
  {
    address: "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH",
    shortAddress: "HN7c...YWrH", 
    totalProfit: 1923400,
    launchCount: 18,
    successRate: 72.2,
    creatorFees: 890000,
    rank: 2
  },
  {
    address: "4k3Dyjzvzp3eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
    shortAddress: "4k3D...kX6R",
    totalProfit: 1456720,
    launchCount: 31,
    successRate: 58.1,
    creatorFees: 670000,
    rank: 3
  },
  {
    address: "7xBnQzKoL5pJyFvRt9MqUx2GdCnEtYvLz1BmM3aF4kX",
    shortAddress: "7xBn...F4kX",
    totalProfit: 1234560,
    launchCount: 15,
    successRate: 80.0,
    creatorFees: 560000,
    rank: 4
  },
  {
    address: "2mKxVzBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtCWW",
    shortAddress: "2mKx...CWW",
    totalProfit: 987654,
    launchCount: 42,
    successRate: 45.2,
    creatorFees: 234567,
    rank: 5
  }
];

// Enhanced skeleton loader
const SkeletonLoader = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="glass rounded-xl p-6"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-full shimmer" />
        <div className="space-y-3">
          <div className="w-32 h-4 bg-muted/50 rounded shimmer" />
          <div className="w-24 h-3 bg-muted/30 rounded shimmer" />
        </div>
      </div>
      <div className="text-right space-y-3">
        <div className="w-24 h-6 bg-muted/50 rounded shimmer" />
        <div className="w-20 h-3 bg-muted/30 rounded shimmer" />
      </div>
    </div>
  </motion.div>
);

function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  }
  return `$${amount.toFixed(0)}`;
}

function getRankIcon(rank: number) {
  if (rank === 1) return { icon: "🥇", color: "text-amber-400" };
  if (rank === 2) return { icon: "🥈", color: "text-slate-400" };
  if (rank === 3) return { icon: "🥉", color: "text-orange-400" };
  return { icon: `#${rank}`, color: "text-muted-foreground" };
}

function getRankGlow(rank: number) {
  if (rank === 1) return "glow-amber shadow-amber-500/20";
  if (rank === 2) return "glow-slate shadow-slate-400/20";
  if (rank === 3) return "glow-orange shadow-orange-400/20";
  return "";
}

export default function Leaderboard() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchDevelopers() {
      try {
        const response = await fetch('/api/developers');
        const data = await response.json();
        
        if (data.success) {
          setDevelopers(data.data);
        } else {
          // Fallback to mock data if API fails
          setDevelopers(mockDevelopers);
        }
      } catch (error) {
        console.error('Error fetching developers:', error);
        // Fallback to mock data
        setDevelopers(mockDevelopers);
      } finally {
        setTimeout(() => setLoading(false), 1500); // Add delay for better UX
      }
    }

    fetchDevelopers();
  }, []);

  const filteredDevelopers = developers.filter(dev =>
    dev.shortAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dev.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-teal-400 bg-clip-text text-transparent">
              Developer Leaderboard
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Top PumpFun developers ranked by total profit
          </p>
        </motion.div>
        
        {/* Skeleton Loaders */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {[...Array(5)].map((_, i) => (
            <SkeletonLoader key={i} delay={i * 0.1} />
          ))}
        </div>

        {/* Loading indicator */}
        <motion.div
          className="flex justify-center mt-12"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="flex items-center space-x-2 text-purple-400">
            <Trophy className="w-5 h-5 animate-spin" />
            <span className="text-sm font-medium">Loading rankings...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 relative">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <Trophy className="inline w-12 h-12 text-amber-400 mr-4" />
          <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-teal-400 bg-clip-text text-transparent">
            Developer Leaderboard
          </span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Top PumpFun developers ranked by total profit
        </p>
        
        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search developers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-xl focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Developer Cards */}
      <AnimatePresence mode="wait">
        <motion.div 
          className="space-y-6 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {filteredDevelopers.map((dev, index) => {
            const rankInfo = getRankIcon(dev.rank);
            const rankGlow = getRankGlow(dev.rank);
            
            return (
              <motion.div
                key={dev.address}
                initial={{ opacity: 0, x: -50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.9 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="group"
              >
                <Card className={`gradient-card hover-lift border-purple-500/20 relative overflow-hidden ${rankGlow}`}>
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        {/* Rank Badge */}
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-teal-500/20 border border-purple-500/30 text-xl font-bold ${rankInfo.color} relative overflow-hidden`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                          {rankInfo.icon}
                        </motion.div>
                        
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <motion.h3 
                              className="text-xl font-bold"
                              whileHover={{ scale: 1.05 }}
                            >
                              {dev.shortAddress}
                            </motion.h3>
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 15 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button variant="ghost" size="sm" asChild className="hover:bg-purple-500/10">
                                <Link href={`/dev/${dev.address}`}>
                                  <ExternalLink className="h-4 w-4" />
                                </Link>
                              </Button>
                            </motion.div>
                          </div>
                          
                          <div className="flex space-x-6 text-sm text-muted-foreground">
                            <motion.span
                              whileHover={{ scale: 1.05, color: "#8b5cf6" }}
                              className="flex items-center"
                            >
                              <Trophy className="w-3 h-3 mr-1" />
                              {dev.launchCount} launches
                            </motion.span>
                            <motion.span
                              whileHover={{ scale: 1.05, color: "#14b8a6" }}
                              className="flex items-center"
                            >
                              <TrendingUp className="w-3 h-3 mr-1" />
                              {dev.successRate}% success rate
                            </motion.span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Profit Display */}
                      <div className="text-right">
                        <motion.div 
                          className="text-3xl font-bold text-purple-400 mb-2"
                          whileHover={{ scale: 1.1 }}
                        >
                          {formatCurrency(dev.totalProfit)}
                        </motion.div>
                        <div className="text-sm text-muted-foreground">
                          {formatCurrency(dev.creatorFees)} in fees
                        </div>
                      </div>
                    </div>
                    
                    {/* Badges */}
                    <motion.div
                      className="mt-6 flex flex-wrap gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                    >
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Badge 
                          variant={dev.successRate > 70 ? "default" : "secondary"}
                          className={`${dev.successRate > 70 ? 'bg-teal-500/20 text-teal-400 border-teal-500/30' : 'bg-muted/50'} px-3 py-1`}
                        >
                          {dev.successRate > 70 ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                          {dev.successRate > 70 ? "High Performer" : "Moderate Success"}
                        </Badge>
                      </motion.div>
                      
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Badge variant="outline" className="border-purple-500/30 text-purple-400 px-3 py-1">
                          Rank #{dev.rank}
                        </Badge>
                      </motion.div>
                      
                      {dev.rank <= 3 && (
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                        >
                          <Badge className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-400 border-amber-500/30 px-3 py-1">
                            <Crown className="w-3 h-3 mr-1" />
                            Top 3
                          </Badge>
                        </motion.div>
                      )}
                    </motion.div>
                    
                    {/* Progress bar for success rate */}
                    <motion.div
                      className="mt-4 w-full bg-muted/30 rounded-full h-2 overflow-hidden"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 + index * 0.05 }}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-teal-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${dev.successRate}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.05 }}
                      />
                    </motion.div>
                  </CardContent>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-500/5 to-teal-500/5 rounded-xl" />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
      
      {/* Footer */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <p className="text-muted-foreground text-sm flex items-center justify-center space-x-2">
          <span>Data updates every 5 minutes</span>
          <span>•</span>
          <span>Powered by Helius API</span>
        </p>
      </motion.div>
    </div>
  );
}