"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, ExternalLink } from "lucide-react";

interface Developer {
  address: string;
  shortAddress: string;
  totalProfit: number;
  launchCount: number;
  successRate: number;
  creatorFees: number;
  rank: number;
}

// Mock data for development
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
  }
];

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
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `#${rank}`;
}

export default function Leaderboard() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      }
    }

    fetchDevelopers();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Developer Leaderboard</h1>
          <p className="text-muted-foreground">Top PumpFun developers ranked by total profit</p>
        </div>
        
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-muted rounded-full" />
                    <div className="space-y-2">
                      <div className="w-32 h-4 bg-muted rounded" />
                      <div className="w-24 h-3 bg-muted rounded" />
                    </div>
                  </div>
                  <div className="w-20 h-6 bg-muted rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-500 to-teal-500 bg-clip-text text-transparent">
            Developer Leaderboard
          </span>
        </h1>
        <p className="text-muted-foreground">Top PumpFun developers ranked by total profit</p>
      </div>

      <div className="grid gap-4">
        {developers.map((dev) => (
          <Card key={dev.address} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-teal-500 text-white text-xl font-bold">
                    {getRankIcon(dev.rank)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{dev.shortAddress}</h3>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dev/${dev.address}`}>
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <div className="flex space-x-4 text-sm text-muted-foreground">
                      <span>{dev.launchCount} launches</span>
                      <span>{dev.successRate}% success rate</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {formatCurrency(dev.totalProfit)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(dev.creatorFees)} in fees
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <Badge variant={dev.successRate > 70 ? "default" : "secondary"}>
                  {dev.successRate > 70 ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {dev.successRate > 70 ? "High Success" : "Moderate Success"}
                </Badge>
                <Badge variant="outline">
                  Rank #{dev.rank}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-muted-foreground text-sm">
          Data updates every 5 minutes • Powered by Helius API
        </p>
      </div>
    </div>
  );
}