import React, { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/products");
        setProducts(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProducts();
  }, []);

  return (
    <div>
      <h1>Produtos</h1>
      <div className="products">
        {products.map((product) => (
          <div className="product">
            <h2>{product.id_produto}</h2>
            <h2>{product.nome}</h2>
            <h2>{product.preco}</h2>
            <h2>{product.descricao}</h2>
            <h2>{product.id_categoria}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
