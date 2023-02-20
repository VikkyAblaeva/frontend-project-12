import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
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
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    const responce = await axios.post('/api/v1/signup', values);
    const user = {
      login: values.firstName,
      password: values.password,
      token: responce.data.token,
    };
    localStorage.setItem('token', String(responce.data.token));
    return navigate("/");
    //console.log(user);
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
         firstName: '',
         password: '',
         confirmPassword: ''
       }}
       validationSchema={SignupSchema}
       onSubmit={values => {
         handleSubmit(values);
         //console.log(values);
       }}
     >
       {({ values, errors, touched, handleChange, handleBlur, isValid }) => (
         <Form className='form'>
           <Field
           id="username"
           name="firstName"
           label="Name"
           type="text"
           placeholder="Имя пользователя"
           className="input"
           />
           {errors.firstName && touched.firstName ? (
             <div className='error one'>{errors.firstName}</div>
           ) : null}
           <Field
            id="password"
            label="Password"
            type="password"
            name="password"
            placeholder="Пароль"
            className="input"
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
            className="input"
            />
            {errors.confirmPassword && touched.confirmPassword ? (
             <div className='error three'>{errors.confirmPassword}</div>
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
