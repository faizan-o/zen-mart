"use client"

import { useEffect, useState } from "react"
import client from "../../client";
import { useNextSanityImage } from "next-sanity-image";
import { Product } from "../../../components/export";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { getSession } from "next-auth/react";

const ProductDetailPage = ({params}) => {

    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [user, setUser] = useState({})

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch the specific product
                const fetchedProduct = await client.fetch(`*[_type == "product" && slug.current == "${params.slug}"]{
                    name,
                    description,
                    slug,
                    price,
                    image,
                    isOnSale,
                    discount,
                    category->{name}
                }`);
                
                if (fetchedProduct.length > 0) {
                    setProduct(fetchedProduct[0]);
    
                        const fetchedRelatedProducts = await client.fetch(`*[_type == "product" && category->name == "${fetchedProduct[0].category.name}"]{
                            name,
                            description,
                            slug,
                            price,
                            image,
                            isOnSale,
                            discount,
                            category->{
                              name
                            }
                        }`, {});
        
                        setRelatedProducts(fetchedRelatedProducts);
                }
            } catch (error) {
            }
        };
        const getUser = async () => {
            const session = await getSession();
            if(session) {
                if(session.user){
                    setUser(session.user);
                }
            }
        }

        getUser();
        fetchProducts();
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

                // Check if fetched_user is defined and not empty
                if (fetched_user && fetched_user.length > 0) {
                    const relevantuser = fetched_user[0];
                    const wishlist = relevantuser.wishlistItems ? relevantuser.wishlistItems : [];
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
                } else {
                    console.error('User not found:', user.name);
                }
            } catch (error) {
                console.error('Error updating user:', error.message);
            }
        }
};        
    

    const Section = ({products}) => {

        return (
            <div className='w-[100%] mx-auto mt-20'>
                <div className='flex justify-between'>
                    <div className='flex items-center space-x-4 ml-4'>
                        <div className='w-4 h-8 rounded-r-[4px] rounded-l-[2px] bg-[#DB4444]'/>
                        <h1 className='poppins-semibold text-[#DB4444]'>{product.category ? product.category.name : ''}</h1>
                    </div>
                </div>
                <h1 className='poppins-bold text-2xl ml-4 mt-4'>Related Products</h1>
                <div className='flex flex-wrap items-center justify-between md:justify-center'>
                    {
                        products.map(
                            product => <Product classes='w-36 sm:w-48 ' showAddToWishlistButton={true} showRemoveFromWishlistButton={true} product={product} key={product.slug.current} />
                        )
                    }
                </div>
                <div className='h-[2px] w-full bg-gray-200 rounded-[100%] mt-20' />
            </div>
        );
    }
    
    const mainProductImageProps = useNextSanityImage(client, product.image);

    const addToCart = async (e) => {
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
    
                const newCartItem = {
                    _key: product.slug.current, // Assuming slug is always unique
                    slug: product.slug.current,
                    quantity: quantity,
                };
    
                // Check if the item already exists in the cart
                const isItemInCart = cart.some(item => item._key === newCartItem._key);
    
                if (!isItemInCart) {
                    const updatedUser = {
                        ...relevantuser,
                        cartItems: [...cart, newCartItem],
                        wishlistItems: wishlist,
                    };
    
                    await client
                        .patch(relevantuser._id)
                        .set(updatedUser)
                        .commit();
                }
            } catch (error) {
                console.error('Error updating user:', error.message);
            }
        }
    }
    
    return (
    <div className="mt-8">
        <div className='w-[90%] mx-auto'>
            <div className="flex items-center space-x-5 text-[12px]">
                <span className="poppins-semibold text-gray-400">Products</span>
                <div className="w-4 h-[2px] -rotate-45 bg-gray-400"/>
                <span className="poppins-semibold text-gray-500">{product.category?.name ? product.category.name : "Category"}</span>
                <div className="w-4 h-[2px] -rotate-45 bg-gray-500"/>
                <span className="poppins-semibold text-black">{product.name}</span>
            </div>
            <div className="flex flex-col items-center mt-8 md:flex-row justify-around">
                <Image {...mainProductImageProps} alt={`${product.name} Image`}/>
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col md:flex-row items-center space-x-3">
                        <h1 className="poppins-bold text-3xl text-center">{product.name}</h1>
                        <h2 className="text-green-700 poppins-bold ">( In Stock )</h2>
                    </div>
                    <h2 className="text-[#DB4444] poppins-bold text-[20px] mt-3">{product.price}</h2>
                    <p className="text-gray-600 poppins-regular text-[14px] w-[95%] mt-2">{product.description}</p>
                    <div className="h-1 w-full rounded-lg mt-2 bg-slate-300"/>
                    <div className="flex  space-x-4 items-center mt-5">
                        <div className="flex">
                            <button className="hover:bg-[#DB4444] hover:text-white border-black border-2 px-2 poppins-bold" onClick={e => setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity-1 : 1)}>-</button>
                            <h1 className="border-black border-t-2 border-b-2 px-4 poppins-bold">{quantity}</h1>
                            <button className="hover:bg-[#DB4444] hover:text-white border-black border-2 px-2 poppins-bold" onClick={e => setQuantity(prevQuantity => prevQuantity+1)}>+</button>
                        </div>
                        <button onClick={addToCart} className="bg-[#DB4444] poppins-semibold px-4 py-1 text-white rounded-md">Add To Cart</button>
                        <button onClick={addToWishlist} className="hover:bg-[#DB4444] bg-black poppins-semibold px-4 py-2 text-white rounded-md">
                            <FaHeart/>
                        </button>
                    </div>
                    <div className="flex flex-col mt-5">
                        <div className="border-[1px] border-black py-4 px-2">
                            <h1 className="poppins-semibold">Free Delivery</h1>
                            <p className="poppins-regular text-[12px]">The Home Delivery For This Product Is Free.</p>
                        </div>
                        <div className="border-[1px] border-black py-4 px-2">
                            <h1 className="poppins-semibold">Return Time</h1>
                            <p className="poppins-regular text-[12px]">Free Return Within 30 Days</p>
                        </div>
                    </div>
                </div>
            </div>
            <Section products={relatedProducts} />
        </div>
    </div>
  )
}

export default ProductDetailPage;
