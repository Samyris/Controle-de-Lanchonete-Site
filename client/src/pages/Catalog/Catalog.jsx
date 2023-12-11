import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Catalog.module.css";

const Catalog = ({ setCart }) => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cart, setLocalCart] = useState([]); // Define cart as a local state variable
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProducts();
  }, []);

  const handleSaveProduct = (productId) => {
    setSelectedProductId(productId);
    // Use setCart function received as prop to update the cart
    setCart((prevCart) => [...prevCart, productId]);
    setLocalCart((prevLocalCart) => [...prevLocalCart, productId]); // Update local cart state as well
  };

  const handleCheckout = () => {
    // Redirect to a checkout page passing the cart items as state or query params
    navigate(`/shopping-cart?cart=${JSON.stringify(cart)}`); // Navigate to ShoppingCart component with cart items
  };

  return (
    <div className={styles.catalogContainer}>
      <h1 className={styles.title}>Catalogo de Produtos</h1>
      <ul>
        {products.map((product, index) => (
          <li key={product.id_produto} className={index % 2 === 0 ? styles.even : styles.odd}>
            <h2>{product.nome}</h2>
            <p className={index % 2 === 0 ? styles.green : styles.purple}>Preço: R$ {product.preco.toFixed(2).toString().replace(".", ",")}</p>
            <p className={index % 2 === 0 ? styles.green : styles.purple}>Descrição: {product.descricao}</p>
            <p className={index % 2 === 0 ? styles.green : styles.purple}>id_Produto: {product.id_produto}</p>
            <button onClick={() => handleSaveProduct(product.id_produto)}>Adicionar ao Carrinho</button>
          </li>
        ))}
      </ul>
      <div>
        <div className={styles.buttonComprar}>
        {selectedProductId && <p>ID do produto selecionado: {selectedProductId}</p>}
        <button onClick={handleCheckout}>Comprar</button></div>
      </div>
    </div>
  );
};

export default Catalog;
