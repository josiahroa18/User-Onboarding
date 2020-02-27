import React from 'react';
import { withFormik, Form, Field } from 'formik';
import axios from 'axios';

function UserForm(){
    return(
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
                <label htmlFor='Email'>Email</label>
                <Field 
                    id='email'
                    type='email'
                    name='email'
                    placeholder='email'
                />
                <label htmlFor='Password'>Password</label>
                <Field 
                    id='password'
                    type='password'
                    name='password'
                    placeholder='password'
                />
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
    )
}

// HOC
const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, tos}){
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            tos: tos || false
        }
    },
    handleSubmit(values, { resetForm }){
        console.log('submitting', values);
        axios.post('https://reqres.in/api/users', values)
        .then(res => {
            console.log('Success:', res.data);
            resetForm();
        })
    }
})(UserForm);

export default FormikUserForm;