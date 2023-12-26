import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
        email,
        password,
      });

      const { access_token, role } = response.data; // Asumiendo que el servidor devuelve un token y un rol

      localStorage.setItem('token', access_token);
      localStorage.setItem('role', role); // Almacenar el rol en el localStorage

      if (role === 'admin') {
        history.push('/products/create'); // Redirigir a la creación de productos si es administrador
      } else {
        history.push('/home'); // Redirigir a la página principal si no es administrador
      }

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };


  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
