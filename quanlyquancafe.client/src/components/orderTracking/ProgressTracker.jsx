import { Progress } from "../ui/progress";
import React from "react";

const stages = [
  { name: "Order Placed", percentage: 0 },
  { name: "Processing", percentage: 33 },
  { name: "In Transit", percentage: 66 },
  { name: "Delivered", percentage: 100 },
];

export const ProgressTracker = ({ currentStage }) => {
  const value = stages[currentStage]?.percentage || 0;

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 animate-fade-in">
      <Progress value={value} className="h-3" />
      <div className="flex justify-between mt-4">
        {stages.map((stage, index) => (
          <div
            key={stage.name}
            className={`text-sm font-medium ${
              index <= currentStage ? "text-primary" : "text-gray-400"
            }`}
          >
            {stage.name}
          </div>
        ))}
      </div>
    </div>
  );
};
