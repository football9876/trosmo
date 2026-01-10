import { useEffect, useState } from "react";
import { docQr } from "@/Logics/docQr";
import { updateData } from "@/Logics/updateData";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Package, CreditCard, User, MapPin, Calendar, CheckCircle, Clock, Truck, XCircle } from "lucide-react";

interface GiftCardOrder {
  docId: string;
  type: string;
  itemId: string;
  itemTitle: string;
  itemPrice: number;
  quantity: number;
  totalAmount: number;
  size?: string;
  userId: string;
  userName: string;
  userEmail: string;
  phone: string;
  address?: string;
  city?: string;
  postalCode?: string;
  giftCardNumber: string;
  giftCardPin: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: string;
  createdAt: string;
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusIcons = {
  pending: Clock,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
  cancelled: XCircle,
};

const GiftCardOrders = () => {
  const [orders, setOrders] = useState<GiftCardOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<GiftCardOrder | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await docQr("GiftCardOrders", {});
      setOrders(data.sort((a: GiftCardOrder, b: GiftCardOrder) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, newStatus: GiftCardOrder["status"]) => {
    setUpdatingId(orderId);
    try {
      await updateData("GiftCardOrders", orderId, { status: newStatus });
      setOrders(prev => 
        prev.map(order => 
          order.docId === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <ClipLoader size={40} />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <CreditCard className="w-6 h-6" />
          Gift Card Orders ({orders.length})
        </h1>
        <Button onClick={fetchOrders} variant="outline">
          Refresh
        </Button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No gift card orders yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="p-3 text-left font-semibold">Order Info</th>
                <th className="p-3 text-left font-semibold">Customer</th>
                <th className="p-3 text-left font-semibold">Item</th>
                <th className="p-3 text-left font-semibold">Gift Card</th>
                <th className="p-3 text-left font-semibold">Status</th>
                <th className="p-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const StatusIcon = statusIcons[order.status];
                return (
                  <tr key={order.docId} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <div className="text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground mb-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                        <div className="font-mono text-xs">{order.docId?.slice(0, 8)}...</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-start gap-2">
                        <User className="w-4 h-4 mt-1 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{order.userName}</div>
                          <div className="text-sm text-muted-foreground">{order.userEmail}</div>
                          <div className="text-sm text-muted-foreground">{order.phone}</div>
                          {order.address && (
                            <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3" />
                              {order.address}, {order.city} {order.postalCode}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{order.itemTitle}</div>
                        <div className="text-sm text-muted-foreground capitalize">{order.type}</div>
                        <div className="text-sm">
                          Qty: {order.quantity} × {order.itemPrice} NOK
                        </div>
                        {order.size && (
                          <div className="text-xs bg-muted px-2 py-0.5 rounded inline-block mt-1">
                            Size: {order.size}
                          </div>
                        )}
                        <div className="font-bold text-primary mt-1">
                          Total: {order.totalAmount} NOK
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-mono text-sm">
                        <div>{order.giftCardNumber}</div>
                        <div className="text-muted-foreground">PIN: ****</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                        <StatusIcon className="w-3 h-3" />
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col gap-1">
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order.docId, e.target.value as GiftCardOrder["status"])}
                          disabled={updatingId === order.docId}
                          className="text-sm border rounded px-2 py-1 bg-background"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        {updatingId === order.docId && (
                          <ClipLoader size={16} />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GiftCardOrders;
