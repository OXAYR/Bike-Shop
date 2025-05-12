import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const ImageTextCard = ({ categories }) => {
  return (
    <>
      {categories && categories.map((category) => (
        <Link 
          key={category.id} 
          href={`/category/${category.slug}`}
          className="group relative w-64 sm:w-56 md:w-52 lg:w-64 flex-shrink-0"
        >
          <div className="overflow-hidden rounded-lg shadow-md transition-all duration-300 group-hover:shadow-xl">
            {/* Image Container */}
            <div className="h-72 relative overflow-hidden">
              <img
                src={category.image?.src || category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Yellow accent bar */}
              <div className="absolute inset-x-0 top-0 h-1 bg-[#EAE151] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              
              {/* Content overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D2A32]/90 via-[#2D2A32]/50 to-transparent">
                {/* Category name with hover effect */}
                <div className="absolute bottom-0 inset-x-0 p-4 transform translate-y-0 group-hover:translate-y-[-8px] transition-transform duration-300">
                  <h3 className="text-white font-bold text-xl text-center mb-2">
                    {category.name}
                  </h3>
                  
                  {/* Browse button that appears on hover */}
                  <div className="flex justify-center">
                    <span className="inline-flex items-center text-[#EAE151] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Browse Collection
                      <ChevronRight size={16} className="ml-1 mt-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Category stats/info - Optional */}
            <div className="bg-white py-2 px-3 flex justify-between items-center">
              <span className="text-xs text-gray-500">
                {category.itemCount || '24'} Products
              </span>
              
              {/* Visual indicator - can be customized based on category */}
              {category.trending && (
                <span className="text-xs bg-[#EAE151]/20 text-[#2D2A32] px-2 py-0.5 rounded-full font-medium">
                  Trending
                </span>
              )}
              
              {category.isNew && (
                <span className="text-xs bg-[#2D2A32] text-white px-2 py-0.5 rounded-full font-medium">
                  New
                </span>
              )}
              
              {category.onSale && (
                <span className="text-xs bg-[#EAE151] text-[#2D2A32] px-2 py-0.5 rounded-full font-medium">
                  On Sale
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default ImageTextCard;