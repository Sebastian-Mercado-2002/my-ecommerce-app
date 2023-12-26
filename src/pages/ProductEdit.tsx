import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

interface Product {
  name: string;
  price: number;
  size: string;
}

const ProductEdit = () => {
  const { id } = useParams<{ id: string }>(); // Definir el tipo para id
  const history = useHistory();

  const [formData, setFormData] = useState<Product>({
    name: '',
    price: 0,
    size: 'M',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(`https://fakeapi.platzi.com/en/rest/products/${id}`);
        const { name, price, size } = response.data;
        setFormData({ name, price, size });
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: event.target.value });
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseInt(event.target.value) < 1 ? 1 : parseInt(event.target.value);
    setFormData({ ...formData, price: newPrice });
  };

  const handleSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, size: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.put(`https://fakeapi.platzi.com/en/rest/products/${id}`, formData);
      // Lógica adicional después de editar el producto
      history.push('/products'); // Redirigir a la página de productos después de la edición
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  return (
    <div>
      <h1>Editar Producto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" value={formData.name} onChange={handleNameChange} />
        </div>
        <div>
          <label htmlFor="price">Precio:</label>
          <input type="number" id="price" value={formData.price.toString()} onChange={handlePriceChange} />
        </div>
        <div>
          <label htmlFor="size">Tamaño:</label>
          <select id="size" value={formData.size} onChange={handleSizeChange}>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="3XL">3XL</option>
          </select>
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default ProductEdit;
