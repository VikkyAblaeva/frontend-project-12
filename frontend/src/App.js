import './App.css';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('This field cannot be empty'),
      password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('This field cannot be empty'),
  });

function App() {
  return (
    <div className='container'>
     <h1>Signup</h1>
     <Formik
       initialValues={{
         firstName: '',
         password: '',
       }}
       validationSchema={SignupSchema}
       onSubmit={values => {
         // same shape as initial values
         console.log(values);
       }}
     >
       {({ errors, touched }) => (
         <Form>
           <Field 
           name="firstName"
           label="Your Name"
           type="text"
           placeholder="Input your name"
           />
           {errors.firstName && touched.firstName ? (
             <div className='error'>{errors.firstName}</div>
           ) : null}
           
           <Field 
            label="Password"
            type="password"
            name="password"
            placeholder="Input password"
            />
            {errors.password && touched.password ? (
             <div className='error'>{errors.password}</div>
           ) : null}
           <button className="butt" type="submit">Submit</button>
         </Form>
       )}
     </Formik>
   </div>
  );
}

export default App;
