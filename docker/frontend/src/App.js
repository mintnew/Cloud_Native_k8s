import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://api.leoboy.shop/api/products") // Must match backend
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <div>
      <h1>My E-Commerce Store</h1>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <ul>
          {products.map(p => (
            <li key={p.id}>
              {p.name} - ₹{p.price} (Offer: ₹{p.offer_price})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;