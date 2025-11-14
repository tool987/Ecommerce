import { Link } from "react-router-dom";
import { useState } from "react";
import { FiHeart, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          E-Shop
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/products" className="hover:text-blue-600 transition">Products</Link>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search products..."
            className="border rounded-lg px-3 py-1 w-64 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Icons */}
          <div className="flex gap-4 text-xl">
            <Link to="/wishlist" className="hover:text-blue-600"><FiHeart /></Link>
            <Link to="/cart" className="hover:text-blue-600"><FiShoppingCart /></Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </div>

        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white px-6 pb-4 space-y-4 shadow-inner">
          <Link to="/" className="block">Home</Link>
          <Link to="/products" className="block">Products</Link>

          <input
            type="text"
            placeholder="Search..."
            className="border rounded-lg px-3 py-1 w-full"
          />

          <div className="flex gap-4 text-xl mt-3">
            <Link to="/wishlist"><FiHeart /></Link>
            <Link to="/cart"><FiShoppingCart /></Link>
          </div>

          <Link to="/login" className="block w-full text-center border border-blue-600 py-2 rounded-lg">
            Login
          </Link>
          <Link to="/register" className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
