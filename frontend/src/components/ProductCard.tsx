import { Link } from "react-router-dom";

interface ProductCardProps {
  id: number;
  name: string;
  price: string | number;
  image: string;
  rating: string | number;
  slug: string;
}

const BASE_URL = "http://127.0.0.1:8000";

const ProductCard = ({ id, name, price, image, rating, slug }: ProductCardProps) => {
  // Convert string → number safely
  const ratingValue = Number(rating) || 0;
  const priceValue = Number(price) || 0;

  return (
    <div className="border rounded-xl shadow p-4 bg-white hover:shadow-lg transition">
      <Link to={`/product/${slug}`}>
        <img
          src={`${BASE_URL}${image}`}
          alt={name}
          className="w-full h-56 object-cover rounded-lg"
        />
      </Link>

      <div className="mt-3">
        <Link to={`/product/${slug}`} className="text-lg font-semibold line-clamp-2">
          {name}
        </Link>

        <p className="text-blue-600 font-bold mt-2">
          ${priceValue.toFixed(2)}
        </p>

        <p className="text-sm text-yellow-500">
          ⭐ {ratingValue.toFixed(1)} / 5
        </p>

        <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
