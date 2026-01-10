import { useEffect, useState } from "react";
import { docQr } from "@/Logics/docQr";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { AppState } from "@/store/Slice";
import { Package, Calendar, CheckCircle, Clock, Truck, XCircle, ShoppingBag } from "lucide-react";

interface Order {
  docId: string;
  type: string;
  itemId: string;
  itemTitle: string;
  itemPrice: number;
  quantity: number;
  totalAmount: number;
  size?: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  shipped: "bg-purple-100 text-purple-800 border-purple-200",
  delivered: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const statusIcons = {
  pending: Clock,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
  cancelled: XCircle,
};

const statusDescriptions = {
  pending: "Your order is being reviewed",
  processing: "Your order is being prepared",
  shipped: "Your order is on its way",
  delivered: "Your order has been delivered",
  cancelled: "Your order was cancelled",
};

const UserOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((root: { app: AppState }) => root.app.user);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.docId) return;
      
      try {
        setLoading(true);
        const data = await docQr("GiftCardOrders", {});
        const userOrders = data
          .filter((order: Order & { userId: string }) => order.userId === user.docId)
          .sort((a: Order, b: Order) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.docId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <ClipLoader size={40} />
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <ShoppingBag className="w-6 h-6" />
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg border">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No Orders Yet</h3>
          <p className="text-muted-foreground">
            When you make a purchase, your orders will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const StatusIcon = statusIcons[order.status];
            return (
              <div key={order.docId} className="bg-card border rounded-lg overflow-hidden">
                {/* Order Header */}
                <div className="bg-muted px-4 py-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="text-muted-foreground">
                      Order #{order.docId?.slice(0, 8)}
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusColors[order.status]}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                {/* Order Content */}
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg">{order.itemTitle}</h3>
                      <div className="text-sm text-muted-foreground capitalize mb-2">
                        {order.type}
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <span className="bg-muted px-2 py-0.5 rounded">
                          Qty: {order.quantity}
                        </span>
                        {order.size && (
                          <span className="bg-muted px-2 py-0.5 rounded">
                            Size: {order.size}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">
                        {order.totalAmount} NOK
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {order.quantity} × {order.itemPrice} NOK
                      </div>
                    </div>
                  </div>

                  {/* Status Progress */}
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <StatusIcon className="w-4 h-4" />
                      {statusDescriptions[order.status]}
                    </p>
                    
                    {order.type === "product" && order.address && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        <strong>Delivery to:</strong> {order.address}, {order.city} {order.postalCode}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
