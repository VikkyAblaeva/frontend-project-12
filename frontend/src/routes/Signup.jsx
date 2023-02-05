import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import React from 'react';

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
         // same shape as initial values
         console.log(values);
       }}
     >
       {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid }) => (
         <Form>
           <Field
           name="firstName"
           label="Name"
           type="text"
           placeholder="Имя пользователя"
           />
           {errors.firstName && touched.firstName ? (
             <div className='error one'>{errors.firstName}</div>
           ) : null}
           <Field 
            label="Password"
            type="password"
            name="password"
            placeholder="Пароль"
            />
            {errors.password && touched.password ? (
             <div className='error two'>{errors.password}</div>
           ) : null}
           <Field 
            label="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Подтвердите пароль"
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
