import { image } from "framer-motion/client"

export const Categories = [
    {
        title: "Sarees",
        slug: "sarees",
        image: "https://www.taneira.com/on/demandware.static/-/Sites-Taneira-Library/default/dw17214a7a/HomePage/ShopByCategory/Sarees_003_M.png",
    },
    {
        title: "Kurtas",
        slug: "kurtas",
        image: "https://www.taneira.com/on/demandware.static/-/Sites-Taneira-Library/default/dwfb416bed/HomePage/ShopByCategory/Kurtas_003_M.png",
    },
    {
        title: "Short Tops",
        slug: "short-tops",
        image: "https://www.taneira.com/on/demandware.static/-/Sites-Taneira-Library/default/dw1cd25b1b/HomePage/ShopByCategory/ShortTops_003_M.png",
    },
    {
        title: "Lehengas",
        slug: "lehengas",
        image: "https://www.taneira.com/on/demandware.static/-/Sites-Taneira-Library/default/dw8d3e577f/HomePage/ShopByCategory/Lehengas_003_M.png",
    },
    {
        title: "Blouses",
        slug: "blouses",
        image: "https://www.taneira.com/on/demandware.static/-/Sites-Taneira-Library/default/dw7a979460/HomePage/ShopByCategory/Blouses_003_M.png",
    },

]
export const occasions = [
    {
        title: "Formal Wear",
        slug: "sarees",
        image: "https://www.taneira.com/on/demandware.static/-/Sites-Taneira-Library/default/dw86f4f2d7/HomePage/ShopByOccasion/new/Shop%20By%20Occassion_HM3.jpg"
    },
    {
        title: "Casual Wear",
        slug: "kurtas",
        image: "https://www.taneira.com/on/demandware.static/-/Sites-Taneira-Library/default/dw7a979460/HomePage/ShopByCategory/Blouses_003_M.png",
    },
    {
        title: "Festive Wear",
        slug: "short-tops",
        image: "https://www.taneira.com/on/demandware.static/-/Sites-Taneira-Library/default/dwbb0c965a/HomePage/ShopByOccasion/new/Shop%20By%20Occassion_HM8.jpg",
    },
    {
        title: "Reception Ready",
        slug: "lehengas",
        image: "https://www.taneira.com/on/demandware.static/-/Sites-Taneira-Library/default/dw86f4f2d7/HomePage/ShopByOccasion/new/Shop%20By%20Occassion_HM3.jpg"
    },
    {
        title: "Mehandi Magic",
        slug: "blouses",
        image: "https://www.taneira.com/on/demandware.static/-/Sites-Taneira-Library/default/dw1baf597f/HomePage/ShopByOccasion/new/Shop%20By%20Occassion_HM2.jpg"
    },

]


export const products = [
    {
        id: 1,
        title: "Dark Wine Maheshwari Silk Cotton Handloom Saree",
        category: "sarees",
        brand: "Thenmozhi Designs",
        video: "/videos/product1.mp4",
        images: [
            "https://thenmozhidesigns.com/cdn/shop/files/3S2A2614.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/3S2A2618.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/3S2A2636.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/3S2A2626.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/3S2A2637.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/3S2A2649.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/3S2A2652.jpg"
        ],
        price: 4500,
        discount: 15,
        description: "Elevate your ethnic wardrobe with this Dark Wine Maheshwari Silk Cotton Handloom Saree by Thenmozhi Designs. Crafted from premium silk cotton fabric, this handloom saree beautifully blends traditional craftsmanship with modern elegance. The rich dark wine shade, adorned with intricate block prints and faux zari, makes it perfect for weddings, festive wear, and special occasions. Lightweight yet luxurious, this saree drapes gracefully and ensures all-day comfort. It comes with an unstitched pink blouse piece (70 cm x 1.1 m) that complements the saree’s design. A must-have silk cotton saree for women who love authentic handloom sarees with a touch of sophistication.",
        product_specs: {
            "Category": "Saree",
            "Fabrics": "Silk Cotton",
            "Origin": "Rajasthan",
            "Occasion": "Festive Wear",
            "Craft": "Block Printed",
            "Blouse Type": "Unstitched Blouse Piece",
            "Blouse Color": "Pink",
            "Blouse Dimension": "70 cm x 1.1 m",
            "Color": "Pink",
            "Zari": "Faux Zari",
            "Wash Care": "Dry Clean"
        },
        rating: 4.5,
        reviews: [
            {
                username: "Ashra Ashick",
                rating: 4,
                reviewTitle: "Red linen saree",
                comment: "Amazing ..color and the texture is stunning .. easy to drape .. having long length .. very breezy and of high quality.",
                date: "08/29/2025"
            },
            {
                username: "Meera Nair",
                rating: 5,
                reviewTitle: "Elegant Kanjivaram Silk",
                comment: "Absolutely beautiful saree, the zari work is exquisite. Perfect for weddings and festivals. Got lots of compliments!",
                date: "08/27/2025"
            },
            {
                username: "Priya Sharma",
                rating: 3,
                reviewTitle: "Cotton Handloom Saree",
                comment: "Fabric is soft and comfortable for daily wear but the color is slightly lighter than shown in the picture.",
                date: "08/25/2025"
            },
            {
                username: "Sana Khan",
                rating: 5,
                reviewTitle: "Designer Georgette Saree",
                comment: "Loved the flowy material and the embroidery is very fine. Easy to drape and looks very stylish.",
                date: "08/20/2025"
            },
            {
                username: "Lakshmi Iyer",
                rating: 4,
                reviewTitle: "Traditional Banarasi Saree",
                comment: "Rich fabric and intricate golden work. A bit heavy but that’s expected for Banarasi. Totally worth the price!",
                date: "08/18/2025"
            },
            {
                username: "Neha Verma",
                rating: 2,
                reviewTitle: "Printed Chiffon Saree",
                comment: "The print is nice but the fabric quality was not as expected. Feels a bit flimsy.",
                date: "08/15/2025"
            }
        ],
        sku: "MH-DARKWINEMAHESHWARI-109",
        availabilityStatus: "In stock",
        stock: 10,
        shippingInformation: "Ships in 1 week",
        returnPolicy: "7 day return",

    },
    {
        id: 2,
        title: "Red Zari Checked Chettinad Saree",
        category: "sarees",
        brand: "Thenmozhi Designs",
        video: "/videos/product2.mp4",
        images: [
            "https://thenmozhidesigns.com/cdn/shop/files/RedzaricheckedChettinadsaree_1.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/RedzaricheckedChettinadsaree_2.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/RedzaricheckedChettinadsaree_4.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/RedzaricheckedChettinadsaree_5.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/RedzaricheckedChettinadsaree_6.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/RedzaricheckedChettinadsaree_3.jpg"
        ]
        ,
        price: 4500,
        discount: 15,
        description: "Elevate your ethnic wardrobe with this Dark Wine Maheshwari Silk Cotton Handloom Saree by Thenmozhi Designs. Crafted from premium silk cotton fabric, this handloom saree beautifully blends traditional craftsmanship with modern elegance. The rich dark wine shade, adorned with intricate block prints and faux zari, makes it perfect for weddings, festive wear, and special occasions. Lightweight yet luxurious, this saree drapes gracefully and ensures all-day comfort. It comes with an unstitched pink blouse piece (70 cm x 1.1 m) that complements the saree’s design. A must-have silk cotton saree for women who love authentic handloom sarees with a touch of sophistication.",
        product_specs: {
            "Category": "Saree",
            "Fabrics": "Silk Cotton",
            "Origin": "Rajasthan",
            "Occasion": "Festive Wear",
            "Craft": "Block Printed",
            "Blouse Type": "Unstitched Blouse Piece",
            "Blouse Color": "Pink",
            "Blouse Dimension": "70 cm x 1.1 m",
            "Color": "Pink",
            "Zari": "Faux Zari",
            "Wash Care": "Dry Clean"
        },
        rating: 3.8,
        reviews: [
            {
                username: "Ashra Ashick",
                rating: 4,
                reviewTitle: "Red linen saree",
                comment: "Amazing ..color and the texture is stunning .. easy to drape .. having long length .. very breezy and of high quality.",
                date: "08/29/2025"
            },
            {
                username: "Meera Nair",
                rating: 5,
                reviewTitle: "Elegant Kanjivaram Silk",
                comment: "Absolutely beautiful saree, the zari work is exquisite. Perfect for weddings and festivals. Got lots of compliments!",
                date: "08/27/2025"
            },
            {
                username: "Priya Sharma",
                rating: 3,
                reviewTitle: "Cotton Handloom Saree",
                comment: "Fabric is soft and comfortable for daily wear but the color is slightly lighter than shown in the picture.",
                date: "08/25/2025"
            },
            {
                username: "Sana Khan",
                rating: 5,
                reviewTitle: "Designer Georgette Saree",
                comment: "Loved the flowy material and the embroidery is very fine. Easy to drape and looks very stylish.",
                date: "08/20/2025"
            },
            {
                username: "Lakshmi Iyer",
                rating: 4,
                reviewTitle: "Traditional Banarasi Saree",
                comment: "Rich fabric and intricate golden work. A bit heavy but that’s expected for Banarasi. Totally worth the price!",
                date: "08/18/2025"
            },
            {
                username: "Neha Verma",
                rating: 2,
                reviewTitle: "Printed Chiffon Saree",
                comment: "The print is nice but the fabric quality was not as expected. Feels a bit flimsy.",
                date: "08/15/2025"
            }
        ],
        sku: "MH-DARKWINEMAHESHWARI-109",
        availabilityStatus: "In stock",
        stock: 20,
        shippingInformation: "Estimated delivery in 3-4 days",
        returnPolicy: "7 day return",

    },
    {
        id: 3,
        title: "Black and Green Chettinad Cotton Saree",
        category: "sarees",
        brand: "Thenmozhi Designs",
        video: "/videos/product3.mp4",
        images: [
            "https://thenmozhidesigns.com/cdn/shop/files/BlackandgreenChettinadcottonsaree_5.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/BlackandgreenChettinadcottonsaree_4.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/BlackandgreenChettinadcottonsaree_6.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/BlackandgreenChettinadcottonsaree_1.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/BlackandgreenChettinadcottonsaree_2.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/BlackandgreenChettinadcottonsaree_3.jpg"
        ],
        price: 4500,
        discount: 15,
        description: "Elevate your ethnic wardrobe with this Dark Wine Maheshwari Silk Cotton Handloom Saree by Thenmozhi Designs. Crafted from premium silk cotton fabric, this handloom saree beautifully blends traditional craftsmanship with modern elegance. The rich dark wine shade, adorned with intricate block prints and faux zari, makes it perfect for weddings, festive wear, and special occasions. Lightweight yet luxurious, this saree drapes gracefully and ensures all-day comfort. It comes with an unstitched pink blouse piece (70 cm x 1.1 m) that complements the saree’s design. A must-have silk cotton saree for women who love authentic handloom sarees with a touch of sophistication.",
        product_specs: {
            "Category": "Saree",
            "Fabrics": "Silk Cotton",
            "Origin": "Rajasthan",
            "Occasion": "Festive Wear",
            "Craft": "Block Printed",
            "Blouse Type": "Unstitched Blouse Piece",
            "Blouse Color": "Pink",
            "Blouse Dimension": "70 cm x 1.1 m",
            "Color": "Pink",
            "Zari": "Faux Zari",
            "Wash Care": "Dry Clean"
        },
        rating: 4.5,
        reviews: [
            {
                username: "Ashra Ashick",
                rating: 4,
                reviewTitle: "Red linen saree",
                comment: "Amazing ..color and the texture is stunning .. easy to drape .. having long length .. very breezy and of high quality.",
                date: "08/29/2025"
            },
            {
                username: "Meera Nair",
                rating: 5,
                reviewTitle: "Elegant Kanjivaram Silk",
                comment: "Absolutely beautiful saree, the zari work is exquisite. Perfect for weddings and festivals. Got lots of compliments!",
                date: "08/27/2025"
            },
            {
                username: "Priya Sharma",
                rating: 3,
                reviewTitle: "Cotton Handloom Saree",
                comment: "Fabric is soft and comfortable for daily wear but the color is slightly lighter than shown in the picture.",
                date: "08/25/2025"
            },
            {
                username: "Sana Khan",
                rating: 5,
                reviewTitle: "Designer Georgette Saree",
                comment: "Loved the flowy material and the embroidery is very fine. Easy to drape and looks very stylish.",
                date: "08/20/2025"
            },
            {
                username: "Lakshmi Iyer",
                rating: 4,
                reviewTitle: "Traditional Banarasi Saree",
                comment: "Rich fabric and intricate golden work. A bit heavy but that’s expected for Banarasi. Totally worth the price!",
                date: "08/18/2025"
            },
            {
                username: "Neha Verma",
                rating: 2,
                reviewTitle: "Printed Chiffon Saree",
                comment: "The print is nice but the fabric quality was not as expected. Feels a bit flimsy.",
                date: "08/15/2025"
            }
        ],
        sku: "MH-DARKWINEMAHESHWARI-109",
        availabilityStatus: "In stock",
        stock: 10,
        shippingInformation: "Ships in 1 week",
        returnPolicy: "7 day return",

    },
    {
        id: 4,
        title: "Rust Brown Chettinad Cotton Saree",
        category: "sarees",
        brand: "Thenmozhi Designs",
        video: "/videos/product4.mp4",
        images: [
            "https://thenmozhidesigns.com/cdn/shop/files/352A3923.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/352A3920.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/352A3905.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/352A3917.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/352A3883.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/352A3952.jpg"
        ],
        price: 5500,
        discount: 15,
        description: "Elevate your ethnic wardrobe with this Dark Wine Maheshwari Silk Cotton Handloom Saree by Thenmozhi Designs. Crafted from premium silk cotton fabric, this handloom saree beautifully blends traditional craftsmanship with modern elegance. The rich dark wine shade, adorned with intricate block prints and faux zari, makes it perfect for weddings, festive wear, and special occasions. Lightweight yet luxurious, this saree drapes gracefully and ensures all-day comfort. It comes with an unstitched pink blouse piece (70 cm x 1.1 m) that complements the saree’s design. A must-have silk cotton saree for women who love authentic handloom sarees with a touch of sophistication.",
        product_specs: {
            "Category": "Saree",
            "Fabrics": "Silk Cotton",
            "Origin": "Rajasthan",
            "Occasion": "Festive Wear",
            "Craft": "Block Printed",
            "Blouse Type": "Unstitched Blouse Piece",
            "Blouse Color": "Pink",
            "Blouse Dimension": "70 cm x 1.1 m",
            "Color": "Pink",
            "Zari": "Faux Zari",
            "Wash Care": "Dry Clean"
        },
        rating: 4.1,
        reviews: [
            {
                username: "Ashra Ashick",
                rating: 4,
                reviewTitle: "Red linen saree",
                comment: "Amazing ..color and the texture is stunning .. easy to drape .. having long length .. very breezy and of high quality.",
                date: "08/29/2025"
            },
            {
                username: "Meera Nair",
                rating: 5,
                reviewTitle: "Elegant Kanjivaram Silk",
                comment: "Absolutely beautiful saree, the zari work is exquisite. Perfect for weddings and festivals. Got lots of compliments!",
                date: "08/27/2025"
            },
            {
                username: "Priya Sharma",
                rating: 3,
                reviewTitle: "Cotton Handloom Saree",
                comment: "Fabric is soft and comfortable for daily wear but the color is slightly lighter than shown in the picture.",
                date: "08/25/2025"
            },
            {
                username: "Sana Khan",
                rating: 5,
                reviewTitle: "Designer Georgette Saree",
                comment: "Loved the flowy material and the embroidery is very fine. Easy to drape and looks very stylish.",
                date: "08/20/2025"
            },
            {
                username: "Lakshmi Iyer",
                rating: 4,
                reviewTitle: "Traditional Banarasi Saree",
                comment: "Rich fabric and intricate golden work. A bit heavy but that’s expected for Banarasi. Totally worth the price!",
                date: "08/18/2025"
            },
            {
                username: "Neha Verma",
                rating: 2,
                reviewTitle: "Printed Chiffon Saree",
                comment: "The print is nice but the fabric quality was not as expected. Feels a bit flimsy.",
                date: "08/15/2025"
            }
        ],
        sku: "MH-DARKWINEMAHESHWARI-109",
        availabilityStatus: "In stock",
        stock: 10,
        shippingInformation: "Ships in 1 week",
        returnPolicy: "7 day return",

    },
    {
        id: 5,
        title: "Pastel Pistachio Green Floral Block Printed suit set",
        category: "kurtas",
        brand: "Thenmozhi Designs",
        video: "/videos/product5.mp4",
        images: [
            "https://thenmozhidesigns.com/cdn/shop/files/PastelPistachioGreenFloralBlockPrintedsuitset_2.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/PastelPistachioGreenFloralBlockPrintedsuitset_3.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/PastelPistachioGreenFloralBlockPrintedsuitset_4.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/PastelPistachioGreenFloralBlockPrintedsuitset_6.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/PastelPistachioGreenFloralBlockPrintedsuitset_1.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/PastelPistachioGreenFloralBlockPrintedsuitset_5.jpg"
        ]
        ,
        price: 4500,
        discount: 15,
        description: "Elevate your ethnic wardrobe with this Dark Wine Maheshwari Silk Cotton Handloom Saree by Thenmozhi Designs. Crafted from premium silk cotton fabric, this handloom saree beautifully blends traditional craftsmanship with modern elegance. The rich dark wine shade, adorned with intricate block prints and faux zari, makes it perfect for weddings, festive wear, and special occasions. Lightweight yet luxurious, this saree drapes gracefully and ensures all-day comfort. It comes with an unstitched pink blouse piece (70 cm x 1.1 m) that complements the saree’s design. A must-have silk cotton saree for women who love authentic handloom sarees with a touch of sophistication.",
        product_specs: {
            "Category": "Saree",
            "Fabrics": "Silk Cotton",
            "Origin": "Rajasthan",
            "Occasion": "Festive Wear",
            "Craft": "Block Printed",
            "Blouse Type": "Unstitched Blouse Piece",
            "Blouse Color": "Pink",
            "Blouse Dimension": "70 cm x 1.1 m",
            "Color": "Pink",
            "Zari": "Faux Zari",
            "Wash Care": "Dry Clean"
        },
        rating: 4.5,
        reviews: [
            {
                username: "Ashra Ashick",
                rating: 4,
                reviewTitle: "Red linen saree",
                comment: "Amazing ..color and the texture is stunning .. easy to drape .. having long length .. very breezy and of high quality.",
                date: "08/29/2025"
            },
            {
                username: "Meera Nair",
                rating: 5,
                reviewTitle: "Elegant Kanjivaram Silk",
                comment: "Absolutely beautiful saree, the zari work is exquisite. Perfect for weddings and festivals. Got lots of compliments!",
                date: "08/27/2025"
            },
            {
                username: "Priya Sharma",
                rating: 3,
                reviewTitle: "Cotton Handloom Saree",
                comment: "Fabric is soft and comfortable for daily wear but the color is slightly lighter than shown in the picture.",
                date: "08/25/2025"
            },
            {
                username: "Sana Khan",
                rating: 5,
                reviewTitle: "Designer Georgette Saree",
                comment: "Loved the flowy material and the embroidery is very fine. Easy to drape and looks very stylish.",
                date: "08/20/2025"
            },
            {
                username: "Lakshmi Iyer",
                rating: 4,
                reviewTitle: "Traditional Banarasi Saree",
                comment: "Rich fabric and intricate golden work. A bit heavy but that’s expected for Banarasi. Totally worth the price!",
                date: "08/18/2025"
            },
            {
                username: "Neha Verma",
                rating: 2,
                reviewTitle: "Printed Chiffon Saree",
                comment: "The print is nice but the fabric quality was not as expected. Feels a bit flimsy.",
                date: "08/15/2025"
            }
        ],
        sku: "MH-DARKWINEMAHESHWARI-109",
        availabilityStatus: "In stock",
        stock: 10,
        shippingInformation: "Ships in 1 week",
        returnPolicy: "7 day return",

    },
    {
        id: 6,
        title: "Red and white block printed suit set",
        category: "kurtas",
        brand: "Thenmozhi Designs",
        video: "/videos/product6.mp4",
        images: [
            "https://thenmozhidesigns.com/cdn/shop/files/Redandwhiteblockprintedsuitset_2.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/Redandwhiteblockprintedsuitset_1.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/Redandwhiteblockprintedsuitset_3.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/Redandwhiteblockprintedsuitset_6.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/Redandwhiteblockprintedsuitset_5.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/Redandwhiteblockprintedsuitset_4.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/Redandwhiteblockprintedsuitset_7.jpg"
        ],
        price: 4500,
        discount: 15,
        description: "Elevate your ethnic wardrobe with this Dark Wine Maheshwari Silk Cotton Handloom Saree by Thenmozhi Designs. Crafted from premium silk cotton fabric, this handloom saree beautifully blends traditional craftsmanship with modern elegance. The rich dark wine shade, adorned with intricate block prints and faux zari, makes it perfect for weddings, festive wear, and special occasions. Lightweight yet luxurious, this saree drapes gracefully and ensures all-day comfort. It comes with an unstitched pink blouse piece (70 cm x 1.1 m) that complements the saree’s design. A must-have silk cotton saree for women who love authentic handloom sarees with a touch of sophistication.",
        product_specs: {
            "Category": "Saree",
            "Fabrics": "Silk Cotton",
            "Origin": "Rajasthan",
            "Occasion": "Festive Wear",
            "Craft": "Block Printed",
            "Blouse Type": "Unstitched Blouse Piece",
            "Blouse Color": "Pink",
            "Blouse Dimension": "70 cm x 1.1 m",
            "Color": "Pink",
            "Zari": "Faux Zari",
            "Wash Care": "Dry Clean"
        },
        rating: 4.5,
        reviews: [
            {
                username: "Ashra Ashick",
                rating: 4,
                reviewTitle: "Red linen saree",
                comment: "Amazing ..color and the texture is stunning .. easy to drape .. having long length .. very breezy and of high quality.",
                date: "08/29/2025"
            },
            {
                username: "Meera Nair",
                rating: 5,
                reviewTitle: "Elegant Kanjivaram Silk",
                comment: "Absolutely beautiful saree, the zari work is exquisite. Perfect for weddings and festivals. Got lots of compliments!",
                date: "08/27/2025"
            },
            {
                username: "Priya Sharma",
                rating: 3,
                reviewTitle: "Cotton Handloom Saree",
                comment: "Fabric is soft and comfortable for daily wear but the color is slightly lighter than shown in the picture.",
                date: "08/25/2025"
            },
            {
                username: "Sana Khan",
                rating: 5,
                reviewTitle: "Designer Georgette Saree",
                comment: "Loved the flowy material and the embroidery is very fine. Easy to drape and looks very stylish.",
                date: "08/20/2025"
            },
            {
                username: "Lakshmi Iyer",
                rating: 4,
                reviewTitle: "Traditional Banarasi Saree",
                comment: "Rich fabric and intricate golden work. A bit heavy but that’s expected for Banarasi. Totally worth the price!",
                date: "08/18/2025"
            },
            {
                username: "Neha Verma",
                rating: 2,
                reviewTitle: "Printed Chiffon Saree",
                comment: "The print is nice but the fabric quality was not as expected. Feels a bit flimsy.",
                date: "08/15/2025"
            }
        ],
        sku: "MH-DARKWINEMAHESHWARI-109",
        availabilityStatus: "In stock",
        stock: 10,
        shippingInformation: "Ships in 1 week",
        returnPolicy: "7 day return",

    },
    {
        id: 7,
        title: "Light Green Mangalagiri Plain Cotton Saree",
        category: "sarees",
        brand: "Thenmozhi Designs",
        video: "/videos/product7.mp4",
        images: [
            "https://thenmozhidesigns.com/cdn/shop/files/352A1558.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/352A1562.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/352A1590.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/352A1594.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/352A1578.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/352A1574.jpg"
        ],
        price: 4500,
        discount: 15,
        description: "Elevate your ethnic wardrobe with this Dark Wine Maheshwari Silk Cotton Handloom Saree by Thenmozhi Designs. Crafted from premium silk cotton fabric, this handloom saree beautifully blends traditional craftsmanship with modern elegance. The rich dark wine shade, adorned with intricate block prints and faux zari, makes it perfect for weddings, festive wear, and special occasions. Lightweight yet luxurious, this saree drapes gracefully and ensures all-day comfort. It comes with an unstitched pink blouse piece (70 cm x 1.1 m) that complements the saree’s design. A must-have silk cotton saree for women who love authentic handloom sarees with a touch of sophistication.",
        product_specs: {
            "Category": "Saree",
            "Fabrics": "Silk Cotton",
            "Origin": "Rajasthan",
            "Occasion": "Festive Wear",
            "Craft": "Block Printed",
            "Blouse Type": "Unstitched Blouse Piece",
            "Blouse Color": "Pink",
            "Blouse Dimension": "70 cm x 1.1 m",
            "Color": "Pink",
            "Zari": "Faux Zari",
            "Wash Care": "Dry Clean"
        },
        rating: 4.5,
        reviews: [
            {
                username: "Ashra Ashick",
                rating: 4,
                reviewTitle: "Red linen saree",
                comment: "Amazing ..color and the texture is stunning .. easy to drape .. having long length .. very breezy and of high quality.",
                date: "08/29/2025"
            },
            {
                username: "Meera Nair",
                rating: 5,
                reviewTitle: "Elegant Kanjivaram Silk",
                comment: "Absolutely beautiful saree, the zari work is exquisite. Perfect for weddings and festivals. Got lots of compliments!",
                date: "08/27/2025"
            },
            {
                username: "Priya Sharma",
                rating: 3,
                reviewTitle: "Cotton Handloom Saree",
                comment: "Fabric is soft and comfortable for daily wear but the color is slightly lighter than shown in the picture.",
                date: "08/25/2025"
            },
            {
                username: "Sana Khan",
                rating: 5,
                reviewTitle: "Designer Georgette Saree",
                comment: "Loved the flowy material and the embroidery is very fine. Easy to drape and looks very stylish.",
                date: "08/20/2025"
            },
            {
                username: "Lakshmi Iyer",
                rating: 4,
                reviewTitle: "Traditional Banarasi Saree",
                comment: "Rich fabric and intricate golden work. A bit heavy but that’s expected for Banarasi. Totally worth the price!",
                date: "08/18/2025"
            },
            {
                username: "Neha Verma",
                rating: 2,
                reviewTitle: "Printed Chiffon Saree",
                comment: "The print is nice but the fabric quality was not as expected. Feels a bit flimsy.",
                date: "08/15/2025"
            }
        ],
        sku: "MH-DARKWINEMAHESHWARI-109",
        availabilityStatus: "In stock",
        stock: 10,
        shippingInformation: "Ships in 1 week",
        returnPolicy: "7 day return",

    },
    {
        id: 8,
        title: "Kanchi Silk Cotton Violet Saree",
        category: "sarees",
        brand: "Thenmozhi Designs",
        video: "/videos/product8.mp4",
        images: [
            "https://thenmozhidesigns.com/cdn/shop/files/MUKR8168_f75fe734-a073-4c4d-aa65-893fe7818f66.png",
            "https://thenmozhidesigns.com/cdn/shop/files/MUKR8168_bc42380b-7125-4657-9ce9-076b8ab3e58b.png",
            "https://thenmozhidesigns.com/cdn/shop/files/MUKR8187_b41225a5-53b0-4477-a61a-8225048f17ec.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/6.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/MUKR8199_cdddf44d-956a-41ef-8526-66a2b5707bfe.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/MUKR8168.webp",
            "https://thenmozhidesigns.com/cdn/shop/files/8.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/MUKR8192_1.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/MUKR8168_ca68cf49-b402-4b7f-85f4-4269a6c1d676.jpg"
        ],
        price: 4500,
        discount: 15,
        description: "Elevate your ethnic wardrobe with this Dark Wine Maheshwari Silk Cotton Handloom Saree by Thenmozhi Designs. Crafted from premium silk cotton fabric, this handloom saree beautifully blends traditional craftsmanship with modern elegance. The rich dark wine shade, adorned with intricate block prints and faux zari, makes it perfect for weddings, festive wear, and special occasions. Lightweight yet luxurious, this saree drapes gracefully and ensures all-day comfort. It comes with an unstitched pink blouse piece (70 cm x 1.1 m) that complements the saree’s design. A must-have silk cotton saree for women who love authentic handloom sarees with a touch of sophistication.",
        product_specs: {
            "Category": "Saree",
            "Fabrics": "Silk Cotton",
            "Origin": "Rajasthan",
            "Occasion": "Festive Wear",
            "Craft": "Block Printed",
            "Blouse Type": "Unstitched Blouse Piece",
            "Blouse Color": "Pink",
            "Blouse Dimension": "70 cm x 1.1 m",
            "Color": "Pink",
            "Zari": "Faux Zari",
            "Wash Care": "Dry Clean"
        },
        rating: 4.5,
        reviews: [
            {
                username: "Ashra Ashick",
                rating: 4,
                reviewTitle: "Red linen saree",
                comment: "Amazing ..color and the texture is stunning .. easy to drape .. having long length .. very breezy and of high quality.",
                date: "08/29/2025"
            },
            {
                username: "Meera Nair",
                rating: 5,
                reviewTitle: "Elegant Kanjivaram Silk",
                comment: "Absolutely beautiful saree, the zari work is exquisite. Perfect for weddings and festivals. Got lots of compliments!",
                date: "08/27/2025"
            },
            {
                username: "Priya Sharma",
                rating: 3,
                reviewTitle: "Cotton Handloom Saree",
                comment: "Fabric is soft and comfortable for daily wear but the color is slightly lighter than shown in the picture.",
                date: "08/25/2025"
            },
            {
                username: "Sana Khan",
                rating: 5,
                reviewTitle: "Designer Georgette Saree",
                comment: "Loved the flowy material and the embroidery is very fine. Easy to drape and looks very stylish.",
                date: "08/20/2025"
            },
            {
                username: "Lakshmi Iyer",
                rating: 4,
                reviewTitle: "Traditional Banarasi Saree",
                comment: "Rich fabric and intricate golden work. A bit heavy but that’s expected for Banarasi. Totally worth the price!",
                date: "08/18/2025"
            },
            {
                username: "Neha Verma",
                rating: 2,
                reviewTitle: "Printed Chiffon Saree",
                comment: "The print is nice but the fabric quality was not as expected. Feels a bit flimsy.",
                date: "08/15/2025"
            }
        ],
        sku: "MH-DARKWINEMAHESHWARI-109",
        availabilityStatus: "In stock",
        stock: 10,
        shippingInformation: "Ships in 1 week",
        returnPolicy: "7 day return",

    },
    {
        id: 9,
        title: "Light Blue Printed Co-ord Set",
        category: "kurtas",
        brand: "Thenmozhi Designs",
        video: "/videos/product9.mp4",
        images: [
            "https://thenmozhidesigns.com/cdn/shop/files/IMG_9277.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/IMG_9276_dd467481-f706-4520-8a20-697d0a6de3fb.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/IMG_9269.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/IMG_9279.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/IMG_9294.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/IMG_9309.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/IMG_9311.jpg"
        ],
        price: 4500,
        discount: 15,
        description: "Elevate your ethnic wardrobe with this Dark Wine Maheshwari Silk Cotton Handloom Saree by Thenmozhi Designs. Crafted from premium silk cotton fabric, this handloom saree beautifully blends traditional craftsmanship with modern elegance. The rich dark wine shade, adorned with intricate block prints and faux zari, makes it perfect for weddings, festive wear, and special occasions. Lightweight yet luxurious, this saree drapes gracefully and ensures all-day comfort. It comes with an unstitched pink blouse piece (70 cm x 1.1 m) that complements the saree’s design. A must-have silk cotton saree for women who love authentic handloom sarees with a touch of sophistication.",
        product_specs: {
            "Category": "Saree",
            "Fabrics": "Silk Cotton",
            "Origin": "Rajasthan",
            "Occasion": "Festive Wear",
            "Craft": "Block Printed",
            "Blouse Type": "Unstitched Blouse Piece",
            "Blouse Color": "Pink",
            "Blouse Dimension": "70 cm x 1.1 m",
            "Color": "Pink",
            "Zari": "Faux Zari",
            "Wash Care": "Dry Clean"
        },
        rating: 4.5,
        reviews: [
            {
                username: "Ashra Ashick",
                rating: 4,
                reviewTitle: "Red linen saree",
                comment: "Amazing ..color and the texture is stunning .. easy to drape .. having long length .. very breezy and of high quality.",
                date: "08/29/2025"
            },
            {
                username: "Meera Nair",
                rating: 5,
                reviewTitle: "Elegant Kanjivaram Silk",
                comment: "Absolutely beautiful saree, the zari work is exquisite. Perfect for weddings and festivals. Got lots of compliments!",
                date: "08/27/2025"
            },
            {
                username: "Priya Sharma",
                rating: 3,
                reviewTitle: "Cotton Handloom Saree",
                comment: "Fabric is soft and comfortable for daily wear but the color is slightly lighter than shown in the picture.",
                date: "08/25/2025"
            },
            {
                username: "Sana Khan",
                rating: 5,
                reviewTitle: "Designer Georgette Saree",
                comment: "Loved the flowy material and the embroidery is very fine. Easy to drape and looks very stylish.",
                date: "08/20/2025"
            },
            {
                username: "Lakshmi Iyer",
                rating: 4,
                reviewTitle: "Traditional Banarasi Saree",
                comment: "Rich fabric and intricate golden work. A bit heavy but that’s expected for Banarasi. Totally worth the price!",
                date: "08/18/2025"
            },
            {
                username: "Neha Verma",
                rating: 2,
                reviewTitle: "Printed Chiffon Saree",
                comment: "The print is nice but the fabric quality was not as expected. Feels a bit flimsy.",
                date: "08/15/2025"
            }
        ],
        sku: "MH-DARKWINEMAHESHWARI-109",
        availabilityStatus: "In stock",
        stock: 10,
        shippingInformation: "Ships in 1 week",
        returnPolicy: "7 day return",

    },
    {
        id: 10,
        title: "Black & Red Narayanpet Saree",
        category: "sarees",
        brand: "Thenmozhi Designs",
        video: "/videos/product10.mp4",
        images: [
            "https://thenmozhidesigns.com/cdn/shop/files/Black_Narayanpet.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/Black_Narayanpet_Sarees.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/Narayanpet_Saree.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/3S2A9594.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/3S2A9605.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/3S2A9620.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/3S2A9651.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/3S2A9659.jpg",
            "https://thenmozhidesigns.com/cdn/shop/files/3S2A9670.jpg"
        ],
        price: 4500,
        discount: 15,
        description: "Elevate your ethnic wardrobe with this Dark Wine Maheshwari Silk Cotton Handloom Saree by Thenmozhi Designs. Crafted from premium silk cotton fabric, this handloom saree beautifully blends traditional craftsmanship with modern elegance. The rich dark wine shade, adorned with intricate block prints and faux zari, makes it perfect for weddings, festive wear, and special occasions. Lightweight yet luxurious, this saree drapes gracefully and ensures all-day comfort. It comes with an unstitched pink blouse piece (70 cm x 1.1 m) that complements the saree’s design. A must-have silk cotton saree for women who love authentic handloom sarees with a touch of sophistication.",
        product_specs: {
            "Category": "Saree",
            "Fabrics": "Silk Cotton",
            "Origin": "Rajasthan",
            "Occasion": "Festive Wear",
            "Craft": "Block Printed",
            "Blouse Type": "Unstitched Blouse Piece",
            "Blouse Color": "Pink",
            "Blouse Dimension": "70 cm x 1.1 m",
            "Color": "Pink",
            "Zari": "Faux Zari",
            "Wash Care": "Dry Clean"
        },
        rating: 4.5,
        reviews: [
            {
                username: "Ashra Ashick",
                rating: 4,
                reviewTitle: "Red linen saree",
                comment: "Amazing ..color and the texture is stunning .. easy to drape .. having long length .. very breezy and of high quality.",
                date: "08/29/2025"
            },
            {
                username: "Meera Nair",
                rating: 5,
                reviewTitle: "Elegant Kanjivaram Silk",
                comment: "Absolutely beautiful saree, the zari work is exquisite. Perfect for weddings and festivals. Got lots of compliments!",
                date: "08/27/2025"
            },
            {
                username: "Priya Sharma",
                rating: 3,
                reviewTitle: "Cotton Handloom Saree",
                comment: "Fabric is soft and comfortable for daily wear but the color is slightly lighter than shown in the picture.",
                date: "08/25/2025"
            },
            {
                username: "Sana Khan",
                rating: 5,
                reviewTitle: "Designer Georgette Saree",
                comment: "Loved the flowy material and the embroidery is very fine. Easy to drape and looks very stylish.",
                date: "08/20/2025"
            },
            {
                username: "Lakshmi Iyer",
                rating: 4,
                reviewTitle: "Traditional Banarasi Saree",
                comment: "Rich fabric and intricate golden work. A bit heavy but that’s expected for Banarasi. Totally worth the price!",
                date: "08/18/2025"
            },
            {
                username: "Neha Verma",
                rating: 2,
                reviewTitle: "Printed Chiffon Saree",
                comment: "The print is nice but the fabric quality was not as expected. Feels a bit flimsy.",
                date: "08/15/2025"
            }
        ],
        sku: "MH-DARKWINEMAHESHWARI-109",
        availabilityStatus: "In stock",
        stock: 10,
        shippingInformation: "Ships in 1 week",
        returnPolicy: "7 day return",

    },
]





