'use client'

import HeroCarousal from './HeroCarousal';
import CommunityGallery from './CommunityGallery';
import ProductItemsSection from './ProductItemsSection';
import CategoryScroller from './CategoryScroller';
import { useCategories } from '../context/CategoriesContext';


export default function HomeContent({ featuredProducts, hotItems,  }) {
  // Use the client-side hook to get categories
  const { categories } = useCategories();
  
  

  return (
    <main>
      {/* Hero Carousel */}
      <HeroCarousal />

      {/* Hot Items Section */}
      <ProductItemsSection products={featuredProducts} heading={'Hot Right Now'}/>
      
      {/* Categories Section */}
      <CategoryScroller categories={categories} />
      
      {/* Featured Products */}
      <ProductItemsSection products={featuredProducts} heading={'Featured Products'}/>
      
      {/* Community Gallery */}
      <CommunityGallery />
    </main>
  );
}