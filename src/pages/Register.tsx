import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Usuario', 
    avatar: '',
    // ... otros campos del formulario
  });

  const handleChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Validar el campo 'role'
    if (formData.role !== 'admin' && formData.role !== 'customer') {
      console.error('El campo "role" debe ser "admin" o "customer"');
      return; // Evitar enviar la solicitud si el campo 'role' no es válido
    }
  
    // Validar el campo 'avatar'
    if (!formData.avatar || !isValidURL(formData.avatar)) {
      console.error('El campo "avatar" debe ser una URL válida y no puede estar vacío');
      return; // Evitar enviar la solicitud si el campo 'avatar' no es válido
    }
  
    try {
      const response = await axios.post('https://api.escuelajs.co/api/v1/users/', formData);
  
      // Aquí se obtiene el rol seleccionado del formulario y se guarda en localStorage
      localStorage.setItem('role', formData.role);
  
      console.log('Usuario registrado:', response.data);
      history.push('/home');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  const isValidURL = (url: string): boolean => {
    if (!url) {
      return true;
    }
  
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocolo (https://, http://, etc.)
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // dominio: foo.com, subdomain.foo.com, etc.
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // también puede ser una IP (como 127.0.0.1)
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // puerto y ruta
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // parámetros de consulta
      '(\\#[-a-z\\d_]*)?$',
      'i'
    );
    
    return pattern.test(url);
  };
  


  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="role">Rol:</label>
          <select id="role" name="role" value={formData.role} onChange={handleChange}>
            <option value="customer">Usuario</option>
            <option value="admin">Administrador</option>
           </select>
        </div>
        {/* Otros campos del formulario */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
