import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import axios from 'axios';

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

const handleSubmit = async (values) => {
  console.log(values);
  const responce = await axios.post('/api/v1/signup', values);
  //console.log(responce);
  //const user = {
    //login: values.firstName,
    //password: values.password,
    //token: responce.data.token,
  //};
  localStorage.setItem('token', String(responce.data.token));
  //console.log(user);
}

const Signup = () => {
  return (
    <div className='container'>
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
  );
};

export default Signup;
