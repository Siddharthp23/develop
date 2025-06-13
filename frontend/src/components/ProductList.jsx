import ProductCard from "./ProductCard";
import product1 from "../assets/trimmer.webp";
import product2 from "../assets/sports.webp";
import product3 from "../assets/bodycon.jpeg";
import product4 from "../assets/tshirt2.jpg";

const dummyProducts = [
  { id: 1, image: product1, name: "Trimmer", price: 1299 },
  { id: 2, image: product2, name: "Sports Shoes", price: 1899 },
  { id: 3, image: product3, name: "Bodycon Dress", price: 899 },
  { id: 4, image: product4, name: "Tshirts", price: 1600 },
  { id: 4, image: product4, name: "Tshirts", price: 1600 },
  { id: 4, image: product4, name: "Tshirts", price: 1600 },
];

export default function ProductList() {
  return (
    <div className="product-list">
      {dummyProducts.map((item) => (
        <ProductCard key={item.id} {...item} />
      ))}
    </div>
  );
}
