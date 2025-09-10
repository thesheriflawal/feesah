import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RotateCcw, Shield, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Returns & Exchanges</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We want you to be completely satisfied with your purchase. Here's our hassle-free return policy.
          </p>
        </div>

        {/* Return Policy Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="animate-slide-in-left hover-lift">
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">7-Day Return Window</h3>
              <p className="text-muted-foreground text-sm">
                Return items within 7 days of delivery for a full refund or exchange.
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up hover-lift" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6 text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Quality Guarantee</h3>
              <p className="text-muted-foreground text-sm">
                All products are quality-checked before shipping. Defective items are replaced immediately.
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up hover-lift" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6 text-center">
              <RotateCcw className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Easy Process</h3>
              <p className="text-muted-foreground text-sm">
                Simple return process via WhatsApp. No complicated forms or lengthy procedures.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Return Conditions */}
          <Card className="animate-slide-in-left hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span>Returnable Items</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="w-2 h-2 rounded-full p-0"></Badge>
                  <span className="text-muted-foreground">Items in original packaging and condition</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="w-2 h-2 rounded-full p-0"></Badge>
                  <span className="text-muted-foreground">Electronics with all accessories and manuals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="w-2 h-2 rounded-full p-0"></Badge>
                  <span className="text-muted-foreground">Unused beauty and personal care products</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="w-2 h-2 rounded-full p-0"></Badge>
                  <span className="text-muted-foreground">Home items without signs of use</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="w-2 h-2 rounded-full p-0"></Badge>
                  <span className="text-muted-foreground">Defective or damaged items (any condition)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Non-Returnable Items */}
          <Card className="animate-fade-in-up hover-lift" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <XCircle className="w-6 h-6 text-red-600" />
                <span>Non-Returnable Items</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Badge variant="destructive" className="w-2 h-2 rounded-full p-0"></Badge>
                  <span className="text-muted-foreground">Opened or used personal care items (hygiene reasons)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="destructive" className="w-2 h-2 rounded-full p-0"></Badge>
                  <span className="text-muted-foreground">Custom or personalized items</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="destructive" className="w-2 h-2 rounded-full p-0"></Badge>
                  <span className="text-muted-foreground">Items damaged by misuse or normal wear</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="destructive" className="w-2 h-2 rounded-full p-0"></Badge>
                  <span className="text-muted-foreground">Items returned after 7-day window</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="destructive" className="w-2 h-2 rounded-full p-0"></Badge>
                  <span className="text-muted-foreground">Items without original packaging or tags</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Return Process */}
        <Card className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <CardHeader>
            <CardTitle>How to Return an Item</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Contact Us</h3>
                <p className="text-muted-foreground text-sm">
                  Message us on WhatsApp with your order number and reason for return.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Get Approval</h3>
                <p className="text-muted-foreground text-sm">
                  We'll review your request and provide return instructions within 2 hours.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Ship Item</h3>
                <p className="text-muted-foreground text-sm">
                  Package the item securely and send via our recommended courier service.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">4</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Get Refund</h3>
                <p className="text-muted-foreground text-sm">
                  Receive your refund within 3-5 business days after we receive the item.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Refund Information */}
        <Card className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="w-6 h-6 text-primary" />
              <span>Refund & Exchange Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Refund Methods</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Bank transfer (same account used for payment)</li>
                  <li>• Store credit for future purchases</li>
                  <li>• Cash refund for cash-on-delivery orders</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-3">Processing Time</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Bank transfers: 3-5 business days</li>
                  <li>• Store credit: Immediate upon approval</li>
                  <li>• Exchanges: 5-7 business days</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-muted-foreground text-sm">
                <strong>Note:</strong> Return shipping costs are covered by Feesah Collections for defective or
                incorrect items. For other returns, customers are responsible for return shipping costs.
              </p>
            </div>

            <div className="mt-6 text-center">
              <Button className="animate-pulse-glow" asChild>
                <a href="https://wa.me/2349120902332">Start Return Process on WhatsApp</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
