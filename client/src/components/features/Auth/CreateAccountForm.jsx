import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/styles/formStyles.css';
import googleLogo from '../../assets/image/google_720255.png';
import { signInWithGoogle } from '../../services/firebase.js'; // Asegúrate de que la ruta es correcta
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Importa el método correcto
import { auth } from '../../services/firebase.js'; // Importa el objeto auth desde tu configuración de Firebase
import axios from 'axios';  //   Importa  axios  para  realizar  solicitudes  HTTP


const CreateAccountForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate(); // Hook para la navegación programática

  // Maneja el cambio de los campos del formulario
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    // Limpiar errores al cambiar el campo
    setErrors({ ...errors, [id]: '' });
  };

  // Validación del formulario
  const validateForm = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre completo es obligatorio';
    }
    if (!formData.email.includes('@')) {
      newErrors.email = 'El correo electrónico es inválido';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    return newErrors;
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Lógica para enviar el formulario (Firebase)
      try {

        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;
        
        // Guardar el usuario en MongoDB
        await axios.post('/api/users', {
          uid: user.uid,
          email: formData.email,
          name: formData.name,
          role: 'USER', // Puedes ajustar esto según sea necesario
        });

        navigate('/dashboard'); // Redirigir al Dashboard después de crear la cuenta
      } catch (error) {
        alert(error.message); // Mostrar el mensaje de error al usuario
      }
    } else {
      setErrors(validationErrors);
    }
  };

  // Manejo del inicio de sesión con Google
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert('Inicio de sesión exitoso, redirigiendo al Dashboard...');
      navigate('/dashboard'); // Redirigir al Dashboard después de iniciar sesión con Google
    } catch (error) {
      alert(error.message); // Mostrar el mensaje de error al usuario
    }
  };

  return (
    <div className="create-account-container">
      <div className="create-account-box">
        <h1>Crea tu cuenta</h1>
        <p className="subtext">Obtén acceso exclusivo!</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Nombre Completo</label>
            <input
              type="text"
              id="fullName"
              placeholder="Ingresa tu nombre completo"
              value={formData.fullName}
              onChange={handleChange}
              aria-describedby="fullNameError" // Atributo para accesibilidad
            />
            {errors.fullName && (
              <span id="fullNameError" className="error-text">{errors.fullName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu correo electrónico"
              value={formData.email}
              onChange={handleChange}
              aria-describedby="emailError" // Atributo para accesibilidad
            />
            {errors.email && (
              <span id="emailError" className="error-text">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-field">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                placeholder="Ingresa tu contraseña"
                value={formData.password}
                onChange={handleChange}
                aria-describedby="passwordError" // Atributo para accesibilidad
              />
              <span
                className="toggle-password"
                onClick={() => setPasswordVisible(!isPasswordVisible)}
                role="button" // Atributo para accesibilidad
                tabIndex="0" // Permitir que sea enfocable
                onKeyPress={(e) => { if (e.key === 'Enter') setPasswordVisible(!isPasswordVisible); }} // Manejo de teclado
                aria-label={isPasswordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
              </span>
            </div>
            {errors.password && (
              <span id="passwordError" className="error-text">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Reingresa tu contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              aria-describedby="confirmPasswordError" // Atributo para accesibilidad
            />
            {errors.confirmPassword && (
              <span id="confirmPasswordError" className="error-text">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="create-account-btn">Crear Cuenta</button>
        </form>

        <div className="or-divider">
          <span>O</span>
        </div>

        <button onClick={handleGoogleSignIn} className="google-signin-btn">
          <img src={googleLogo} alt="Logo de Google" className="google-icon" />
          Regístrate con Google
        </button>

        <p className="sign-in-link">
          ¿Ya tienes una cuenta? <Link to="/signIn">Iniciar Sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default CreateAccountForm;
