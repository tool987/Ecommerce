import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart, Star, BarChart3 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="w-full bg-white py-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Build Your Online Store with <span className="text-blue-600">E-Commerce Power</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              A fully customizable WooCommerce-style platform. Extensions, analytics, enterprise features — everything in one place.
            </p>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-2">
              Get Started <ArrowRight size={18} />
            </button>
          </motion.div>

          <motion.img
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            src="/static/hero-store.png"
            alt="Store Preview"
            className="w-full rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* Category Links like WooCommerce */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">Explore Features</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Sales */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <ShoppingCart className="text-blue-600" />
              <h3 className="text-xl font-semibold">Sales</h3>
            </div>
            <p className="text-gray-600">Manage products, orders, checkout flow and real-time sales insights.</p>
          </motion.div>

          {/* Extensions */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <Star className="text-purple-600" />
              <h3 className="text-xl font-semibold">Extensions</h3>
            </div>
            <p className="text-gray-600">Add payment gateways, shipment plugins, themes, AI tools and more.</p>
          </motion.div>

          {/* Enterprise */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="text-green-600" />
              <h3 className="text-xl font-semibold">Enterprise</h3>
            </div>
            <p className="text-gray-600">Advanced analytics, multi-store support, and API integration for large businesses.</p>
          </motion.div>
        </div>
      </section>

      {/* Static Info Section */}
      <section className="bg-white py-20 mt-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Our Platform?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Fast, secure, scalable, and built for all businesses. Whether you’re a beginner or enterprise user, our platform gives you full control.
          </p>
        </div>
      </section>
    </div>
  );
}