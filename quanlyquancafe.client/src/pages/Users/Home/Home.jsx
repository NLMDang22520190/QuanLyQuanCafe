import React from "react";
import HomeItemDisplay from "../../../components/Users/HomeItemDisplay/HomeItemDisplay";

const Home = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <HomeItemDisplay />
        <HomeItemDisplay />
        <HomeItemDisplay />
        <HomeItemDisplay />
        <HomeItemDisplay />
        <HomeItemDisplay />
        <HomeItemDisplay />
        <HomeItemDisplay />
      </div>
    </main>
  );
};

export default Home;
