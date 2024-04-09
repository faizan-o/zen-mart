"use client"

import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import client from '../client';
import imageUrlBuilder from '@sanity/image-url';
import {  FaTrash } from 'react-icons/fa';
import Link from 'next/link'
import Image from 'next/image'

const CartPage = () => {

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState({});
  const itemsPrices = [];

  const builer = imageUrlBuilder(client);

  const getUrl = (source) => {
    return builer.image(source);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const session = await getSession();
      if (!session || !session.user) {
        return;
      }

      try {
        const user = await client.fetch(`*[_type == 'user' && name == "${session.user.name}"]`);
        setUser(user[0]);
        const cartItems = user[0].cartItems;
        setCartItems(cartItems);
        const fetchedProducts = [];
        for (let i=0; i<cartItems.length; i++) {
          const productName  = cartItems[i].slug;
          const product = await client.fetch(`*[_type == "product" && slug.current == "${productName}"]`);
          fetchedProducts.push(product[0]);
        }
        setProducts(fetchedProducts)
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchProducts();

  }, []);

  const deleteProduct = async (slug) => {
    if (user) {
      try {
        const relevantUser = user;
        const cart = relevantUser.cartItems || [];
        const updatedCart = cart.filter(item => item.slug !== slug);
        const updatedUser = {
          ...relevantUser,
          cartItems: updatedCart
        };
        await client.patch(relevantUser._id).set(updatedUser).commit();
        location.reload();
      } catch (error) {
        console.error('Error updating user:', error.message);
      }
    }
  }

  return (
    <div className='w-[90%] mx-auto min-h-[60vh]'>
      <div className='mt-5 space-x-5 text-[18px]'>
        <span className='poppins-semibold text-gray-400'>Home</span><span className='poppins-semibold text-gray-700'>/</span><span className='poppins-bold text-black'>Cart</span>
      </div>
      {
      products.length > 0 ?
      (<div className='mt-10'>
        <table className='w-full poppins-semibold table-fixed'>
          <thead className=''>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>

              { 
                   products.map(product => {
                  const quantity = cartItems.filter(
                    item => {
                      if(item.slug == product.slug.current) return item
                      else return null
                    }
                  )[0]?.quantity;
                  const price = product.price.replace('$', '');
                  const totalPrice = Number(quantity) * Number(price);
                  itemsPrices.push(totalPrice)
                  const imageUrl = getUrl(product.image).width(200).url();
                  return(
                    <tr key={product.slug.current} className='text-center'>
                      <td className='flex justify-start space-x-4 items-center py-10'>
                        <div className='flex justify-center items-center'>
                        <Image alt={product.name} src={imageUrl} width={60} height={40}/>
                        </div>
                        <h1 className='hidden md:block'>{product.name}</h1>
                      </td>
                      <td>{product.price}</td>
                      <td>{quantity}</td>
                      <td>{totalPrice}$</td> 
                      <td className='cursor-pointer' onClick={(e) => deleteProduct(product.slug.current)}>
                        <h1 className='flex justify-center items-center'>
                          <FaTrash />
                        </h1>
                      </td>
                    </tr>
                  )
              }
              
              )
              }
          </tbody>
        </table>
      </div>):(
        <div className='h-[40vh] flex justify-center items-center'>
          <h1 className='text-center poppins-semibold'>Your Cart Is Empty</h1>
        </div>
      )
        }

        {products.length > 0 && <div className='border-2 mx-auto w-[20rem] sm:w-[22rem] sm:ml-auto sm:mr-0 px-10 py-2 border-black mb-5'>
          <h1 className='poppins-bold text-2xl'>Cart Total</h1>
          <div className='flex justify-between poppins-semibold text-gray-600 mt-6'>
            <h2>Subtotal:</h2>
            <h2>{Math.round(itemsPrices.reduce((accumulator, currentValue) => accumulator + currentValue, 0))}$</h2>
          </div>
          <div className='w-full h-[2px] bg-gray-400 rounded-full mt-1'/>
          <div className='flex justify-between poppins-semibold text-gray-600 mt-4'>
            <h2>Shipping:</h2>
            <h2>FREE</h2>
          </div>
          <div className='w-full h-[2px] bg-gray-400 rounded-full mt-1'/>
          <div className='flex justify-between poppins-semibold text-gray-600 mt-4'>
            <h2>Grand Total:</h2>
            <h2>{Math.round(itemsPrices.reduce((accumulator, currentValue) => accumulator + currentValue, 0)+2)}$</h2>
          </div>
          <Link href='/checkout'>
            <button className='poppins-semibold text-white bg-[#DB4444] px-5 mb-2 py-1 rounded-md mx-auto mt-4'>Proceed To Checkout</button>
          </Link>
        </div>}

    </div>
  );
};

export default CartPage;

