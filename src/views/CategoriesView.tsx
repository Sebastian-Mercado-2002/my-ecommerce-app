import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import CategoryDelete from '../pages/CategoryDelete'; 


const CategoriesView = () => {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [newCategory, setNewCategory] = useState<{ name: string }>({ name: '' });
  const [editMode, setEditMode] = useState(false);
  const [editedCategory, setEditedCategory] = useState<{ id: number; name: string } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const history = useHistory(); 

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

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    if (userRole !== 'admin') {
      history.push('/'); // Redirige al usuario a la página principal si no es administrador
    }
  }, [history]);

  const openDeleteModal = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedCategoryId(null);
    setShowDeleteModal(false);
  };


  const handleDelete = async (categoryId: number) => {
    try {
      await axios.delete(`https://fakeapi.platzi.com/en/rest/categories/${categoryId}`);
      const updatedCategories = categories.filter(category => category.id !== categoryId);
      setCategories(updatedCategories);
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (editMode && editedCategory) {
        await axios.put(
          `https://fakeapi.platzi.com/en/rest/categories/${editedCategory.id}`,
          editedCategory
        );
        setEditMode(false);
        setEditedCategory(null);
      } else {
        const response = await axios.post(
          'https://fakeapi.platzi.com/en/rest/categories/',
          newCategory
        );
        setCategories([...categories, response.data]);
        setNewCategory({ name: '' });
      }
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editMode && editedCategory) {
      setEditedCategory({ ...editedCategory, name: event.target.value });
    } else {
      setNewCategory({ name: event.target.value });
    }
  };

  const handleEdit = (category: { id: number; name: string }) => {
    setEditMode(true);
    setEditedCategory(category);
  };

  const userRole = localStorage.getItem('role');

  return (
    <div>
      <h2>Categorías</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <Link to={`/products?category=${category.id}`}>{category.name}</Link>
            {userRole === 'admin' && (
              <>
                <button onClick={() => openDeleteModal(category.id)}>Eliminar</button>
                <button onClick={() => handleEdit(category)}>Editar</button>
              </>
            )}
          </li>
        ))}
      </ul>

      {userRole === 'admin' && (
        <div>
          <h3>{editMode ? 'Editar Categoría' : 'Crear Nueva Categoría'}</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre de la categoría"
              value={editMode && editedCategory ? editedCategory.name : newCategory.name}
              onChange={handleInputChange}
            />
            <button type="submit">{editMode ? 'Guardar' : 'Crear'}</button>
          </form>
        </div>
      )}

      {showDeleteModal && (
        <CategoryDelete
          categoryId={selectedCategoryId || 0}
          onClose={closeDeleteModal}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default CategoriesView;
