import React, { useState } from 'react';

export default function ContactUs() {
  const mainDivStyle = {
    margin: "100px", // Add margin
  };
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);

    const pattern = /^[A-Za-z\s]+$/;

    if (!value) {
      setNameError('Name cannot be empty.');
    } else if (!pattern.test(value)) {
      setNameError('Name should only contain letters and spaces.');
    } else {
      setNameError('');
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!value) {
      setEmailError('Email address cannot be empty.');
    } else if (!emailPattern.test(value)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);

    const phoneNumberPattern = /^[\d\- ]*$/;

    if (!value) {
      setPhoneNumberError('Contact Number cannot be empty.');
    } else if (!phoneNumberPattern.test(value)) {
      setPhoneNumberError('Please enter a valid phone number.');
    } else {
      setPhoneNumberError('');
    }
  };

  return (
    <div style={mainDivStyle}>
      <form>
        <div>
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={handleNameChange}
          />
          {nameError && <div className="text-danger">{nameError}</div>}
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <div className="text-danger">{emailError}</div>}
        </div>

        <div className="form-group">
          <label for="exampleInputPassword1">Contact Number</label>
          <input
            type="text"
            className="form-control"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          {phoneNumberError && <div className="text-danger">{phoneNumberError}</div>}
        </div>

        <div className="form-group">
          <label for="exampleInputPassword1">Inquiry</label>
          <input type="text" className="form-control" id="exampleInputPassword1" />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
