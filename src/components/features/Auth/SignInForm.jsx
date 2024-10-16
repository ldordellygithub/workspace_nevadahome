import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { signInWithEmail, signInWithGoogle } from '../../services/firebase'; 
import '../../assets/styles/formStyles.css';
import googleLogo from '../../assets/image/google_720255.png';

const SignInForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  // Resetear el formulario al montar el componente
  useEffect(() => {
    setFormData({ email: '', password: '' });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};

    // Validaciones del formulario
    if (!formData.email.includes('@')) {
      newErrors.email = 'Por favor, introduce una dirección de correo válida.';
    }
    if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      setErrors({});
      try {
        await signInWithEmail(formData.email, formData.password); 
        navigate('/dashboard'); 
      } catch (error) {
        setErrors({ general: error.message });
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle(); 
      navigate('/dashboard'); 
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-box">
        <h1>Inicia Sesión</h1>
        <p className="subtext">Desbloquea tu mundo energético</p>
        <form onSubmit={handleSubmit}>
          {errors.general && <span className="error-text">{errors.general}</span>}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <i className="icon-envelope"></i>
              <input
                type="email"
                id="email"
                placeholder="Introduce tu email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-wrapper">
              <i className="icon-lock"></i>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                placeholder="Introduce tu contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setPasswordVisible(!isPasswordVisible)}
                title={isPasswordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {isPasswordVisible ? <i className="icon-eye-slash"></i> : <i className="icon-eye"></i>}
              </span>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          <button type="submit" className="sign-in-btn" disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
          <button type="button" className="signgoogle-in-btn" onClick={handleGoogleSignIn} disabled={loading}>
            <img src={googleLogo} alt="Logo de Google" className="google-icon" />
            Iniciar Sesión con Google
          </button>
          <p className="sign-up-link">
            ¿No tienes una cuenta? <Link to="/signup">Crear cuenta</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
