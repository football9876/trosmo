import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { docQr } from "@/Logics/docQr";
import { AddData } from "@/Logics/addData";
import { collection } from "firebase/firestore";
import { db } from "@/firebase.config";
import { Product } from "@/types/products.interface";
import { useSelector } from "react-redux";
import { AppState } from "@/store/Slice";
import toast from "react-hot-toast";
import { CreditCard, Gift, Package } from "lucide-react";
import { ClipLoader } from "react-spinners";

interface TicketItem {
  id: string;
  title: string;
  price: number;
  category: string;
  type: string;
}

const ticketItems: TicketItem[] = [
  { id: "single-adult-standing", title: "Single Match - Adult Standing", price: 250, category: "Adult", type: "standing" },
  { id: "single-adult-seated", title: "Single Match - Adult Seated", price: 350, category: "Adult", type: "seated" },
  { id: "single-adult-vip", title: "Single Match - Adult VIP", price: 650, category: "Adult", type: "vip" },
  { id: "single-youth-standing", title: "Single Match - Youth Standing", price: 125, category: "Youth", type: "standing" },
  { id: "single-youth-seated", title: "Single Match - Youth Seated", price: 175, category: "Youth", type: "seated" },
  { id: "season-adult", title: "Season Ticket - Adult", price: 3500, category: "Adult", type: "season" },
  { id: "season-youth", title: "Season Ticket - Youth", price: 1750, category: "Youth", type: "season" },
];

const Payment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const itemType = searchParams.get("type") || "product";
  const itemId = searchParams.get("id") || "";
  
  const [item, setItem] = useState<Product | TicketItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const user = useSelector((root: { app: AppState }) => root.app.user);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    giftCardNumber: "",
    giftCardPin: "",
    quantity: 1,
    size: "",
  });

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        if (itemType === "ticket") {
          const ticketItem = ticketItems.find(t => t.id === itemId);
          setItem(ticketItem || null);
        } else {
          const products = await docQr("Products", {});
          const product = products.find((p: Product) => p.docId === itemId);
          setItem(product || null);
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    if (itemId) {
      fetchItem();
    } else {
      setLoading(false);
    }
  }, [itemId, itemType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please login to complete your purchase");
      navigate("/Login");
      return;
    }

    if (!formData.giftCardNumber || !formData.giftCardPin) {
      toast.error("Please enter gift card details");
      return;
    }

    setSubmitting(true);
    try {
      const orderData = {
        type: itemType,
        itemId: itemId,
        itemTitle: item ? ('title' in item ? item.title : '') : '',
        itemPrice: item?.price || 0,
        quantity: formData.quantity,
        totalAmount: (item?.price || 0) * formData.quantity,
        size: formData.size,
        userId: user.docId,
        userName: formData.fullName,
        userEmail: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        giftCardNumber: formData.giftCardNumber,
        giftCardPin: formData.giftCardPin,
        status: "pending",
        paymentMethod: "giftcard",
        createdAt: new Date().toISOString(),
      };

      await AddData(collection(db, "GiftCardOrders"), orderData);
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <ClipLoader size={40} color="hsl(var(--primary))" />
      </div>
    );
  }

  if (!item && itemId) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-heading font-bold mb-4">Item Not Found</h1>
          <p className="text-muted-foreground mb-8">The item you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/shop")}>Back to Shop</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-heading font-bold mb-8">Complete Your Purchase</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-heading font-bold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Summary
              </h2>
              
              {item && (
                <div className="border-b pb-4 mb-4">
                  {'image' in item && item.image?.[0] && (
                    <img
                      src={item.image[0]}
                      alt={item.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground text-sm capitalize">{itemType}</p>
                  <div className="flex justify-between mt-2">
                    <span>Price:</span>
                    <span className="font-bold">{item.price} NOK</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span>{formData.quantity}</span>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">{(item?.price || 0) * formData.quantity} NOK</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details */}
              <div className="bg-card border rounded-lg p-6">
                <h2 className="text-xl font-heading font-bold mb-4">Personal Details</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address (for products) */}
              {itemType === "product" && (
                <div className="bg-card border rounded-lg p-6">
                  <h2 className="text-xl font-heading font-bold mb-4">Delivery Address</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Size Selection for products */}
              {itemType === "product" && item && 'sizes' in item && item.sizes && (
                <div className="bg-card border rounded-lg p-6">
                  <h2 className="text-xl font-heading font-bold mb-4">Select Size</h2>
                  <div className="flex flex-wrap gap-2">
                    {item.sizes.map((size: string) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, size }))}
                        className={`px-4 py-2 border rounded-lg transition-colors ${
                          formData.size === size
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background hover:border-primary"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Gift Card Payment */}
              <div className="bg-card border rounded-lg p-6">
                <h2 className="text-xl font-heading font-bold mb-4 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-primary" />
                  Pay with Gift Card
                </h2>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
                  <p className="text-sm text-muted-foreground">
                    Enter your TIL gift card details below. Gift cards can be purchased at Romssa Arena or online.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="giftCardNumber">Gift Card Number *</Label>
                    <Input
                      id="giftCardNumber"
                      name="giftCardNumber"
                      value={formData.giftCardNumber}
                      onChange={handleInputChange}
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="giftCardPin">Gift Card PIN *</Label>
                    <Input
                      id="giftCardPin"
                      name="giftCardPin"
                      type="password"
                      value={formData.giftCardPin}
                      onChange={handleInputChange}
                      placeholder="XXXX"
                      required
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {submitting ? (
                  <>
                    <ClipLoader size={20} color="white" className="mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Complete Purchase
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;
