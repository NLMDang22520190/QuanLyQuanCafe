import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import React from "react";


export const TrackingSearch = ({ onSearch }) => {
  const [trackingId, setTrackingId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackingId.trim()) {
      onSearch(trackingId);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter tracking number"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="flex-1 border-blue-200 focus:border-primary focus:ring-primary"
        />
        <Button type="submit" className="bg-gradient-to-r from-primary-500 to-primary-700 text-white hover:opacity-90 transition-opacity">
          <Search className="h-4 w-4 mr-2" />
          Kiểm tra
        </Button>
      </div>
    </form>
  );
};
