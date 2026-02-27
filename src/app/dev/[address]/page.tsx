"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, TrendingUp, TrendingDown, Calendar, DollarSign } from "lucide-react";

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

// Mock data
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
    }
  ]
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
  return new Date(dateString).toLocaleDateString();
}

export default function DeveloperProfile() {
  const params = useParams();
  const [profile, setProfile] = useState<DeveloperProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProfile(mockProfile);
      setLoading(false);
    }, 1000);
  }, [params.address]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="w-32 h-8 bg-muted rounded mb-6" />
          <div className="w-64 h-10 bg-muted rounded mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded" />
            ))}
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Developer Not Found</h1>
          <Button asChild>
            <Link href="/leaderboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Leaderboard
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/leaderboard">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Leaderboard
        </Link>
      </Button>

      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-teal-500 text-white text-2xl font-bold">
            #{profile.rank}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{profile.shortAddress}</h1>
            <p className="text-muted-foreground">Solana Developer</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-primary" />
              Total Profit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {formatCurrency(profile.totalProfit)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-teal-500" />
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-teal-500">
              {profile.successRate}%
            </div>
            <p className="text-sm text-muted-foreground">
              {profile.launchCount} total launches
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-secondary" />
              Creator Fees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">
              {formatCurrency(profile.totalCreatorFees)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Token Launches */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Token Launches</h2>
        <div className="space-y-4">
          {profile.launches.map((launch) => (
            <Card key={launch.tokenAddress} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-teal-500 text-white text-lg font-bold">
                      {launch.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{launch.tokenName}</h3>
                        <Badge variant={launch.isSuccessful ? "default" : "destructive"}>
                          {launch.isSuccessful ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                          {launch.isSuccessful ? "Success" : "Failed"}
                        </Badge>
                      </div>
                      <div className="flex space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(launch.launchDate)}
                        </span>
                        <span>{launch.symbol}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${launch.netProfit >= 0 ? 'text-primary' : 'text-destructive'}`}>
                      {launch.netProfit >= 0 ? '+' : ''}{formatCurrency(launch.netProfit)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatCurrency(launch.creatorFees)} fees
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Initial Buy:</span>
                    <div className="font-semibold">{formatCurrency(launch.initialBuy)}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Sells:</span>
                    <div className="font-semibold">{formatCurrency(launch.totalSells)}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Creator Fees:</span>
                    <div className="font-semibold">{formatCurrency(launch.creatorFees)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}