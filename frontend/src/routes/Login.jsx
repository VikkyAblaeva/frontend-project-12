import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { Link } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
    //firstName: Yup.string()
    //.required('This field cannot be empty'),
    //password: Yup.string()
    //.required('Неверные имя пользователя или пароль'),
  });

const handleForm = (values) => {
  console.log(values);
}

const Login = () => {
  return (
    <div className='container'>
     <h1>Войти</h1>
     <Formik
       initialValues={{
         firstName: '',
         password: '',
       }}
       validationSchema={LoginSchema}
       onSubmit={values => {
         handleForm(values);
         //console.log(values);
       }}
     >
       {({ errors, touched }) => (
         <Form>
           <Field
           name="firstName"
           label="Name"
           type="text"
           placeholder="Ваш ник"
           />           
           <Field 
            label="Password"
            type="password"
            name="password"
            placeholder="Пароль"
            />
            {errors.password && touched.password ? (
             <div className='error four'>{errors.password}</div>
           ) : null}
           <button className="butt" type="submit">Submit</button>
         </Form>
       )}
     </Formik>
     <h2>Нет аккаунта?</h2>
     <Link to="/signup"><h3>Регистрация</h3></Link>
   </div>
  );
};

export default Login;
