import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Phone, Mail, Clock, Headphones, Shield, Zap } from "lucide-react"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Customer Support</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're here to help! Get fast, friendly support from our dedicated customer service team.
          </p>
        </div>

        {/* Support Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="animate-slide-in-left hover-lift">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">WhatsApp Support</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Get instant help via WhatsApp. Our fastest response channel.
              </p>
              <Badge variant="secondary" className="mb-4">
                Usually responds in 30 minutes
              </Badge>
              <Button className="w-full animate-pulse-glow" asChild>
                <a href="https://wa.me/2349120902332">Chat Now</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up hover-lift" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Phone Support</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Speak directly with our support team for complex issues.
              </p>
              <Badge variant="outline" className="mb-4">
                Mon-Sat: 9 AM - 8 PM
              </Badge>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <a href="tel:+2349120902332">Call Now</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up hover-lift" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Email Support</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Send detailed inquiries and get comprehensive responses.
              </p>
              <Badge variant="outline" className="mb-4">
                Response within 24 hours
              </Badge>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <a href="mailto:feesahcollections@gmail.com">Send Email</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Support Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="animate-slide-in-left hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Headphones className="w-6 h-6 text-primary" />
                <span>What We Help With</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="w-2 h-2 rounded-full p-0"></Badge>
                  <span className="text-muted-foreground">Order tracking and status updates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="w-2 h-2 rounded-full p-0"></Badge>
                  <span className="text-muted-foreground">Product information and recommendations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="w-2 h-2 rounded-full p-0"></Badge>
                  <span className="text-muted-foreground">Returns, exchanges, and refunds</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="w-2 h-2 rounded-full p-0"></Badge>
                  <span className="text-muted-foreground">Payment and billing questions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="w-2 h-2 rounded-full p-0"></Badge>
                  <span className="text-muted-foreground">Technical support for electronics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="w-2 h-2 rounded-full p-0"></Badge>
                  <span className="text-muted-foreground">Account and profile management</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up hover-lift" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-6 h-6 text-primary" />
                <span>Support Hours</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium text-foreground">Monday - Friday</span>
                  <span className="text-muted-foreground">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium text-foreground">Saturday</span>
                  <span className="text-muted-foreground">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium text-foreground">Sunday</span>
                  <span className="text-muted-foreground">12:00 PM - 6:00 PM</span>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-muted-foreground text-sm">
                    <strong>Emergency Support:</strong> For urgent issues with recent orders, WhatsApp us anytime. We
                    monitor messages 24/7 for critical problems.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support Guarantees */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="animate-fade-in-up hover-lift" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6 text-center">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Fast Response</h3>
              <p className="text-muted-foreground text-sm">
                WhatsApp messages answered within 30 minutes during business hours.
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up hover-lift" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6 text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Problem Resolution</h3>
              <p className="text-muted-foreground text-sm">
                We work until your issue is completely resolved to your satisfaction.
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up hover-lift" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-6 text-center">
              <Headphones className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Expert Help</h3>
              <p className="text-muted-foreground text-sm">
                Our team knows our products inside out and can provide detailed assistance.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contact */}
        <Card
          className="bg-gradient-to-r from-primary to-secondary text-white animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Immediate Help?</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              For urgent issues like damaged deliveries, payment problems, or order emergencies, contact us immediately
              via WhatsApp. We're here to help resolve any problems quickly.
            </p>
            <Button variant="secondary" size="lg" className="animate-pulse-glow" asChild>
              <a href="https://wa.me/2349120902332">
                <MessageCircle className="w-5 h-5 mr-2" />
                Emergency WhatsApp Support
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
