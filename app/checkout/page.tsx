"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Truck, Shield, Upload, Copy, CheckCircle } from "lucide-react"

export default function CheckoutPage() {
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("transfer")
  const [paymentProof, setPaymentProof] = useState<File | null>(null)
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState("")

  const { items, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const bankDetails = {
    accountNumber: "8153526811",
    bankName: "Palmpay",
    accountName: "Nafisat Alamu",
  }

  const handleInputChange = (field: string, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        })
        return
      }
      setPaymentProof(file)
    }
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    })
    setTimeout(() => setCopied(""), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (paymentMethod === "transfer" && !paymentProof) {
      toast({
        title: "Payment proof required",
        description: "Please upload your payment screenshot",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    // Simulate order processing
    setTimeout(() => {
      const orderId = `FC${Date.now()}`

      const order = {
        id: orderId,
        items,
        total: totalPrice,
        shippingInfo,
        paymentMethod,
        paymentProof: paymentProof ? paymentProof.name : null,
        additionalNotes,
        status: paymentMethod === "transfer" ? "pending_verification" : "confirmed",
        createdAt: new Date().toISOString(),
      }

      const existingOrders = JSON.parse(localStorage.getItem("feesah_orders") || "[]")
      existingOrders.push(order)
      localStorage.setItem("feesah_orders", JSON.stringify(existingOrders))

      clearCart()
      toast({
        title: "Order placed successfully!",
        description: `Your order #${orderId} has been submitted for processing.`,
      })
      router.push(`/order-confirmation/${orderId}`)
      setLoading(false)
    }, 2000)
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Complete Your Order
          </h1>
          <p className="text-lg text-muted-foreground">Just a few more steps to get your items!</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <Card className="border-pink-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Delivery Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName" className="text-pink-700 font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        value={shippingInfo.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className="border-pink-200 focus:border-pink-400"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-pink-700 font-medium">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="border-pink-200 focus:border-pink-400"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-pink-700 font-medium">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        value={shippingInfo.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="border-pink-200 focus:border-pink-400"
                        placeholder="+234 xxx xxx xxxx"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="whatsapp" className="text-pink-700 font-medium">
                        WhatsApp Number *
                      </Label>
                      <Input
                        id="whatsapp"
                        value={shippingInfo.whatsapp}
                        onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                        className="border-pink-200 focus:border-pink-400"
                        placeholder="+234 xxx xxx xxxx"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-pink-700 font-medium">
                      Delivery Address *
                    </Label>
                    <Textarea
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="border-pink-200 focus:border-pink-400"
                      placeholder="Enter your full delivery address"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-pink-700 font-medium">
                        City *
                      </Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="border-pink-200 focus:border-pink-400"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-pink-700 font-medium">
                        State *
                      </Label>
                      <Input
                        id="state"
                        value={shippingInfo.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        className="border-pink-200 focus:border-pink-400"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode" className="text-pink-700 font-medium">
                        Postal Code
                      </Label>
                      <Input
                        id="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={(e) => handleInputChange("postalCode", e.target.value)}
                        className="border-pink-200 focus:border-pink-400"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="border-pink-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-4 border-2 border-pink-200 rounded-lg bg-pink-50">
                      <RadioGroupItem value="transfer" id="transfer" className="border-pink-400" />
                      <Label htmlFor="transfer" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-pink-700">Bank Transfer (Recommended)</span>
                          <div className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded">Instant</div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border border-gray-200 rounded-lg">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span>Cash on Delivery</span>
                          <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">+₦500 fee</div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "transfer" && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200">
                      <h4 className="font-semibold text-pink-700 mb-3">Transfer to:</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-white rounded border">
                          <div>
                            <span className="text-sm text-gray-600">Account Number</span>
                            <p className="font-mono font-bold text-lg">{bankDetails.accountNumber}</p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(bankDetails.accountNumber, "Account Number")}
                            className="border-pink-300 text-pink-600 hover:bg-pink-50"
                          >
                            {copied === "Account Number" ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white rounded border">
                          <div>
                            <span className="text-sm text-gray-600">Bank Name</span>
                            <p className="font-semibold">{bankDetails.bankName}</p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(bankDetails.bankName, "Bank Name")}
                            className="border-pink-300 text-pink-600 hover:bg-pink-50"
                          >
                            {copied === "Bank Name" ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white rounded border">
                          <div>
                            <span className="text-sm text-gray-600">Account Name</span>
                            <p className="font-semibold">{bankDetails.accountName}</p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(bankDetails.accountName, "Account Name")}
                            className="border-pink-300 text-pink-600 hover:bg-pink-50"
                          >
                            {copied === "Account Name" ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Label htmlFor="paymentProof" className="text-pink-700 font-medium">
                          Upload Payment Screenshot *
                        </Label>
                        <div className="mt-2 flex items-center justify-center w-full">
                          <label
                            htmlFor="paymentProof"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-pink-300 border-dashed rounded-lg cursor-pointer bg-pink-50 hover:bg-pink-100"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-4 text-pink-500" />
                              <p className="mb-2 text-sm text-pink-600">
                                <span className="font-semibold">Click to upload</span> payment proof
                              </p>
                              <p className="text-xs text-pink-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                            </div>
                            <input
                              id="paymentProof"
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleFileUpload}
                            />
                          </label>
                        </div>
                        {paymentProof && (
                          <p className="mt-2 text-sm text-green-600 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            {paymentProof.name} uploaded successfully
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-pink-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-pink-700">Additional Notes (Optional)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Any special instructions for delivery or questions about your order..."
                    className="border-pink-200 focus:border-pink-400"
                    rows={3}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-pink-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-t-lg">
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm text-pink-800">{item.name}</p>
                          <p className="text-xs text-pink-600">Qty: {item.quantity}</p>
                        </div>
                        <span className="text-sm font-bold text-pink-700">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-pink-200" />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₦{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                    {paymentMethod === "cod" && (
                      <div className="flex justify-between text-sm">
                        <span>COD Fee</span>
                        <span>₦500</span>
                      </div>
                    )}
                    <Separator className="bg-pink-200" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-pink-600">
                        ₦{(totalPrice + (paymentMethod === "cod" ? 500 : 0)).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Complete Order"}
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 text-pink-500" />
                    <span>Secure & Safe Checkout</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}
