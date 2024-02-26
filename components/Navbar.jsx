import React from 'react';
import Link from "next/link";
import Cart from "@/components/cart";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useStateContext } from '@/context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <p>
        <Link href="/" className="logo">
          <img src="../Logo.png" className="logo_image" />
          SwiftMart
        </Link>
      </p>
      <button type="button" onClick={() => setShowCart(true)} className="cart-icon">
        <AiOutlineShoppingCart />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
}

export default Navbar;