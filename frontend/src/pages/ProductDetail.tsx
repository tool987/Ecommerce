import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductDetail } from "../services/api"; // API from your frontend services

const BASE_URL = "http://127.0.0.1:8000"; // Django backend
const DEFAULT_IMAGE = "/logo192.png"; // fallback if no image

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string | number;
  stock: number;
  in_stock: boolean;
  rating: string | number;
  image: string | null; // image path from backend, can be null
  category: { id: number; name: string } | null;
  created_at: string;
}

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        const response = await getProductDetail(slug);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!product) return <div className="text-center py-10">Product not found</div>;

  const priceValue = Number(product.price) || 0;
  const ratingValue = Number(product.rating) || 0;

  // Safely build image URL
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${BASE_URL}${product.image}` // backend provides relative path
    : DEFAULT_IMAGE;

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-10">
      {/* Product Image */}
      <img
        src={imageUrl}
        alt={product.name}
        className="w-full h-96 object-cover rounded-xl shadow"
      />

      {/* Product Information */}
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>

        <p className="text-xl text-blue-600 font-semibold mt-3">
          ${priceValue.toFixed(2)}
        </p>

        <p className="text-yellow-500 font-medium mt-2">
          ⭐ {ratingValue.toFixed(1)} / 5
        </p>

        {product.category && (
          <p className="mt-1 text-sm text-gray-500">
            Category: {product.category.name}
          </p>
        )}

        <p className="mt-4 text-gray-700 leading-relaxed">
          {product.description}
        </p>

        <p className="mt-4 font-medium">
          Stock:{" "}
          <span className={product.in_stock ? "text-green-600" : "text-red-600"}>
            {product.in_stock ? "Available" : "Out of Stock"}
          </span>
        </p>

        <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
