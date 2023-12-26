import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../pages/CartContext';

export interface Product {
  id: number;
  title: string; 
  price: number; 
  quantity: number; 
  name: string; 
  category: {
    id: number;
    name: string;
    // Otras propiedades 
  };
  size: string;
  image: string;
  userId: number;
  // ... otras propiedades
}


interface Category {
  id: number;
  name: string;
  image: string;
  // ... otras propiedades de la categoría
}

const ProductListView = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null); // Nuevo estado para el tamaño seleccionado
  const location = useLocation();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const categoryParam = params.get('category');
  
        let url = 'https://api.escuelajs.co/api/v1/products';
  
        // Si hay una categoría seleccionada, ajusta la URL y el estado de la categoría
        if (selectedCategory !== null) {
          url = `https://api.escuelajs.co/api/v1/categories/${selectedCategory}/products`;
        }
  
        const response = await axios.get(url);
  
        // Si hay un tamaño seleccionado, filtra los productos por tamaño
        let filteredProducts = response.data;
        if (selectedSize !== null && selectedSize !== 'all') {
          filteredProducts = filteredProducts.filter(
            (product: Product) => product.size === selectedSize
          );
        }
  
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, [location.search, selectedCategory, selectedSize]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = event.target.value;
    setSelectedSize(newSize === 'all' ? null : newSize);
  };
  
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory === 'all' ? null : parseInt(newCategory, 10));
  };

  const user = localStorage.getItem('user');

  const canEditProduct = (product: Product, user: any) => {
    return user && user.id === product.userId;
  };

  const handleAddToCart = (product: Product) => {
    const productToAdd = {
      id: product.id,
      title: product.name,
      price: product.price,
      quantity: 1,
    };
    addToCart(productToAdd);
  };

  return (
    <div className="product-list">
      <div className="filter-container">
        <div className="filter-by-size">
          <label htmlFor="sizeFilter">Filter by Size:</label>
          <select id="sizeFilter" onChange={handleSizeChange}>
            <option value="all">All Sizes</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="3XL">3XL</option>
          </select>
        </div>

        {/* Selector de Categorías */}
        <div className="filter-by-category">
          <label htmlFor="categoryFilter">Filter by Category:</label>
          <select id="categoryFilter" onChange={handleCategoryChange}>
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="products-container">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-details">
                <h3>{product.title}</h3>
                <p>Category: {product.category.name}</p>
                <p>Size: {product.size}</p>
                {/* Otros detalles del producto */}
                {canEditProduct(product, user) && (
                  <Link to={`/productedit/${product.id}`}>Editar Producto</Link>
                )}
                <button onClick={() => handleAddToCart(product)}>Agregar al carrito</button>
                {/* Botón para agregar al carrito */}
              </div>
            </div>
          ))
        ) : (
          <p>No se han encontrado productos.</p>
        )}
      </div>
    </div>
  );
};

export default ProductListView;
