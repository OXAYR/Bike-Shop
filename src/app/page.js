
// import Link from 'next/link';
// import Image from 'next/image';
// import { getProducts } from './lib/products';

// export default async function Home({ searchParams }) {

//  const page = searchParams.page ? parseInt(searchParams.page) : 1;
//  const { products, totalPages } = await getProducts(page);
 
//  return (
//    <div className="container mx-auto py-8">
//      <h1 className="text-3xl font-bold mb-8">All Products</h1>
     
//      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//        {products.map(product => (
//          <div key={product.id} className="border rounded-lg overflow-hidden">
//            {product.images && product.images[0] && (
//              <div className="relative h-64">
//                <Image 
//                  src={product.images[0].src}
//                  alt={product.images[0].alt || product.name}
//                  fill
//                  sizes="(max-width: 768px) 100vw, 33vw"
//                  className="object-cover"
//                />
//              </div>
//            )}
           
//            <div className="p-4">
//              <h2 className="text-xl font-semibold">{product.name}</h2>
             
//              <div 
//                className="mt-2 text-gray-600 text-sm"
//                dangerouslySetInnerHTML={{ __html: product.short_description }}
//              />
             
//              <div className="mt-4 flex justify-between items-center">
//                <div className="text-xl font-bold" 
//                  dangerouslySetInnerHTML={{ __html: product.price_html }}
//                />
               
//                <Link 
//                  href={`/products/${product.slug}`}
//                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                >
//                  View Details
//                </Link>
//              </div>
//            </div>
//          </div>
//        ))}
//      </div>
     
//      {/* Pagination */}
//      {totalPages > 1 && (
//        <div className="flex justify-center mt-12 space-x-2">
//          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
//            <Link
//              key={pageNum}
//              href={`/products?page=${pageNum}`}
//              className={`px-4 py-2 border rounded ${
//                pageNum === page 
//                  ? 'bg-blue-600 text-white' 
//                  : 'bg-white hover:bg-gray-50'
//              }`}
//            >
//              {pageNum}
//            </Link>
//          ))}
//        </div>
//      )}
//    </div>
//  );
// }


import Header from './components/Header';
import HeroCarousal from './components/HeroCarousal';
import Footer from './components/Footer';
import CommunityGallery from './components/CommunityGallery';

import ImageTextCard from './components/ImageTextCard';
import ProductItemsSection from './components/ProductItemsSection';
import { categories } from './lib/categories';
import CategoryScroller from './components/CategoryScroller';
import { useCategories } from './context/CategoriesContext';
import { getProducts } from './lib/products';

// Mock data for demonstration


const hotItems = [
  { id: 1, name: 'Premium Carbon Helmet', price: 249.99, image: 'https://images.pexels.com/photos/1323201/pexels-photo-1323201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', discount: 15 },
  { id: 2, name: 'All-Weather Riding Jacket', price: 189.99, image: 'https://images.pexels.com/photos/11026292/pexels-photo-11026292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: 3, name: 'Pro Riding Gloves', price: 59.99, image: 'https://images.pexels.com/photos/26558690/pexels-photo-26558690/free-photo-of-motorcycle-glove-on-man-hand.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', discount: 20 },
  { id: 4, name: 'Tires', price: 79.99, image: 'https://images.pexels.com/photos/31912758/pexels-photo-31912758/free-photo-of-dynamic-motorcycle-with-green-accents-in-auckland.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
];

const featuredProductsLocal = [
  { id: 1, name: 'Premium Carbon Helmet', price: 249.99, image: 'https://images.pexels.com/photos/1323201/pexels-photo-1323201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', discount: 15 },
  { id: 2, name: 'All-Weather Riding Jacket', price: 189.99, image: 'https://images.pexels.com/photos/11026292/pexels-photo-11026292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: 3, name: 'Pro Riding Gloves', price: 59.99, image: 'https://images.pexels.com/photos/26558690/pexels-photo-26558690/free-photo-of-motorcycle-glove-on-man-hand.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', discount: 20 },
  { id: 4, name: 'Tires', price: 79.99, image: 'https://images.pexels.com/photos/31912758/pexels-photo-31912758/free-photo-of-dynamic-motorcycle-with-green-accents-in-auckland.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: 5, name: 'Premium Carbon Helmet', price: 249.99, image: 'https://images.pexels.com/photos/1323201/pexels-photo-1323201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', discount: 15 },
  { id: 6, name: 'All-Weather Riding Jacket', price: 189.99, image: 'https://images.pexels.com/photos/11026292/pexels-photo-11026292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: 7, name: 'Pro Riding Gloves', price: 59.99, image: 'https://images.pexels.com/photos/26558690/pexels-photo-26558690/free-photo-of-motorcycle-glove-on-man-hand.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', discount: 20 },
  { id: 8, name: 'Tires', price: 79.99, image: 'https://images.pexels.com/photos/31912758/pexels-photo-31912758/free-photo-of-dynamic-motorcycle-with-green-accents-in-auckland.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }

];




import { getFeaturedProducts, getProductsOnSale } from './lib/products';

import HomeContent from './components/HomeContent';

// export default async function HomePage() {
//   // Fetch data from your API functions on the server
  
//   const categories = await getCategories();
  
//   const hotItems = saleProducts?.products || [];

//   // Pass all fetched data to client component
 
// }



export default async function HomePage( ) {

  
  const featuredProducts = await getFeaturedProducts(8);
  // const saleProducts = await getProductsOnSale(1, 4);

  console.log(featuredProducts);

  return <HomeContent
  featuredProducts={featuredProducts || featuredProductsLocal} 
  hotItems={hotItems}
/>;
  // return (
  
  //     <main>
  //       {/* Hero Carousel */}
  //       <HeroCarousal />

  //       {/* Hot Items Section */}
  //       <ProductItemsSection products={hotItems} heading={'Hot Right Now'}/>
        
  //       {/* Categories Section */}
 
            
  //          <CategoryScroller categories={categories?.categories} />
       

        
  //       {/* Featured Products */}
  //       <ProductItemsSection products={featuredProducts} heading={'Featured Products'}/>
        
  //       {/* Community Gallery */}
        
  //       <CommunityGallery />
       
  //     </main>

    
   
  // );
}
