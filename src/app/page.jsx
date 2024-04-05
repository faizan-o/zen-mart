"use client"

import {HeroImage, Perfume, Delivery, Guarantee, Women, PS5, Service, Speaker} from '../../public/export'
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../components/export';
import { useEffect, useState } from 'react';
import client from './client'
import LoadingProducts from '../components/LoadingProducts.jsx'

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const products = await client.fetch(`*[_type == 'product'] {
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
                }`);
                const categories = await client.fetch(`*[_type == 'category']`);
                setCategories(categories);
                setProducts(products);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);


    const Section = ({category}) => {

        const filteredProducts = products.filter(product => product.category ? product.category.name === category : null);

        return (
                <div className='w-[90%] mx-auto mt-20'>
                    <div className='flex justify-between'>
                        <div className='flex items-center space-x-4 ml-4'>
                            <div className='w-4 h-8 rounded-r-[4px] rounded-l-[2px] bg-[#DB4444]'/>
                            <h1 className='poppins-semibold text-[#DB4444]'>{category}</h1>
                        </div>
                        <div className='poppins-bold text-white bg-[#DB4444] text-center py-4 w-40 cursor-pointer text-[10px]'>
                            <Link href={`/category/${category}`}>
                                View All
                            </Link>
                        </div>
                    </div>
                    <div className='flex justify-between mt-10 flex-wrap'>
                        {
                            filteredProducts.slice(0, 4).map(
                                product => <Product showAddToWishlistButton={true} showRemoveFromWishlistButton={true} product={product} classes='w-36 md:w-48' key={product.slug.current}/>
                            )
                        }
                    </div>
                    <div className='h-[2px] w-full bg-gray-200 rounded-[100%] mt-20' />
                </div>
        );
    }

    return (
        <div className=''>
            <div className='mt-5 mb-10 w-[80vw] m-auto flex justify-center'>
                <div>
                    <Image alt='Hero Image' src={HeroImage} />
                </div>
            </div>
            {loading &&
                <div className='space-y-10'>
                    <LoadingProducts />
                    <LoadingProducts />
                    <LoadingProducts />
                    <LoadingProducts />
                    <LoadingProducts />
                    <LoadingProducts />
                    <LoadingProducts />
                    <LoadingProducts />
                    <LoadingProducts />
                    <LoadingProducts />
                </div>
            }
            <div>
                {
                    categories ? categories.map(
                        category => <Section category={category.name} key={category.name}/>
                    ) : null
                }
            </div>
            <div className='flex flex-col items-center lg:flex-row lg:justify-around  mt-20'>
                <Image alt='PS5 Sale Image' src={PS5}/>
                <div className='hidden md:flex flex-col justify-between'>
                    <Image src={Women} alt='Women Collection Sale Image'/>
                    <div className='flex justify-between'>
                        <Image alt='Speaker Sale Image' src={Speaker}/>
                        <Image alt='Perfume Sale Image' src={Perfume}/>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap justify-around mt-20 mb-20'>
                <div className='h-48 w-60'>
                    <Image alt='Fast Delivery' src={Delivery}/>
                </div>
                <div className='h-48 w-60'>
                    <Image alt='24/7 Service' src={Service}/>
                </div>
                <div className='h-48 w-60'>
                    <Image alt='Money Back Guarantee' src={Guarantee}/>
                </div>
            </div>
        </div>
    );
};



export default Home;
