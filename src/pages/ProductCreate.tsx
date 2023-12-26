import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios,  { AxiosError }  from 'axios';

const ProductCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: 1, 
    size: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    let price = parseInt(event.target.value);
    if (price < 1) {
      price = 1;
    }
    setFormData({ ...formData, price });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://api.escuelajs.co/api/v1/products/', formData);
      console.log('Producto creado:', response.data);
    } catch (error: any) {
      if (error.response) {
        // El servidor respondió con un status diferente a 2xx
        console.error('Error de respuesta:', error.response.data);
        console.error('Status de respuesta:', error.response.status);
        console.error('Cabezales de respuesta:', error.response.headers);
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error('No hubo respuesta:', error.request);
      } else {
        // Ocurrió un error al configurar la solicitud
        console.error('Error en la solicitud:', error.message);
      }
      console.error('Error general:', error);
    }
};


  

  return (
    <div>
      <h1>Crear Producto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="price">Precio:</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handlePriceChange} min="1" />
        </div>
        {/* Nuevo campo para el tamaño */}
        <div>
          <label htmlFor="size">Tamaño:</label>
          <select id="size" name="size" value={formData.size} onChange={handleChange}>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="3XL">3XL</option>
          </select>
        </div>
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
};

export default ProductCreate;
