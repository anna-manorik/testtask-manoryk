import { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import type { AuthUser } from '../../types/TypesProps.tsx';
import { Link } from 'react-router-dom';
import "./LoginForm.css"; 


const validationSchema = Yup.object({
    username: Yup.string()
      .email('invalid email')
      .required('*required'),
    password: Yup.string()
      .min(6, 'min 6 symbols')
      .required('*required')
});

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState<AuthUser>()
    
    const handleLogin = (values: AuthUser, actions: FormikHelpers<AuthUser>) => {
        checkUser(values.username, values.password)
        actions.resetForm();
    };

    const checkUser = (username: string, password: string): boolean => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find((user: AuthUser) => user.username === username && user.password === password);
        
        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            setIsLoggedIn(true)
            setCurrentUser({username, password})
            return true;
        }
        
        return false;
    }

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false)
    };
    
    return (
        <div className='login-container'>
            <span className="login-message">
                {isLoggedIn ? (
                    <>
                    {`Welcome, ${currentUser?.username}!`}
                    <button
                        disabled={!isLoggedIn}
                        type="submit"
                        onClick={handleLogout}
                        className="logout-btn"
                    >
                        LOG OUT
                    </button>
                    </>
                ) : (
                    'Please, login to proceed!'
                )}
            </span>
            <Formik 
              initialValues={{username: '', password: ''}} 
              onSubmit={(values, actions) => {handleLogin(values, actions)}} 
              validationSchema={validationSchema}
            >
                <Form className="login-form">
                    <Field 
                      as="input" 
                      name="username" 
                      type="email" 
                      placeholder="Login" 
                      className="input-field" 
                    />
                    <ErrorMessage name="login" component="div" className="error-text" />
                    
                    <div className="password-wrapper">
                        <Field 
                          as="input" 
                          name="password" 
                          type={showPassword ? 'text' : 'password'} 
                          placeholder="Password" 
                          className="input-field" 
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="toggle-password-btn"
                        >
                            {showPassword 
                            ? (<EyeSlashIcon className="icon" />) 
                            : (<EyeIcon className="icon" />)}
                        </button>
                        <ErrorMessage name="password" component="div" className="error-text" />
                    </div>

                    <button type="submit" className="login-btn">
                        LOG IN
                    </button>
                </Form>
            </Formik>
            {isLoggedIn 
            ? <Link to='/courses' className="courses-link">Courses' list</Link>
            : <Link to='/signup' className="signup-link">SIGN UP</Link>}
        </div>
    )
}

export default LoginForm
