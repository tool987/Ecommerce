import React from "react";

interface WishListItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
  onRemove: (id: number) => void;
  onAddToCart: (id: number) => void;
}

const WishListItem: React.FC<WishListItemProps> = ({ id, name, price, image, onRemove, onAddToCart }) => {
  return (
    <div className="flex items-center gap-4 border-b py-3">
      <img src={image} alt={name} className="w-20 h-20 object-cover rounded-md" />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-gray-600">${price.toFixed(2)}</p>
      </div>
      <div className="flex gap-2">
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          onClick={() => onAddToCart(id)}
        >
          Add to Cart
        </button>
        <button
          className="text-red-600 hover:text-red-800 font-semibold"
          onClick={() => onRemove(id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default WishListItem;
