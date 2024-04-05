"use client"

import client from "@/app/client";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaTrash } from "react-icons/fa";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Product = ({ product, classes, showAddToWishlistButton, showRemoveFromWishlistButton }) => {
    const [user, setUser] = useState({});
  
    useEffect(() => {
      const getSessionData = async () => {
        const session = await getSession();
        if (session) {
          if (session.user) setUser(session.user);
        }
      };
      getSessionData();
    }, []);
  
    const addToWishlist = async (e) => {
        if (user) {
            try {
                const fetched_user = await client.fetch(`*[_type == "user" && name == "${user.name}"] {
                    _id,
                    name,
                    email,
                    password,
                    cartItems,
                    wishlistItems
                }`);
    
                const relevantuser = fetched_user[0];
                const wishlist = relevantuser.wishlistItems || [];
                const cart = relevantuser.cartItems || [];
                if (!wishlist.includes(product.slug.current)) {
                    const updatedUser = {
                        ...relevantuser,
                        cartItems: cart,
                        wishlistItems: [...wishlist, product.slug.current]
                    };
                        await client
                            .patch(relevantuser._id)
                            .set(updatedUser)
                            .commit();
                        location.reload();
                }
            } catch (error) {
                console.error('Error updating user:', error.message);

            }
        }
    };
    
    const removeFromWishlist = async (e) => {
      if (user) {
        try {
            const fetched_user = await client.fetch(`*[_type == "user" && name == "${user.name}"] {
                _id,
                name,
                email,
                password,
                cartItems,
                wishlistItems
            }`);
    
            const relevantUser = fetched_user[0];
            const wishlist = relevantUser.wishlistItems || [];
            const cart = relevantUser.cartItems || [];
    
            if (wishlist.includes(product.slug.current)) {
                // If product is present in wishlist, remove it
                const updatedWishlist = wishlist.filter(slug => slug !== product.slug.current);
    
                const updatedUser = {
                    ...relevantUser,
                    cartItems: cart,
                    wishlistItems: updatedWishlist
                };
    
                await client
                    .patch(relevantUser._id)
                    .set(updatedUser)
                    .commit();
                location.reload();    
            }
        } catch (error) {
            console.error('Error updating user:', error.message);
        }
      }    
    }
    
    
      
  
    const imageProps = useNextSanityImage(client, product.image);
    return (
      <div className={`flex flex-col justify-between mt-10 h-80 relative overflow-hidden ${classes}`}>
        {product.isOnSale && (
          <div className='absolute text-white text-[12px] top-1 left-3 font-semibold px-1 bg-[#DB4444] rounded-md'>
            <p>{product.discount}% OFF</p>
          </div>
        )}
        <div className=''>
          <Image {...imageProps} alt={`${product.name} Image`} className='object-contain w-full h-40' />
        </div>
        <h1 className='poppins-bold text-[14px]'>{product.name}</h1>
        <h2 className='font-semibold text-[#DB4444]'>{product.price}</h2>
        <Link href={`/product/${product.slug ? product.slug.current : ''}`} className='bg-[#DB4444] text-white poppins-semibold text-[15px] text-center w-28 py-1 rounded-md'>
          Buy Now
        </Link>
        <div className="flex flex-col absolute right-0">
          {showAddToWishlistButton && <button title="Add To Wishlist" onClick={addToWishlist} className="text-white hover:text-white hover:bg-black bg-[#DB4444] px-2 py-2 rounded-full">
            <FaHeart />
          </button>}
          {showRemoveFromWishlistButton && <button title="Remove From Wishlist" onClick={removeFromWishlist} className=" text-white hover:text-white hover:bg-black bg-[#DB4444] px-2 py-2 rounded-full mt-1">
            <FaTrash />
          </button>}
        </div>
      </div>
    );
};

export default Product;
