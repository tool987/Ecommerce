import { FaInstagram, FaTelegram, FaFacebook, FaTwitter, FaLinkedin, FaPinterest, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">E-Shop</h2>
          <p className="text-sm">
            Your trusted online marketplace for quality products.
          </p>

          
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">Quick Links</h2>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/products" className="hover:text-white">Products</a></li>
            <li><a href="/cart" className="hover:text-white">Cart</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">Contact</h2>
          <p className="text-sm">Email: mandefroabebaw3@gmail.com</p>
          <p className="text-sm">Phone: +251 921 57 8636</p>
          {/* ⭐ Social Icons Section */}
          <div className="flex gap-4 mt-4 text-xl">
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaTelegram /></a>
            <a href="#" className="hover:text-white"><FaFacebook /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaLinkedin /></a>
            <a href="#" className="hover:text-white"><FaPinterest /></a>
            <a href="#" className="hover:text-white"><FaYoutube /></a>
          </div>
        </div>

      </div>

      <p className="text-center text-gray-500 text-sm mt-6">
        © {new Date().getFullYear()} E-Shop. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
