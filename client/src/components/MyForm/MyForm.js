import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';

const submit = ({ firstName='', lastName='', email='' }, submitAction) => {

  let error = {};
  let isError = false;

  if (firstName.trim() === '') {
    error.firstName = 'Required';
    isError = true;
  }

  if (firstName.length > 20) {
    error.firstName = 'Too long';
    isError = true;
  }

  if (lastName.trim() === '') {
    error.lastName = 'Required';
    isError = true;
  }

  if (email.trim() === '') {
    error.email = 'Required';
    isError = true;
  }

  if (isError) {
    throw new SubmissionError(error);
  } else {
    submitAction({firstName, lastName, email});
  }
}

const renderField = ({ type, label, input, meta: { touched, error } }) => (
  <div className="input-row">
    <label>{label}</label>
    <input {...input} type={type}/>
    {touched && error && 
     <span className="error">{error}</span>}
  </div>
);

const ContactFormFunc = ({ handleSubmit, submitAction }) => (
  <form onSubmit={handleSubmit((fields) => submit(fields, submitAction))}>
    <Field name="firstName" label='First Name' component={renderField} type="text"/>
    <Field name="lastName" label='Last Name' component={renderField} type="text"/>
    <Field name="email" label='Email' component={renderField} type="email"/>
    <button type="submit">Submit</button>
  </form>
);

// Decorate the form component
const ContactForm = reduxForm({
  form: 'contact' // a unique name for this form
})(ContactFormFunc);

export default ContactForm;
