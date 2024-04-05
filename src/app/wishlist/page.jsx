"use client"

import { Product } from '@/components/export';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import client from '../client';
import LoadingProducts from '../../components/LoadingProducts'

const WishlistPage = () => {
  
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const session = await getSession();
    const user = session?.user || null;
    if (!user) {
      return;
    }
  
    const name = user.name;
    const slugs_query = `*[_type == "user" && name == "${name}"]{ wishlistItems }`;
    const fetchedProductSlugs = await client.fetch(slugs_query);
    if (!fetchedProductSlugs || !fetchedProductSlugs.length) {
      return;
    }
  
    const products = [];
  
    for (let i = 0; i < fetchedProductSlugs[0].wishlistItems.length; i++) {
      const slug = fetchedProductSlugs[0].wishlistItems[i];
      const query = `*[_type == "product" && slug.current == "${slug}"]`;
      const product = await client.fetch(query);
      if (product && product.length) {
        products.push(product[0]);
      }
    }
  
    setProducts(products);
    setLoading(false);
  };
  

  useEffect(() => {fetchProducts()}, []);
  const Section = ({products}) => {
    return (
        <div className='w-[90%] mx-auto mt-20'>
            <div className='flex justify-between'>
                <div className='flex items-center space-x-4 ml-4'>
                    <div className='w-4 h-8 rounded-r-[4px] rounded-l-[2px] bg-[#DB4444]'/>
                    <h1 className='poppins-semibold text-[#DB4444]'>Your Wishlist</h1>
                </div>
            </div>
            {
              loading && 
              <div className='mt-5'>
                <LoadingProducts />
              </div>
            }
            <div className='flex flex-col items-center sm:flex-row sm:justify-around'>
                {
                    products.map(
                        product => (
                          <Product classes='w-48 sm:w-80' showAddToWishlistButton={false} showRemoveFromWishlistButton={true} product={product} key={product.slug ? product.slug.current : product.name} />
                        )
                    )
                }
            </div>
            <div className='h-[2px] w-full bg-gray-200 rounded-[100%] mt-20' />
        </div>
    );
}
  
  return (
    <div>
      <Section products={products} />
    </div>
  )
}

export default WishlistPage