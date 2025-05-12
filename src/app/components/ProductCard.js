import { ShoppingCart, Star } from 'lucide-react';

const ProductCard = ({ products, isFeatured }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((item) => (
        <div key={item.id} className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group relative">
          {/* Image Container */}
          <div className="relative overflow-hidden h-48 sm:h-56 md:h-64">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Quick View Overlay */}
            <div className="absolute inset-0 bg-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button className="bg-white text-secondary px-4 py-2 rounded-md font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                Quick View
              </button>
            </div>
            
            {/* Discount Badge */}
            {item.discount && (
              <div className="absolute top-3 right-3 bg-primary text-secondary px-3 py-1 rounded-md font-bold text-sm">
                -{item.discount}% OFF
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className="p-4">
            {/* Category */}
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              {item.category || 'Bike Accessory'}
            </div>
            
            {/* Title */}
            <h3 className="text-secondary font-semibold text-lg mb-1 line-clamp-2 h-14">
              {item.name}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center mb-2">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i < (item.rating || 4) ? "#EAE151" : "none"} 
                    className={i < (item.rating || 4) ? "text-primary" : "text-gray-300"} 
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">({item.reviewCount || '24'})</span>
            </div>
            
            {/* Price and Button Row */}
            <div className="flex justify-between items-center mt-3">
              <div className="flex flex-col">
                {item.originalPrice && (
                  <span className="text-gray-400 text-sm line-through">${item.originalPrice.toFixed(2)}</span>
                )}
                <span className="text-secondary font-bold text-lg">${item.price.toFixed(2)}</span>
              </div>
              
              {isFeatured ? (
                <button className="bg-secondary text-white p-2 rounded-full hover:bg-[#413e45] transition-colors">
                  <ShoppingCart size={18} />
                </button>
              ) : (
                <button className="bg-primary text-secondary px-4 py-2 rounded-md font-medium hover:bg-[#d6cd49] transition-colors flex items-center gap-2">
                  <ShoppingCart size={16} />
                  <span>Add to Cart</span>
                </button>
              )}
            </div>
          </div>
          
          {/* New Badge */}
          {item.isNew && (
            <div className="absolute top-3 left-3 bg-secondary text-white px-3 py-1 rounded-md text-xs font-medium">
              NEW
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductCard;