"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Crown, Zap } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

export default function HomePage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Artistic Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-20 right-1/3 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl opacity-40" />
      </div>

      {/* Hero Section */}
      <section className="relative py-24 md:py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-primary/5 border border-primary/20 rounded-full mb-8 hover:bg-primary/10 transition-colors">
            <Crown className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Luxury Redefined</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t("hero.title")}
            </span>
            <br />
            <span className="text-foreground">Artisan Products</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:shadow-lg" asChild>
              <Link href="/shop" className="flex items-center gap-2">
                {t("hero.explore")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/5 bg-transparent" asChild>
              <Link href="/about">{t("hero.learnMore")}</Link>
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
            {[
              { icon: Crown, label: "Premium Quality", desc: "Only the finest materials" },
              { icon: Sparkles, label: "Curated Selection", desc: "Handpicked by experts" },
              { icon: Zap, label: "Fast Shipping", desc: "Worldwide delivery" },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-4 border border-border/50 rounded-lg bg-card/30 hover:bg-card/60 hover:border-primary/30 transition-all group"
              >
                <feature.icon className="w-5 h-5 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-sm mb-1">{feature.label}</h3>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
