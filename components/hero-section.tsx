import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-card to-background py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Discover Amazing Products at <span className="text-primary">Feesah Collections</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            From electronics to home essentials, beauty products to accessories - find everything you need with quality
            you can trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              <Link href="/categories">Browse Categories</Link>
            </Button>
          </div>

          {/* Contact Info */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="font-medium">WhatsApp:</span>
              <a href="https://wa.me/2349120902332" className="text-primary hover:underline">
                +234 912 090 2332
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Email:</span>
              <a href="mailto:feesahcollections@gmail.com" className="text-primary hover:underline">
                feesahcollections@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
