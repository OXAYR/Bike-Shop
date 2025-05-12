import { ChevronRight } from "lucide-react"
import ProductCard from "./ProductCard"

const ProductItemsSection = ({products, heading}) => {
  return (
    <section className="py-12 bg-zinc-50">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8"><h2 className="text-2xl md:text-3xl font-bold text-secondary">{heading}</h2>
        <a href="/hot-items" className="text-secondary hover:underline font-medium flex items-center">
          View All <ChevronRight size={16} />
        </a>
      </div>
      
      <ProductCard products={products} isFeatured={heading.includes('Featured Products')? true :false} />
    </div>
  </section>
  )
}
export default ProductItemsSection