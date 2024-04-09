import Wrapper from '../components/Wrapper';
import './globals.css';

export const metadata = {
  title: {default: 'ZenMart | Buy The Best Products', template: "%s - ZenMart"},
  description: 'Zenmart is your go-to destination for premium online shopping, offering a diverse range of high-quality products to meet your every need. Whether you are in search of cutting-edge electronics or the latest fashion trends, Zenmart has something for everyone. Our electronics department features top-of-the-line smartphones, laptops, cameras, and accessories from renowned brands, ensuring you stay ahead in the tech game. Explore our fashion collection for men, women, and children, where you will discover stylish apparel, footwear, and accessories to elevate your wardrobe. With Zenmart, you can shop with confidence, knowing that each product is carefully curated for its quality and value. Experience seamless browsing and hassle-free purchasing, backed by our commitment to exceptional customer service. Join us at Zenmart and embark on a journey of unparalleled convenience and satisfaction in online shopping.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Wrapper>
          {children}
        </Wrapper>
      </body>
    </html>
  )
}
