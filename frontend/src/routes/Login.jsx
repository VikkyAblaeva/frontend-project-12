import { Formik, Form, Field } from 'formik';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("username").focus();
  }, []);

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post('/api/v1/login', { username, password });
      if (data.token) {
        const user = { token: data.token, username: data.username };
        localStorage.setItem('user', JSON.stringify(user));
        setError('');
        return navigate("/");
      }
    } catch (err) {
      if (err.response.status === 401) {
        setError('Неверные имя пользователя или пароль');
      }
    }
  };

  return (
    <>
    <div className="header">
      <h1>Welcome to Chat!</h1>
    </div>
    <div className='container-form'>
     <h1>Войти</h1>
     <Formik
       initialValues={{
         username: '',
         password: '',
       }}
       onSubmit={handleSubmit}
     >
       {() => (
         <Form className='form'>
           <Field
           id="username"
           name="firstName"
           label="Name"
           type="text"
           placeholder="Ваш ник"
           className={error === '' ? 'input' : 'inputErr'}
           autoComplete="off"
           required="required"
           onChange={(e) => setUsername(e.target.value)}
           value={username}
           />           
           <Field 
            label="Password"
            type="password"
            name="password"
            placeholder="Пароль"
            className={error === '' ? 'input' : 'inputErr'}
            autoComplete="off"
            required="required"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
            {error !== '' ? (
            <div className='error four'>{error}</div>
            ) : null}
           <button className="butt" type="submit">Submit</button>
         </Form>
       )}
     </Formik>
     <h2>Нет аккаунта?</h2>
     <Link to="/signup"><h3>Регистрация</h3></Link>
   </div>
   </>
  );
};

export default Login;
