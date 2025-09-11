"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import {
  CreditCard,
  Truck,
  Shield,
  Upload,
  Copy,
  CheckCircle,
  MapPin,
} from "lucide-react";

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
  });
  const [paymentMethod, setPaymentMethod] = useState("transfer");
  const [deliveryOption, setDeliveryOption] = useState("delivery");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState("");

  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const bankDetails = {
    accountNumber: "8153526811",
    bankName: "Palmpay",
    accountName: "Nafisat Alamu",
  };

  const deliveryPricing = {
    pickup: {
      name: "Pickup",
      price: 0,
      location: "AP, after Mayfair Junction, Ile-Ife, Osun State",
    },
    parakin: { name: "Parakin", price: 500 },
    campus_gate: { name: "Campus Gate, Asherifa", price: 500 },
    oau_campus: { name: "OAU Campus", price: 700 },
    ibadan: { name: "Ibadan", price: 2000 },
    ilesha: { name: "Ilesha", price: 2000 },
  };

  const getDeliveryPrice = () => {
    if (deliveryOption === "pickup") return 0;
    return (
      deliveryPricing[deliveryLocation as keyof typeof deliveryPricing]
        ?.price || 0
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      setPaymentProof(file);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    });
    setTimeout(() => setCopied(""), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "transfer" && !paymentProof) {
      toast({
        title: "Payment proof required",
        description: "Please upload your payment screenshot",
        variant: "destructive",
      });
      return;
    }

    if (deliveryOption === "delivery" && !deliveryLocation) {
      toast({
        title: "Delivery location required",
        description: "Please select a delivery location",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const orderId = `FC${Date.now()}`;
      const deliveryPrice = getDeliveryPrice();
      const finalTotal =
        totalPrice + deliveryPrice + (paymentMethod === "cod" ? 500 : 0);

      const order = {
        id: orderId,
        items,
        subtotal: totalPrice,
        deliveryPrice,
        total: finalTotal,
        shippingInfo,
        deliveryOption,
        deliveryLocation:
          deliveryOption === "pickup" ? "pickup" : deliveryLocation,
        paymentMethod,
        paymentProof: paymentProof ? paymentProof.name : null,
        additionalNotes,
        status:
          paymentMethod === "transfer" ? "pending_verification" : "confirmed",
        createdAt: new Date().toISOString(),
      };

      const existingOrders = JSON.parse(
        localStorage.getItem("feesah_orders") || "[]"
      );
      existingOrders.push(order);
      localStorage.setItem("feesah_orders", JSON.stringify(existingOrders));

      clearCart();
      toast({
        title: "Order placed successfully!",
        description: `Your order #${orderId} has been submitted for processing.`,
      });
      router.push(`/order-confirmation/${orderId}`);
      setLoading(false);
    }, 2000);
  };

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Complete Your Order
          </h1>
          <p className="text-lg text-muted-foreground">
            Just a few more steps to get your items!
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-blue-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Delivery Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <RadioGroup
                    value={deliveryOption}
                    onValueChange={setDeliveryOption}
                  >
                    <div className="flex items-center space-x-2 p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
                      <RadioGroupItem
                        value="pickup"
                        id="pickup"
                        className="border-blue-400"
                      />
                      <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium text-blue-700">
                              Pickup
                            </span>
                            <p className="text-sm text-blue-600">
                              {deliveryPricing.pickup.location}
                            </p>
                          </div>
                          <div className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded">
                            Free
                          </div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border border-gray-200 rounded-lg">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label
                        htmlFor="delivery"
                        className="flex-1 cursor-pointer"
                      >
                        <span>Home Delivery</span>
                      </Label>
                    </div>
                  </RadioGroup>

                  {deliveryOption === "delivery" && (
                    <div className="mt-4">
                      <Label className="text-blue-700 font-medium">
                        Select Delivery Location *
                      </Label>
                      <select
                        value={deliveryLocation}
                        onChange={(e) => setDeliveryLocation(e.target.value)}
                        className="w-full mt-2 px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={deliveryOption === "delivery"}
                      >
                        <option value="">Select location</option>
                        <option value="parakin">Parakin - ₦500</option>
                        <option value="campus_gate">
                          Campus Gate, Asherifa - ₦500
                        </option>
                        <option value="oau_campus">OAU Campus - ₦700</option>
                        <option value="ibadan">Ibadan - ₦2,000</option>
                        <option value="ilesha">Ilesha - ₦2,000</option>
                      </select>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-blue-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="fullName"
                        className="text-blue-700 font-medium"
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        value={shippingInfo.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                        className="border-blue-200 focus:border-blue-400"
                        required
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="email"
                        className="text-blue-700 font-medium"
                      >
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="border-blue-200 focus:border-blue-400"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="phone"
                        className="text-blue-700 font-medium"
                      >
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        value={shippingInfo.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="border-blue-200 focus:border-blue-400"
                        placeholder="+234 xxx xxx xxxx"
                        required
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="whatsapp"
                        className="text-blue-700 font-medium"
                      >
                        WhatsApp Number *
                      </Label>
                      <Input
                        id="whatsapp"
                        value={shippingInfo.whatsapp}
                        onChange={(e) =>
                          handleInputChange("whatsapp", e.target.value)
                        }
                        className="border-blue-200 focus:border-blue-400"
                        placeholder="+234 xxx xxx xxxx"
                        required
                      />
                    </div>
                  </div>
                  {deliveryOption === "delivery" && (
                    <div>
                      <Label
                        htmlFor="address"
                        className="text-blue-700 font-medium"
                      >
                        Delivery Address *
                      </Label>
                      <Textarea
                        id="address"
                        value={shippingInfo.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        className="border-blue-200 focus:border-blue-400"
                        placeholder="Enter your full delivery address"
                        required={deliveryOption === "delivery"}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-blue-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className="flex items-center space-x-2 p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
                      <RadioGroupItem
                        value="transfer"
                        id="transfer"
                        className="border-blue-400"
                      />
                      <Label
                        htmlFor="transfer"
                        className="flex-1 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-blue-700">
                            Bank Transfer (Recommended)
                          </span>
                          <div className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                            Instant
                          </div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border border-gray-200 rounded-lg">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span>Cash on Delivery</span>
                          <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            +₦500 fee
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "transfer" && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-700 mb-3">
                        Transfer to:
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-white rounded border">
                          <div>
                            <span className="text-sm text-gray-600">
                              Account Number
                            </span>
                            <p className="font-mono font-bold text-lg">
                              {bankDetails.accountNumber}
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                bankDetails.accountNumber,
                                "Account Number"
                              )
                            }
                            className="border-blue-300 text-blue-600 hover:bg-blue-50"
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
                            <span className="text-sm text-gray-600">
                              Bank Name
                            </span>
                            <p className="font-semibold">
                              {bankDetails.bankName}
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(bankDetails.bankName, "Bank Name")
                            }
                            className="border-blue-300 text-blue-600 hover:bg-blue-50"
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
                            <span className="text-sm text-gray-600">
                              Account Name
                            </span>
                            <p className="font-semibold">
                              {bankDetails.accountName}
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                bankDetails.accountName,
                                "Account Name"
                              )
                            }
                            className="border-blue-300 text-blue-600 hover:bg-blue-50"
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
                        <Label
                          htmlFor="paymentProof"
                          className="text-blue-700 font-medium"
                        >
                          Upload Payment Screenshot *
                        </Label>
                        <div className="mt-2 flex items-center justify-center w-full">
                          <label
                            htmlFor="paymentProof"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-4 text-blue-500" />
                              <p className="mb-2 text-sm text-blue-600">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                payment proof
                              </p>
                              <p className="text-xs text-blue-500">
                                PNG, JPG or JPEG (MAX. 5MB)
                              </p>
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

              <Card className="border-blue-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-blue-700">
                    Additional Notes (Optional)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Any special instructions for delivery or questions about your order..."
                    className="border-blue-200 focus:border-blue-400"
                    rows={3}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-blue-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center p-3 bg-blue-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-sm text-blue-800">
                            {item.name}
                          </p>
                          <p className="text-xs text-blue-600">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="text-sm font-bold text-blue-700">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-blue-200" />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₦{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        {deliveryOption === "pickup" ? "Pickup" : "Delivery"}
                        {deliveryOption === "delivery" && deliveryLocation && (
                          <span className="text-sm text-gray-500 block">
                            {
                              deliveryPricing[
                                deliveryLocation as keyof typeof deliveryPricing
                              ]?.name
                            }
                          </span>
                        )}
                      </span>
                      <span
                        className={
                          getDeliveryPrice() === 0
                            ? "text-green-600 font-medium"
                            : ""
                        }
                      >
                        {getDeliveryPrice() === 0
                          ? "Free"
                          : `₦${getDeliveryPrice().toLocaleString()}`}
                      </span>
                    </div>
                    {paymentMethod === "cod" && (
                      <div className="flex justify-between text-sm">
                        <span>COD Fee</span>
                        <span>₦500</span>
                      </div>
                    )}
                    <Separator className="bg-blue-200" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">
                        ₦
                        {(
                          totalPrice +
                          getDeliveryPrice() +
                          (paymentMethod === "cod" ? 500 : 0)
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Complete Order"}
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 text-blue-500" />
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
  );
}
