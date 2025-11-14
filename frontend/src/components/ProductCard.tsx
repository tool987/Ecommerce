import { Link } from "react-router-dom";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  rating?: number;
}

const ProductCard = ({ id, name, price, image, rating }: ProductCardProps) => {
  return (
    <div className="border rounded-xl shadow-sm hover:shadow-lg transition p-4 bg-white">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-56 object-cover rounded-lg"
        />
      </Link>

      <div className="mt-3">
        <Link to={`/product/${id}`} className="text-lg font-semibold line-clamp-2">
          {name}
        </Link>

        <p className="text-blue-600 font-bold mt-2">${price}</p>

        {rating && (
          <p className="text-yellow-500 mt-1 text-sm">
            ⭐ {rating.toFixed(1)} / 5
          </p>
        )}

        <button
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
