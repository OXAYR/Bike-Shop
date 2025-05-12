
import {  getProductBySlug } from '@/app/lib/products';

import ProductDetail from "@/app/components/ProductDetails";


export async function generateMetadata({ params }) {
  const product = await getProductBySlug(params?.slug);
  
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const product = await getProductBySlug(params?.slug);
  return <ProductDetail product={product} />;
}


// // app/products/test/page.js
// const demoProduct = {
//   id: 1001,
//   name: "Cardo PackTalk Edge Headset",
//   slug: "cardo-packtalk-edge-headset",
//   price: 359.95,
//   salePrice: 329.95,
//   onSale: true,
//   rating: 4.7,
//   reviewCount: 32,
//   description: "The Cardo PackTalk Edge represents the next generation of Cardo's premium communication systems. Featuring Dynamic Mesh Communication technology and JBL speakers.",
//   longDescription: `<p>The Cardo PackTalk Edge represents the next generation of Cardo's premium communication systems. The Edge utilizes Cardo's proprietary Dynamic Mesh Communication (DMC) technology, offering riders the most natural way to stay connected on the road. The Edge features magnetic air mounts, second-generation premium sound by JBL, and an improved noise-canceling microphone.</p>
  
//   <p>The PackTalk Edge is slimmer than its predecessor with no external antenna, a second-generation magnetic air mount, and a fast charging feature. Simply put, the Cardo PackTalk Edge is the most advanced motorcycle communication system on the market today.</p>
  
//   <h3>Features</h3>
//   <ul>
//     <li>Mesh 2.0 technology with natural voice operation</li>
//     <li>Second generation JBL sound system</li>
//     <li>Fast charging capability (2 hours talk time with 20 minute charge)</li>
//     <li>Bluetooth 5.2 for smartphone connection</li>
//     <li>IP67 waterproof rating</li>
//     <li>13 hours of talk time</li>
//   </ul>
  
//   <h3>What's Included</h3>
//   <ul>
//     <li>Cardo PackTalk Edge unit</li>
//     <li>JBL 40mm HD speakers</li>
//     <li>Boom and wired microphone options</li>
//     <li>Magnetic air mount cradle</li>
//     <li>USB-C charging cable</li>
//     <li>Speaker booster pads</li>
//   </ul>
  
//   <h3>Specifications</h3>
//   <p>The PackTalk Edge features Cardo's Dynamic Mesh Communication (DMC) technology allowing up to 15 riders to communicate with a range of up to 1 mile (1.6 km). DMC automatically reconnects riders without any user intervention required, making it the most natural and seamless communication option for motorcycle groups.</p>
  
//   <p>The second-generation JBL speakers deliver crystal clear audio at all speeds, with automatic volume adjustment based on ambient noise. The natural voice operation allows you to keep your hands on the handlebars while still controlling all the functions of the unit.</p>`,
//   images: [
//     {
//       id: 1,
//       src: "https://www.revzilla.com/product_images/1790/4157/cardo_pack_talk_edge_headset_750x750.jpg",
//       alt: "Cardo PackTalk Edge Headset - Main View"
//     },
//     {
//       id: 2,
//       src: "https://www.revzilla.com/product_images/1795/2621/cardo_pack_talk_edge_headset_750x750.jpg",
//       alt: "Cardo PackTalk Edge Headset - Side View"
//     },
//     {
//       id: 3, 
//       src: "https://www.revzilla.com/product_images/1795/2570/cardo_pack_talk_edge_headset_750x750.jpg",
//       alt: "Cardo PackTalk Edge Headset - Back View"
//     },
//     {
//       id: 4,
//       src: "https://www.revzilla.com/product_images/1795/2553/cardo_pack_talk_edge_headset_750x750.jpg",
//       alt: "Cardo PackTalk Edge Headset - In Use"
//     }
//   ],
//   variations: [
//     { id: 1, name: "Single Pack", price: 329.95, inStock: true },
//     { id: 2, name: "Duo Pack", price: 579.95, inStock: true },
//     { id: 3, name: "JBL Speakers Only", price: 89.95, inStock: false }
//   ],
//   reviews: [
//     {
//       id: 1,
//       author: "Michael R.",
//       rating: 5,
//       date: "April 15, 2025",
//       content: "Best motorcycle communication system I've ever used. Crystal clear sound even at highway speeds."
//     },
//     {
//       id: 2,
//       author: "Sarah T.",
//       rating: 4,
//       date: "March 28, 2025",
//       content: "Great sound quality and the mesh system works flawlessly. Battery life could be a bit better but still lasts all day."
//     },
//     {
//       id: 3,
//       author: "David L.",
//       rating: 5,
//       date: "March 10, 2025",
//       content: "The magnetic mount is a game changer! So easy to install and remove when needed. No more struggling with clips."
//     },
//     {
//       id: 4,
//       author: "Jennifer K.",
//       rating: 5,
//       date: "February 22, 2025",
//       content: "JBL speakers are excellent, voice commands work perfectly even with road noise. Worth every penny."
//     },
//     {
//       id: 5,
//       author: "Robert B.",
//       rating: 4,
//       date: "February 5, 2025",
//       content: "Great upgrade from my old Packtalk Bold. The Edge is slimmer and has better sound quality. The new interface is much more intuitive."
//     },
//     {
//       id: 6,
//       author: "Alex M.",
//       rating: 5,
//       date: "January 29, 2025",
//       content: "Paired seamlessly with my helmet and phone. The app works great for customization. Highly recommend for group rides."
//     }
//   ],
//   specs: {
//     talkTime: "13 hours",
//     chargingTime: "1.5-2 hours",
//     standbyTime: "1 week",
//     waterproof: "IP67",
//     speakers: "JBL 40mm",
//     warranty: "2 years",
//     weight: "3.5 oz (99g)",
//     connectivity: "Bluetooth 5.2 & DMC Mesh"
//   }
// };

// export async function generateMetadata() {
//   return {
//     title: demoProduct.name,
//     description: demoProduct.description,
//   };
// }

// export default function ProductDetailPage() {
//   return <ProductDetail product={demoProduct} />;
// }