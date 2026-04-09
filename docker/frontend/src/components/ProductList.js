import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://api.leoboy.shop/api/products") // Use your ingress domain
      .then(res => setProducts(res.data))
      .catch(err => console.error("API error:", err));
  }, []);

  return (
    <div>
      <h1>My E-Commerce Store</h1>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <ul>
          {products.map(p => {
            const discountPercent = Math.round(((p.price - p.offer_price) / p.price) * 100);
            return (
              <li key={p.id}>
                <h3>{p.name}</h3>
                <p>Brand: {p.brand}</p>
                <p>Model: {p.model_no}</p>
                <p>Price: <strike>₹{p.price}</strike> ₹{p.offer_price}</p>
                <p>Discount: {discountPercent}%</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ProductList;