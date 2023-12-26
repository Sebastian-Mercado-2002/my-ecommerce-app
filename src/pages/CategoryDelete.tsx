import React from 'react';
import axios from 'axios';

interface CategoryDeleteProps {
  categoryId: number;
  onClose: () => void;
  onDelete: (categoryId: number) => void;
}

const CategoryDelete: React.FC<CategoryDeleteProps> = ({ categoryId, onClose, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://fakeapi.platzi.com/en/rest/categories/${categoryId}`);
      onDelete(categoryId);
      onClose();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirmar eliminación</h2>
        <p>¿Estás seguro de que deseas eliminar esta categoría?</p>
        <div className="modal-buttons">
          <button onClick={handleDelete}>Eliminar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryDelete;
