import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
    //firstName: Yup.string()
    //.required('This field cannot be empty'),
    //password: Yup.string()
    //.required('Неверные имя пользователя или пароль'),
  });

const Login = () => {
  const userRef = useRef();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [success, setSuccess] = useState('');;
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("username").focus();
  }, []);

  const handleSubmit = (values) => {
    //setUser('');
    //setPwd('');
    setSuccess(true);
    console.log(user);
    console.log(pwd);
    return navigate("/");
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
         firstName: '',
         password: '',
       }}
       validationSchema={LoginSchema}
       onSubmit={(values) => handleSubmit(values)}
     >
       {({ errors, touched }) => (
         <Form className='form'>
           <Field
           id="username"
           name="firstName"
           label="Name"
           type="text"
           placeholder="Ваш ник"
           className="input"
           autoComplete="off"
           required="required"
           onChange={(e) => setUser(e.target.value)}
           value={user}
           />           
           <Field 
            label="Password"
            type="password"
            name="password"
            placeholder="Пароль"
            className="input"
            autoComplete="off"
            required="required"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            />
            {errors.password && console.log(errors.password)}
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
   </>
  );
};

export default Login;
