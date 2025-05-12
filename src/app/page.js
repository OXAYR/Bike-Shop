
import { getFeaturedProducts, getProductsOnSale } from './lib/products';

import HomeContent from './components/HomeContent';


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







export default async function HomePage( ) {

  
  const featuredProducts = await getFeaturedProducts(8);
  // const saleProducts = await getProductsOnSale(1, 4);

  console.log(featuredProducts);

  return <HomeContent
  featuredProducts={featuredProducts || featuredProductsLocal} 
  hotItems={hotItems}
/>;
  
}
