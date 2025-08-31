import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import "./SignupForm.css";
import { Link } from 'react-router-dom';

type NewUser = {
    username: string;
    password: string;
    confirmPassword: string
};

const initialValues = {
    username: '',
    password: '',
    confirmPassword: ''
}

const validationSchema = Yup.object({
    username: Yup.string()
      .required('*required')
      .trim()
      .email('Невалідний email (наприклад, name@example.com)'),
    password: Yup.string()
      .min(6, 'min 6 symbols')
      .required('*required')
      .min(6, "Мінімум 6 символів")
      .matches(/[a-z]/, "Має бути хоча б одна маленька літера")
      .matches(/[A-Z]/, "Має бути хоча б одна велика літера")
      .matches(/[^a-zA-Z0-9]/, "Має бути хоча б один спецсимвол"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords are not equal!')
    .required('*required'),
});

const SignupForm = () => {
    const [user, setUser] = useState<NewUser | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [isSignedup, setIsSignedup] = useState(false)

    const handleSignUp = async (values: NewUser, actions: FormikHelpers<NewUser>) => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const newUser = { 
            id: Date.now(), 
            username: values.username, 
            password: values.password
        };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        setIsSignedup(true)
        setUser(values)
        actions.resetForm()
    }

    return (
        <div className='signup-container'>
            <Link to='/' className="back-link">HOME</Link>

            {isSignedup 
                ? (<span className='signup-message success'>{user?.username}, thank you for registration!</span>) 
                : (<span className='signup-message error'>Please, sign up!</span>)
            }
            <Formik 
              initialValues={initialValues} 
              onSubmit={(values, actions) => {handleSignUp(values, actions)}} 
              validationSchema={validationSchema}
            >
                <Form className="signup-form">
                    <Field 
                      as="input" 
                      name="username" 
                      type="text" 
                      placeholder="Enter your Email" 
                      className="input-field" 
                    />
                    <ErrorMessage name="username" component="div" className="error-text" />

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

                    <div className="password-wrapper">
                        <Field 
                          as="input" 
                          name="confirmPassword" 
                          type={showPassword ? 'text' : 'password'} 
                          placeholder="Repeat Password" 
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
                        <ErrorMessage name="confirmPassword" component="div" className="error-text" />
                    </div>

                    <button type="submit" className="signup-btn">SIGN UP</button>
                </Form>
            </Formik>
        </div>
    )
}

export default SignupForm
