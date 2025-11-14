import React from "react";

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  onRemove: (id: number) => void;
  onQuantityChange: (id: number, qty: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ id, name, price, quantity, image, onRemove, onQuantityChange }) => {
  return (
    <div className="flex items-center gap-4 border-b py-3">
      <img src={image} alt={name} className="w-20 h-20 object-cover rounded-md" />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-gray-600">${price.toFixed(2)}</p>
        <input
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => onQuantityChange(id, parseInt(e.target.value))}
          className="border rounded px-2 py-1 w-20 mt-1"
        />
      </div>
      <button
        className="text-red-600 hover:text-red-800 font-semibold"
        onClick={() => onRemove(id)}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
