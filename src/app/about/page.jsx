import Image from "next/image"
import { AboutImage1, AboutImage2, AboutImage3, AboutImage4 } from "../../../public/export"


const AboutPage = () => {
  return (
    <div className="mx-auto w-[90%] space-y-20 mb-10">
      <h1 className="text-6xl mt-6 text-[#DB4444] poppins-bold">Our Story</h1>
      <div className="mt-10 flex flex-col md:flex-row items-center justify-around">
        <div>
          <h1 className="poppins-bold text-2xl">The Visionaries Behind Zen-Mart</h1>
          <p className="mt-2">Embark on a journey with the passionate entrepreneurs who dreamed of creating a sanctuary in the digital realm. These visionaries, driven by a desire to bring balance and tranquility to the online shopping experience, pooled their diverse talents and expertise to birth Zen-Mart into existence. Fuelled by their shared commitment to mindfulness and authenticity, they set out to revolutionize the eCommerce landscape, one serene transaction at a time.</p>
        </div>
        <div className="mt-5 md:mt-0 md:w-[100rem] md:ml-10">
          <Image src={AboutImage1} alt="About Image 1"/>
        </div>
      </div>
      <div className="mt-10 flex flex-col-reverse md:flex-row items-center justify-around">
        <div className="mt-5 md:mt-0 md:w-[100rem]">
          <Image src={AboutImage2} alt="About Image 1"/>
        </div>
        <div className="md:ml-10">
          <h1 className="poppins-bold text-2xl">Crafting Tranquility: The Zen-Mart Experience</h1>
          <p className="mt-2">Delve into the meticulously curated user interface and product selection designed to evoke serenity and harmony for every visitor. Unlike traditional eCommerce platforms that bombard users with flashy advertisements and overwhelming options, Zen-Mart embraces minimalism as a gateway to tranquility. Every click, swipe, and scroll is a testament to the beauty of simplicity, inviting users to explore its digital aisles with ease and clarity.</p>
        </div>
      </div>
      <div className="mt-10 flex flex-col md:flex-row items-center justify-around">
        <div>
          <h1 className="poppins-bold text-2xl">Building a Community of Mindful Living</h1>
          <p className="mt-2">Learn how Zen-Mart goes beyond transactions to foster meaningful connections among customers, artisans, and sustainability advocates through interactive platforms and engaging content. More than just a marketplace, Zen-Mart is a thriving community united by a shared appreciation for mindful living and conscious consumption. Through blog posts, workshops, and forums, users are invited to engage in thoughtful dialogue, share their experiences, and inspire one another to lead more intentional lives.</p>
        </div>
        <div className="mt-5 md:mt-0 md:w-[100rem] md:ml-10">
          <Image src={AboutImage3} alt="About Image 1"/>
        </div>
      </div>
      <div className="mt-10 flex flex-col-reverse md:flex-row items-center justify-around">
        <div className="mt-5 md:mt-0 md:w-[100rem] md:ml-10">
          <Image src={AboutImage4} alt="About Image 1"/>
        </div>
        <div className="md:ml-10">
          <h1 className="poppins-bold text-2xl">Commitment to Conscious Consumption</h1>
          <p className="mt-2">Discover how Zen-Mart prioritizes ethically-sourced products and eco-friendly practices to promote well-being for both customers and the planet. From sourcing partnerships with artisans who uphold fair labor practices to implementing innovative packaging solutions that minimize environmental impact, every decision made by Zen-Mart is guided by a deep sense of responsibility to future generations. Through conscious consumption, users have the power to make a positive impact on the world, one mindful purchase at a time.</p>
        </div>
      </div> 
    </div>
  )
}

export default AboutPage