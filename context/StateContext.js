"use client";

import product from "@/sanity/schemas/product";
import React, { createContext, useContext, useState, useEffect } from "react";
import toast, { Toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    /**
     * Function to add a product to the cart
     */ 
    const onAdd = (product, quantity) => {
        // Check if the product is already in the cart
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        // Update the total price of the cart
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);

        // Update the total quantity of items in the cart
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if (checkProductInCart) {
            // If the product is in the cart, create a new array with updated quantities
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) {
                    // Update the quantity of the specific product
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + quantity,
                    };
                }
                // Keep other products unchanged
                return cartProduct;
            });

            // Set the cart items to the updated array
            setCartItems(updatedCartItems);
        } else {
            // If the product is not in the cart, add it as a new item
            product.quantity = quantity;

            // Spread the existing cart items and add the new product
            setCartItems([...cartItems, { ...product }]);
        }

        // Show a success message
        toast.success(`${quantity} ${product.name} added to the cart 😊`);
    };

    /**
     *This Function is used to increase product quantity.
     * This function is been used in the product description.
     */ 
    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    /**
     * This Function is used to decrease product quantity.
     * This function is been used in the product description.
     */ 

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });  
    }

    const onRemove = (product) => {
        const foundProduct = cartItems.find((item) => item._id === product._id);
        if (!foundProduct) {
            toast.error("Product not found in cart.");
            return;
        }

        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    };


    /* The toggleCartItemQuantity function is designed to
        handle the increment and decrement of item quantities
         in a shopping cart.
         It takes two parameters: id (the unique identifier of
         the product) and value (either 'inc' for increment or
          'dec' for decrement).
     */
    const toggleCartItemQuantity = (id, value) => {
        const foundProduct = cartItems.find((item) => item._id === id);

        const updatedCartItems = cartItems.map((item) => {
            if (item._id === id) {
                if (value === 'inc') {
                    setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
                    setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1);
                    return { ...item, quantity: item.quantity + 1 };
                } else if (value === 'dec' && item.quantity > 1) {
                    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);
                    return { ...item, quantity: item.quantity - 1 };
                }
            }
            return item;
        });

        setCartItems(updatedCartItems);
    };

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove,
                }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);