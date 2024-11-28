import React from "react";
import { Carousel } from "flowbite-react";
import { motion } from "framer-motion";

const HeroCarouselSection = () => {
  return (
    <section className="py-12 bg-cream">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-primary-800 mb-6">
            Bộ Sưu Tập Nổi Bật
          </h2>
          <p className="text-lg text-primary-600">
            Khám phá bộ sưu tập cà phê hảo hạng được chọn lọc kỹ lưỡng của chúng
            tôi.
          </p>
        </motion.div>

        <div className="h-96 mx-auto bg-red-300 max-w-4xl">
          <Carousel slideInterval={5000}>
            <img
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80"
              alt="..."
            />
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80"
              alt="..."
            />
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80"
              alt="..."
            />
            <img
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80"
              alt="..."
            />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default HeroCarouselSection;
