import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function UserForm({ touched, errors, status }){
    const [users, setUsers ] = useState([]);
    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status]);
    return(
        <div className='page'>
            <div className='form-container'>
                <h1>User Sign Up</h1>
                <Form>
                    <label htmlFor='name'>Name</label>
                    <Field 
                        id='name'
                        type='text'
                        name='name'
                        placeholder='name'
                    />
                    {touched.name && errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                    <label htmlFor='Email'>Email</label>
                    <Field 
                        id='email'
                        type='email'
                        name='email'
                        placeholder='email'
                    />
                    {touched.email && errors.email && (
                        <p className='error'>{errors.email}</p>
                    )}
                    <label htmlFor='Password'>Password</label>
                    <Field 
                        id='password'
                        type='password'
                        name='password'
                        placeholder='password'
                    />
                    {touched.password && errors.password && (
                        <p className='error'>{errors.password}</p>
                    )}
                    <div className='tos-container'>
                        <Field 
                            id='tos'
                            type='checkbox'
                            name='tos'
                        />
                        <p>Read terms of service</p>
                    </div>
                    <button type='submit'>Submit</button>
                </Form>
            </div>
            <div className='current-users'>
                <h1>Current Users</h1>
                {users.map(user => {
                    return <div key={user.id} className='user'>
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                    </div>
                })}
            </div>
        </div>
    )
}

// HOC
const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, tos}){
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            tos: tos || false,
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name required'),
        email: Yup.string().required('Email required'),
        password: Yup.string().required('Password required')
    }),
    handleSubmit(values, { resetForm, setStatus }){
        console.log('submitting', values);
        axios.post('https://reqres.in/api/users', values)
        .then(res => {
            console.log('Success:', res.data);
            setStatus(res.data);
            resetForm();
        })
    }
})(UserForm);

export default FormikUserForm;