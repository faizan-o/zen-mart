"use client"

import { useEffect, useState } from "react"
import client from "../../client";
import { useNextSanityImage } from "next-sanity-image";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../../../components/export";


export function generateMetadata(){
    return {
        title,
        description
    }
}

let title = ""
let description = ""

const CategoryPage = ({params}) => {
    const [products, setProducts] = useState([]);

    title = `${params.category.toUpperCase()} - Find The Best Products.`
    description = `${params.category.toUpperCase()} - Find The Best Products Related To The Category.`

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await client.fetch(`*[_type == "product" && category->name == "${params.category}"]`);
                setProducts(fetchedProducts);
            } catch (error) {
            }
        };

        fetchProducts();
    }, []);

    const Section = ({products}) => {

        return (
            <div className='w-[90%] mx-auto mt-20'>
                <div className='flex justify-between'>
                    <div className='flex items-center space-x-4 ml-4'>
                        <div className='w-4 h-8 rounded-r-[4px] rounded-l-[2px] bg-[#DB4444]'/>
                        <h1 className='poppins-semibold text-[#DB4444]'>{params.category}</h1>
                    </div>
                </div>
                <div className='flex flex-wrap items-center justify-center mt-10'>
                    {
                        products.map(
                            product => <Product classes='w-44 md:w-64' showAddToWishlistButton={true} showRemoveFromWishlistButton={true} product={product} key={product.slug.current}/>
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

export default CategoryPage