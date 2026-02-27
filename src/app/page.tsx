import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Users, DollarSign } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-teal-500/10" />
        <div className="container mx-auto text-center relative">
          <div className="mb-8">
            <span className="text-6xl mb-4 block">🐱</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-500 to-teal-500 bg-clip-text text-transparent">
                DevKitty
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Track the most profitable PumpFun developers. Analyze their launches, 
              success rates, and creator fees with our purr-fect analytics platform.
            </p>
          </div>
          
          <div className="flex gap-4 justify-center mb-12">
            <Button asChild size="lg" className="gradient-primary text-white">
              <Link href="/leaderboard">
                View Leaderboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Powered by Helius API • Real-time Solana data
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why DevKitty?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="gradient-card border-purple-500/20">
              <CardHeader className="text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                <CardTitle>Profit Tracking</CardTitle>
                <CardDescription>
                  Track total profits from token launches, sells, and creator fees
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="gradient-card border-teal-500/20">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-teal-500" />
                <CardTitle>Success Rates</CardTitle>
                <CardDescription>
                  Historical success rates and launch patterns for each developer
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="gradient-card border-purple-500/20">
              <CardHeader className="text-center">
                <DollarSign className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                <CardTitle>Creator Fees</CardTitle>
                <CardDescription>
                  Breakdown of earnings from initial buys, sells, and fees
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Top Performers Preview */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Top Performers</h2>
            <p className="text-muted-foreground">
              See who's making the most on PumpFun
            </p>
          </div>
          
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Loading top developers...</CardTitle>
              <CardDescription className="text-center">
                Connect to see real-time leaderboard data
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild className="gradient-primary text-white">
                <Link href="/leaderboard">
                  View Full Leaderboard
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}