import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(50, 'Не более 50 символов')
      .required('Обязательное поле'),
    password: Yup.string()
      .min(6, 'Не менее 6 символов')
      .max(50, 'Не более 50 символов')
      .required('Обязательное поле'),
    confirmPassword: Yup.string().required('Пароли должны совпадать').oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
  });

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const responce = await axios.post('/api/v1/signup', { username, password });
      const user = {
        username: username,
        token: responce.data.token,
    };
    localStorage.setItem('user', JSON.stringify(user));
    setError('');
    return navigate("/");
    } catch (err) {
      if (err.response.status === 409) {
        setError('Такой пользователь уже существует!');
      }
    }
  };
  useEffect(() => {
    document.getElementById("username").focus();
  }, []);
  return (
    <>
    <div className="header">
      <h1>Welcome to Chat!</h1>
    </div>
    <div className='container-form'>
     <h1>Регистрация</h1>
     <Formik
       initialValues={{
         username: '',
         password: '',
         confirmPassword: '',
       }}
       validationSchema={SignupSchema}
       onSubmit={handleSubmit}
     >
       {({ values, errors, touched, handleChange, handleBlur, isValid }) => (
         <Form className='form'>
           <Field
           id="username"
           name="firstName"
           label="Name"
           type="text"
           placeholder="Имя пользователя"
           className={error === '' ? 'input' : 'inputErr'}
           onChange={(e) => setUsername(e.target.value)}
           value={username}
           />
           {errors.username && touched.username ? (
             <div className='error one'>{errors.username}</div>
           ) : null}
           <Field
            id="password"
            label="Password"
            type="password"
            name="password"
            placeholder="Пароль"
            className={error === '' ? 'input' : 'inputErr'}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
            {errors.password && touched.password ? (
             <div className='error two'>{errors.password}</div>
           ) : null}
           <Field 
            label="confirmPassword"
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Подтвердите пароль"
            className={error === '' ? 'input' : 'inputErr'}
            />
            {errors.confirmPassword && touched.confirmPassword ? (
             <div className='error three'>{errors.confirmPassword}</div>
           ) : null}
           {error !== '' ? (
            <div className='error three'>{error}</div>
            ) : null}
           <button className="butt" type="submit">Submit</button>
         </Form>
       )}
     </Formik>
   </div>
   </>
  );
};

export default Signup;
