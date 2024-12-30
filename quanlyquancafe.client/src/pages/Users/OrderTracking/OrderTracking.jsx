import { useState } from "react";
import { TrackingSearch } from "../../../components/orderTracking/TrackingSearch";
import { TrackingTimeline } from "../../../components/orderTracking/TrackingTimeline";
import { OrderDetails } from "../../../components/orderTracking/OrderDetails";
import { toast } from "sonner";
import { HelpCircle } from "lucide-react";
import { Button } from "../../../components/ui/button";
import CustomerInfo from "../../../components/orderTracking/CustomerInfo";

const mockOrderData = {
  orderNumber: "ORD01",
  estimatedDelivery: "March 15, 2024",
  currentLocation: "Ho Chi Minh, Quan 9",
  currentStage: 3, // 0: Order Placed, 1: Processing, 2: In Transit, 3: Delivered
  customer: {
    name: "Ng*******A",
    address: "123 Nguyen Trai, Quan 1, Ho Chi Minh",
    phone: "012******9",
  },
  steps: [
    {
      status: "Order Placed",
      date: "March 10, 2024",
      isCompleted: true,
      isCurrent: true,
    },
    {
      status: "In Transit",
      isCompleted: true,
      isCurrent: false,
    },
    {
      status: "Out for Delivery",
      isCompleted: false,
      isCurrent: false,
    },
    {
      status: "Delivered",
      date: "Pending",
      isCompleted: false,
      isCurrent: false,
    },
  ],
};

const Index = () => {
  const [isTracking, setIsTracking] = useState(false);

  const handleSearch = (trackingId) => {
    setIsTracking(true);
    toast.success("Order found!", {
      description: `Tracking information for order ${trackingId}`,
    });
  };

  const handleHelpClick = () => {
    toast.info("Need help?", {
      description: "Our support team is available 24/7. Contact us for assistance.",
    });
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Main Content */}
      <div className="flex-1 bg-cream py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
          <h1 className="text-lg font-bold text-gray-600 mb-4 bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Track Your Order
            </h1>
            <p className="text-lg text-gray-600">
              Enter your tracking number to get real-time updates on your package
            </p>
          </div>

          <TrackingSearch onSearch={handleSearch} />

          {isTracking && (
            <div className="mt-8 space-y-8">
              <OrderDetails
                orderNumber={mockOrderData.orderNumber}
                estimatedDelivery={mockOrderData.estimatedDelivery}
                currentLocation={mockOrderData.currentLocation}
              />
            
              <div className="flex flex-col lg:flex-row lg:space-x-6">
                <div className="flex-1 lg:max-w-[50%] mt-[-33px] ml-[60px]">
                  <TrackingTimeline steps={mockOrderData.steps} />
                </div>

                <div className="lg:w-1/3 mt-6 lg:mt-0">
                  <CustomerInfo
                    name="Ng********A"
                    address="123 Nguyen Trai, Quan 1, Ho Chi Minh"
                    phone="012*******9"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Help Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        onClick={handleHelpClick}
      >
        <HelpCircle className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Index;
