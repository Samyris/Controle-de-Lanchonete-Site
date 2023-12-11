import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './product.module.css'; // Import CSS module

const ProductForm = () => {
  const history = useNavigate();
  const [product, setProduct] = useState({
    nome: '',
    preco: '',
    descricao: '',
    id_categoria: '',
  });
  const [categories, setCategories] = useState([]);
  const [isProductAdded, setIsProductAdded] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:8800/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8800/products', product);
      window.alert('Produto adicionado com sucesso:', res.data);
      setIsProductAdded(true);

      // Redirect to the root ("/") after successful product addition
      history('/'); // Navigate back to the root route ("/")
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };


  return (
    <div className={styles.container}>
      
      <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Registrar produto</h1>
        <input
          type="text"
          name="nome"
          placeholder="Nome do Produto"
          value={product.nome}
          onChange={handleChange}
        />
        <input
          type="text"
          name="preco"
          placeholder="Preço"
          value={product.preco}
          onChange={handleChange}
        />
        <textarea
          name="descricao"
          placeholder="Descição"
          value={product.descricao}
          onChange={handleChange}
        ></textarea>
        <select
          name="id_categoria"
          value={product.id_categoria}
          onChange={handleChange}
        >
          <option value="">Selecione a categoria</option>
          {categories.map((category) => (
            <option key={category.id_categoria} value={category.id_categoria}>
              {category.nome}
            </option>
          ))}
        </select>
        <button type="submit">Adicionar produto</button>
      </form>
      {isProductAdded && <p>Product added successfully!</p>}
    </div>
  );
};



export default ProductForm;
