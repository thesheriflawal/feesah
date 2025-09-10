import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Clock, MapPin, Package, Shield, CreditCard } from "lucide-react"

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Shipping Information</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fast, reliable delivery across Nigeria with tracking and insurance included
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Shipping Methods */}
          <Card className="animate-slide-in-left hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="w-6 h-6 text-primary" />
                <span>Shipping Methods</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">Standard Delivery</h3>
                  <Badge variant="secondary">₦1,500 - ₦3,000</Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-2">3-7 business days</p>
                <p className="text-muted-foreground">
                  Reliable delivery to your doorstep within major cities across Nigeria.
                </p>
              </div>

              <div className="border-l-4 border-secondary pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">Express Delivery</h3>
                  <Badge variant="outline">₦2,500 - ₦5,000</Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-2">1-3 business days</p>
                <p className="text-muted-foreground">
                  Fast delivery for urgent orders within Lagos, Abuja, and Port Harcourt.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">Same Day Delivery</h3>
                  <Badge>₦3,500 - ₦7,000</Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-2">Within 24 hours</p>
                <p className="text-muted-foreground">
                  Available in Ile-Ife and surrounding areas. Order before 2 PM for same-day delivery.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Areas */}
          <Card className="animate-fade-in-up hover-lift" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-6 h-6 text-primary" />
                <span>Delivery Coverage</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Major Cities (1-3 Days)</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan", "Benin City"].map((city) => (
                      <Badge key={city} variant="secondary">
                        {city}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Southwest Region (2-5 Days)</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Ile-Ife", "Osogbo", "Abeokuta", "Ilorin", "Akure", "Ado-Ekiti"].map((city) => (
                      <Badge key={city} variant="outline">
                        {city}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Other States (3-7 Days)</h3>
                  <p className="text-muted-foreground text-sm">
                    We deliver to all 36 states in Nigeria. Delivery time may vary based on location and logistics.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="animate-fade-in-up hover-lift" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6 text-center">
              <Package className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Secure Packaging</h3>
              <p className="text-muted-foreground text-sm">
                All items are carefully packaged with bubble wrap and protective materials to ensure safe delivery.
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up hover-lift" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6 text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Delivery Insurance</h3>
              <p className="text-muted-foreground text-sm">
                All shipments are insured against loss or damage during transit at no extra cost to you.
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up hover-lift" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-6 text-center">
              <CreditCard className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Payment on Delivery</h3>
              <p className="text-muted-foreground text-sm">
                Pay with cash or POS when your order arrives. Bank transfer also accepted before shipping.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Important Notes */}
        <Card className="mt-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-6 h-6 text-primary" />
              <span>Important Shipping Notes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Orders are processed within 24 hours of payment confirmation</li>
              <li>• Delivery times exclude weekends and public holidays</li>
              <li>• Remote areas may require additional 1-2 days for delivery</li>
              <li>• You will receive tracking information via WhatsApp once your order ships</li>
              <li>• Please ensure someone is available to receive the package during delivery hours (9 AM - 6 PM)</li>
              <li>• Additional charges may apply for failed delivery attempts</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
