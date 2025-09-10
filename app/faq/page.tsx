"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    category: "Orders & Payment",
    questions: [
      {
        question: "How do I place an order?",
        answer:
          "Simply browse our products, add items to your cart, and proceed to checkout. You can pay via bank transfer or choose cash on delivery.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept bank transfers to our Palmpay account (8153526811 - Nafisat Alamu) and cash on delivery for most locations.",
      },
      {
        question: "Can I modify or cancel my order?",
        answer:
          "Yes, you can modify or cancel your order within 2 hours of placing it by contacting us on WhatsApp. After processing begins, modifications may not be possible.",
      },
      {
        question: "Do you offer installment payments?",
        answer:
          "Currently, we only accept full payment. However, we occasionally offer special payment plans for high-value items. Contact us for details.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        question: "How long does delivery take?",
        answer:
          "Delivery takes 1-7 business days depending on your location. Same-day delivery is available in Ile-Ife, while major cities receive orders within 1-3 days.",
      },
      {
        question: "Do you deliver nationwide?",
        answer: "Yes, we deliver to all 36 states in Nigeria. Delivery fees vary based on location and package size.",
      },
      {
        question: "How can I track my order?",
        answer:
          "You'll receive tracking information via WhatsApp once your order ships. You can also contact us anytime for updates on your order status.",
      },
      {
        question: "What if I'm not available during delivery?",
        answer:
          "Our delivery partners will attempt delivery 2-3 times. If unsuccessful, the package will be held at the nearest pickup location for 5 days.",
      },
    ],
  },
  {
    category: "Products & Quality",
    questions: [
      {
        question: "Are your products authentic?",
        answer:
          "Yes, all our products are 100% authentic. We source directly from authorized distributors and manufacturers to ensure quality and authenticity.",
      },
      {
        question: "Do you offer warranties?",
        answer:
          "Electronics come with manufacturer warranties ranging from 6 months to 2 years. Other products have our 30-day quality guarantee.",
      },
      {
        question: "Can I see products before buying?",
        answer:
          "For customers in Ile-Ife, we offer product viewing by appointment. Contact us on WhatsApp to schedule a viewing session.",
      },
      {
        question: "Do you restock sold-out items?",
        answer:
          "Yes, popular items are regularly restocked. Follow us on social media or join our WhatsApp updates to be notified when items are back in stock.",
      },
    ],
  },
  {
    category: "Returns & Support",
    questions: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 7-day return policy for items in original condition. Defective items can be returned anytime within the warranty period.",
      },
      {
        question: "How do I return a defective item?",
        answer:
          "Contact us immediately on WhatsApp with photos of the defective item. We'll arrange for pickup and replacement or refund within 24 hours.",
      },
      {
        question: "Do you offer customer support?",
        answer:
          "Yes, our customer support is available Monday-Saturday 9 AM-8 PM, and Sunday 12 PM-6 PM via WhatsApp, email, and phone.",
      },
      {
        question: "Can I exchange an item for a different size/color?",
        answer:
          "Yes, exchanges are possible within 7 days if the item is unused and in original packaging. Exchange shipping costs may apply.",
      },
    ],
  },
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our products, services, and policies.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <Card
              key={category.category}
              className="animate-fade-in-up hover-lift"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="w-6 h-6 text-primary" />
                  <span>{category.category}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.questions.map((faq, index) => {
                  const itemId = `${category.category}-${index}`
                  const isOpen = openItems.includes(itemId)

                  return (
                    <Collapsible key={index} open={isOpen} onOpenChange={() => toggleItem(itemId)}>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between text-left p-4 h-auto hover:bg-muted/50"
                        >
                          <span className="font-medium text-foreground">{faq.question}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-4 pb-4">
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </CollapsibleContent>
                    </Collapsible>
                  )
                })}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card
          className="mt-12 bg-gradient-to-r from-primary to-secondary text-white animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <CardContent className="p-8 text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our friendly customer support team is here to help. Get in touch
              and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" className="animate-pulse-glow" asChild>
                <a href="https://wa.me/2349120902332">Chat on WhatsApp</a>
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
                asChild
              >
                <a href="mailto:feesahcollections@gmail.com">Send Email</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
