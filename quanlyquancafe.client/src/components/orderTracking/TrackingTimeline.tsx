import { CheckCircle, Circle, Truck, Package, Home } from "lucide-react";
import React from "react";

export const TrackingTimeline = ({ steps }) => {
  const getIcon = (status, isCompleted, isCurrent) => {
    const className = `h-10 w-8 ${
      isCompleted
        ? "text-green-700"
        : isCurrent
        ? "text-green-700"
        : "text-gray-300"
    }`;

    switch (status) {
      case "Order Placed":
        return <Package className={className} />;
      case "In Transit":
        return <Truck className={className} />;
      case "Out for Delivery":
        return <Home className={className} />;
      case "Delivered":
        return <CheckCircle className={className} />;
      default:
        return <Circle className={className} />;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="relative">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start mb-8 relative group">
            <div className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              {getIcon(step.status, step.isCompleted, step.isCurrent)}
            </div>
            <div className="ml-4">
              <h3
                className={`font-semibold ${
                  step.isCompleted
                    ? "text-secondary"
                    : step.isCurrent
                    ? "text-primary"
                    : "text-gray-400"
                }`}
              >
                {step.status}
              </h3>
              <p className="text-sm text-gray-500">{step.date}</p>
            </div>
            {index < steps.length - 1 && (
        <div
          className={`absolute left-4 top-8 w-0.5 h-12 -ml-0.5 ${
            step.isCompleted || step.isCurrent
              ? "bg-blue-500"
              : "bg-gray-200"
          }`}
        />
      )}
          </div>
        ))}
      </div>
    </div>
  );
};
