import { Bike } from "lucide-react"

const Footer = ({categories}) => {
  
return (
    <footer className="bg-secondary text-white pt-12 pb-6 text-center">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
        <div>
          <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
          {/* <Bike size={28} className="text-primary" />
            <span className="text-white font-bold text-xl "> BikeGear</span> */}
             <img src="/logo.png" className="w-32"/>
          </div>
          <p className="text-gray-300 mb-4">
            Premium gear for passionate riders. Quality, performance, and style for every journey.
          </p>
          <div className="flex space-x-4 justify-center md:justify-start">
            <a href="#" className="text-gray-300 hover:text-primary">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-primary">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-primary">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-primary">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-bold mb-4">Shop</h3>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <a href={`/category/${category.slug}`} className="text-gray-300 hover:text-primary">
                  {category.name}
                </a>
              </li>
            ))}
            <li>
              <a href="/sale" className="text-primary font-medium">
                Sale Items
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-bold mb-4">Information</h3>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="text-gray-300 hover:text-primary">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="text-gray-300 hover:text-primary">
                Contact
              </a>
            </li>
            <li>
              <a href="/blog" className="text-gray-300 hover:text-primary">
                Blog
              </a>
            </li>
            <li>
              <a href="/shipping" className="text-gray-300 hover:text-primary">
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="/warranty" className="text-gray-300 hover:text-primary">
                Warranty Info
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <section className="bg-secondary text-white">
            <div className="px-4 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Stay Updated</h2>
              <p className="text-gray-300 mb-6">
                Subscribe to our newsletter for exclusive deals, new arrivals, riding tips, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-96 mx-auto md:mx-0">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 text-secondary bg-white focus:outline-none"
                />
                <button className="bg-primary text-secondary px-6 py-3 font-bold hover:bg-white transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-300">
          &copy; {new Date().getFullYear()} BikeGear. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
)
}

export default Footer