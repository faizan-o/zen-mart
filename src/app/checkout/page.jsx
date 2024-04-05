"use client"

import { getSession } from "next-auth/react"
import { useEffect, useState } from "react"
import client from "../client"
import { Notification } from "../../components/export"

const CheckOutPage = () => {
  
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([])
  const [error, setError] = useState({
    isError: false,
    message: ''
  })
  const totalItemsPrices = [];
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    email: '',
    number: '',
    city: '',
    address: '',
    apartment: '',
    products: [],
    total: '',
  })

  const placeOrder = async () => {
    if (
      !orderDetails.name ||
      !orderDetails.email ||
      !orderDetails.number ||
      !orderDetails.city ||
      !orderDetails.address ||
      !orderDetails.apartment
    ) {
      setError({ isError: true, errorMessage: "Please Enter All Required Credentials " });
      setTimeout(() => setError({ isError: false, errorMessage: "" }), 2000);
      return;
    }
    try {
      const token = 'skjrJP5tQNPgiKA34u2Qr4WN8CFPw6mhvMNraGKAyGnFeJj3uMGwmQOAdua3z4a08ypsqc4HpoWBpJbECi52nx9t23GwUiOQep6uV1c9sxUyCCKUhDIBPC7Cr0WEgg28jMIAdki8uwjruDeOC3WdQjcS6lxeMAOLSFL1110Vt2VUAeVGwvYJ';
  
      const productsWithQuantity = products.map(product => {
        const quantity = cart.filter(item => item.slug === product.slug.current)[0]?.quantity || 0;
        return {_key:product.slug.current, name: product.name, quantity: String(quantity) };
      });

      const res = await fetch(`https://pjbv0qei.api.sanity.io/v1/data/mutate/production`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          "mutations": [
            {
              "create": {
                "_type": "orders",
                ...orderDetails,
                products: productsWithQuantity,
                isDelivered: false,
                total: String(totalItemsPrices.reduce((accumulator, currentValue) => accumulator + currentValue, 0))
              },
            },
          ],
        })
      });
  
      if (res.ok) {
        
      } else {
        setError({ isError: true, errorMessage: "Something Went Wrong" });
        setTimeout(() => setError({ isError: false, errorMessage: "" }), 2000);
      }
    } catch (error) {
      const errorMessage = error.message;
      setError({ isError: true, errorMessage: errorMessage });
      setTimeout(() => setError({ isError: false, errorMessage: "" }), 2000);
    }
  };
  

  useEffect(
    () => {
      const fetchProducts = async () => {
        const session = await getSession();
        if(!session || !session.user){
          window.location.href = '/'
          return;
        }
        setUser(session.user);

        const fetchedUser = await client.fetch(`*[_type == "user" && name == "${session.user.name}"]`)
        const cartProductsName = fetchedUser[0]?.cartItems || [];
        setCart(cartProductsName)
        const cartProducts = []
        
        for (let i = 0; i < cartProductsName.length; i++) {
          const productName = cartProductsName[i].slug;
          const product = await client.fetch(`*[_type == "product" && slug.current == "${productName}"]`)
          cartProducts.push(product[0]);
        }

        setProducts(cartProducts);
      }

      fetchProducts();
    }, []
  )

  const handleChange = (e) => {
    setOrderDetails(
      prevDetails => (
        {
          ...prevDetails,
          [e.target.name]: e.target.value,
        }
      )
    )
  }
  
  return (
    <div className="w-full flex flex-col justify-center md:flex-row">
      {
        error.isError && <Notification heading="OOPS!" message={error.message} />
      }
      <div className="w-full md:w-[60%]">
        <h1 className="poppins-bold text-4xl mx-auto w-[90%] mt-10 mb-3">Billing Details</h1>
        <div className="mt-5 space-y-8">
          <div className="w-[90%] mx-auto">
            <h1 className="poppins-medium text-[14px]">Your Name</h1>
            <input name="name" type="text" value={orderDetails.name} onChange={handleChange} className="bg-[#d6ead798] w-full outline-none px-1 py-2 md:w-[70%] mt-1" />
          </div>
          <div className="w-[90%] mx-auto">
            <h1 className="poppins-medium text-[14px]">Your Email</h1>
            <input name="email" type="email" value={orderDetails.email} onChange={handleChange} className="bg-[#d6ead798] w-full outline-none px-1 py-2 md:w-[70%] mt-1" />
          </div>
          <div className="w-[90%] mx-auto">
            <h1 className="poppins-medium text-[14px]">Your Phone Number</h1>
            <input name="number" type="text" value={orderDetails.number} onChange={handleChange} className="bg-[#d6ead798] w-full outline-none px-1 py-2 md:w-[70%] mt-1" />
          </div>
          <div className="w-[90%] mx-auto">
            <h1 className="poppins-medium text-[14px]">Your City</h1>
            <input name="city" type="text" value={orderDetails.city} onChange={handleChange} className="bg-[#d6ead798] w-full outline-none px-1 py-2 md:w-[70%] mt-1" />
          </div>
          <div className="w-[90%] mx-auto">
            <h1 className="poppins-medium text-[14px]">Your Street Address</h1>
            <input name="address" type="text" value={orderDetails.address} onChange={handleChange} className="bg-[#d6ead798] w-full outline-none px-1 py-2 md:w-[70%] mt-1" />
          </div>
          <div className="w-[90%] mx-auto">
            <h1 className="poppins-medium text-[14px]">Your Apartment</h1>
            <input name="apartment" type="text" value={orderDetails.apartment} onChange={handleChange} className="bg-[#d6ead798] w-full outline-none px-1 py-2 md:w-[70%] mt-1" />
          </div>
          <div className="h-10"/>
        </div>
      </div>
      <div className="w-full md:w-[30%] pr-8">
        <div className="flex flex-col w-[90%] mx-auto">
          <div className="md:h-[40rem] flex flex-col justify-center space-y-5">
            <h1 className="poppins-semibold text-2xl">Products</h1>
            <div className="space-y-5">
              {
                products.map(product => {
                  const quantity = cart.filter(
                    item => {
                      if(item.slug == product.slug.current) return item
                      else return null
                    }
                  )[0]?.quantity;
                  const price = product.price.replace('$', '');
                  const totalPrice = Number(quantity) * Number(price);
                  totalItemsPrices.push(totalPrice);
                  return (
                    <div key={product.slug.current} className="mt-2">
                      <div className="flex justify-between poppins-medium">
                        <h1>{product.name}</h1>
                        <h1>{totalPrice}$</h1>
                      </div>
                    </div>
                  )
                })
              }
              <div>
                <div className="flex justify-between mt-2 poppins-medium">
                  <h1>Subtotal:</h1>
                  <h1>{totalItemsPrices.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}$</h1>
                </div>
                <div className="h-[2px] rounded-md w-full bg-gray-950 mt-1"/>
                <div className="flex justify-between mt-2 poppins-medium">
                  <h1>Shipping:</h1>
                  <h1>FREE</h1>
                </div>
                <div className="h-[2px] rounded-md w-full bg-gray-950 mt-1"/>
                <div className="flex justify-between mt-2 poppins-medium">
                  <h1>Total Bill:</h1>
                  <h1>{totalItemsPrices.reduce((accumulator, currentValue) => accumulator + currentValue, 0)+2}$</h1>
                </div>
                <div className="h-[2px] rounded-md w-full bg-gray-950 mt-1"/>
                <h1 className="poppins-semibold mt-2">Note: Cash On Delivey.</h1>
                <button className="text-white bg-[#DB4444] poppins-semibold px-5 py-2 mt-5 mb-20 md:mb-0" onClick={placeOrder}>Place Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckOutPage