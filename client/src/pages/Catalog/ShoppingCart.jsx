import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from './ShoppingCart.module.css'; // Import CSS module

const ShoppingCart = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cartItems = JSON.parse(searchParams.get("cart"));
  const [cartProducts, setCartProducts] = useState([]);
  let totalSum = 0;

  useEffect(() => {
    const fetchProducts = async () => {
      if (cartItems && cartItems.length > 0) {
        const products = [];
        for (const itemId of cartItems) {
          try {
            const res = await axios.get(`http://localhost:8800/products/${itemId}`);
            products.push(res.data);
          } catch (err) {
            console.log(err);
          }
        }
        setCartProducts(products);
      }
    };
    fetchProducts();
  }, [cartItems]);

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div>
        <h1>Your Shopping Cart</h1>
        <p>No items in the cart</p>
      </div>
    );
  }

  return (
    <div className={styles.shoppingCartContainer}>
      <h1>Carrinho</h1>
      <ul className={styles.cartItems}>
        {cartProducts.map((product, index) => {
          totalSum += product.preco; // Calculate the total sum
          return (
            <li key={index} className={styles.cartItem}>
              <p>Nome: {product.nome}</p>
              <p>Preço: R$ {product.preco.toFixed(2)}</p>
            </li>
          );
        })}
      </ul>
      <div className={styles.total}>
        <p>Total: R$ {totalSum.toFixed(2)}</p>
      </div>
      <Link to="/Rating" className={styles.payButton}>Finalizar</Link>
      <Link to="/" className={styles.payButton}>Pagar</Link>

      <Link to="/" className={styles.payButton}>Pagar</Link>

    </div>
  );
};

export default ShoppingCart;
