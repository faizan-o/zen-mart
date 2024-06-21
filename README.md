# ZenMart &nbsp;
![ZenMart Logo](https://zenmart.vercel.app/favicon.ico)

## Overview

**ZenMart** is a comprehensive e-commerce platform developed as a practice project using Next.js. This is my first project in Next.js, aiming to cover almost all essential e-commerce functionalities. The project integrates with Sanity.io for content management. While it lacks an admin panel and payment gateway, ZenMart showcases a robust foundation for a modern e-commerce application.

## Features

- **Product Listings**: Display products with detailed descriptions, images, prices, and availability.
- **Product Search and Filters**: Enhanced search functionality and filters for a better user experience.
- **User Authentication**: User registration and login using JWT.
- **Shopping Cart**: Add, remove, and update items in the shopping cart.
- **Checkout Process**: Simplified checkout process with order summary.
- **Responsive Design**: Optimized for both desktop and mobile views.
- **Content Management**: Sanity.io integration for managing product content.

## Tech Stack

- **Frontend**: Next.js, React
- **Content Management**: Sanity.io
- **Styling**: Tailwind CSS
- **Authentication**: JSON Web Tokens (JWT)

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/zenmart.git
    cd zenmart
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env.local` file in the root of your project and add the necessary environment variables.
    ```env
    NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
    NEXT_PUBLIC_SANITY_DATASET=your-sanity-dataset
    NEXT_PUBLIC_JWT_SECRET=your-jwt-secret
    ```

4. **Run the development server**:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

- **Browse Products**: Navigate through the product listings, use the search bar, and apply filters to find products.
- **Product Details**: Click on a product to view detailed information and related products.
- **Shopping Cart**: Add products to your cart and view the cart summary.
- **User Account**: Register or log in to manage your orders and profile.

## Contributing

Contributions are welcome! If you have any suggestions or find any issues, please open an issue or submit a pull request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Next.js**: For the awesome React framework.
- **Sanity.io**: For the flexible content management system.
- **Tailwind CSS**: For the utility-first CSS framework.

---

*ZenMart is a fictional project created for learning and practicing Next.js and e-commerce application development. It does not include a payment gateway or an admin panel at this stage.*

