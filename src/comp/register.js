import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../acw.png';

export default function Register() {
    const uri = 'http://localhost:1000/';
    const [Status, setStatus] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        gender: '',
        password: '',
        cpassword: '',
        usprofileimg: '',
        uscoverimg: '',
    });

    const [validationErrors, setValidationErrors] = useState({});
    
    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = data => {
        let errors = {};

        if (!data.name) {
            errors.name = 'Name is required.';
        }
        if (!data.email) {
            errors.email = 'Email is required.';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
            errors.email = 'Invalid email address.';
        }
        if (!data.contact) {
            errors.contact = 'Contact is required.';
        }
        if (!data.password) {
            errors.password = 'Password is required.';
        }
        if (!data.cpassword) {
            errors.cpassword = 'Confirm password is required.';
        } else if (data.password !== data.cpassword) {
            errors.cpassword = 'Passwords do not match.';
        }

        return errors;
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const errors = validate(formData);
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }
    
        try {
            await axios.get(uri + 'check-user-exists', {
                params: {
                    email: formData.email,
                }
            }).then((response) => {
                if (response.data == true) {
                    errors.email = 'This email address is already in use.';
                   
                }
                if (errors.email) {
                    setValidationErrors(errors);
                    return;
                }else {
                     // submit the form to the server
                    try {
                        axios.post(uri + 'AddUser', formData).then(() => {
                            alert('Data Added');
                            setFormData({
                                name: '',
                                email: '',
                                contact: '',
                                gender: '',
                                password: '',
                                cpassword: '',
                                usprofileimg: '',
                                uscoverimg: '',
                            });
                        });
                    } catch (err) {
                        console.error(err);
                        alert('An error occurred while submitting the form.');
                    }
                }
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
        } catch (err) {
            console.error(err);
            alert('An error occurred while checking for existing user.');
        }
    };
    
    
return (
    <>
        <Link className="rg" to={'/'}>
            <img src={logo} />
        </Link>
        <div className="bg-form">
            <div className="form container">
                <h1>Register Here</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type={'text'}
                            name="name"
                            value={formData.name}
                            placeholder="Name"
                            className="form-control"
                            onChange={handleInputChange}
                        />
                        {validationErrors.name && (
                            <div className="validation-error">{validationErrors.name}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <input
                            type={'email'}
                            name="email"
                            value={formData.email}
                            placeholder="Email"
                            className="form-control"
                            onChange={handleInputChange}
                        />
                        {validationErrors.email && (
                            <div className="validation-error">{validationErrors.email}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <input
                            type={'tel'}
                            name="contact"
                            value={formData.contact}
                            placeholder="Contact"
                            className="form-control"
                            onChange={handleInputChange}
                        />
                        {validationErrors.contact && (
                            <div className="validation-error">{validationErrors.contact}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <select
                            name="gender"
                            value={formData.gender}
                            className="form-control"
                            onChange={handleInputChange}
                        >
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input
                            type={'password'}
                            name="password"
                            value={formData.password}
                            placeholder="Password"
                            className="form-control"
                            onChange={handleInputChange}
                        />
                        {validationErrors.password && (
                            <div className="validation-error">{validationErrors.password}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <input
                            type={'password'}
                            name="cpassword"
                            value={formData.cpassword}
                            placeholder="Confirm Password"
                            className="form-control"
                            onChange={handleInputChange}
                        />
                        {validationErrors.cpassword && (
                            <div className="validation-error">{validationErrors.cpassword}</div>
                        )}
                    </div>
                    <span>
                        If you already registered the{' '}
                        <Link to="/Login">Login Here </Link>.{' '}
                    </span>
                    <div className="form-group">
                        <input
                            type={'submit'}
                            value="Submit"
                            name="submit"
                            className="btn btn-success"
                        />
                    </div>
                </form>
            </div>
        </div>
    </>
);
}


