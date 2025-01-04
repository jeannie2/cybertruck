import React, { useRef, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from '../../supabaseClient.js';

const ContactForm = () => {
  const navigate = useNavigate();
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const validateName = (name) => {
    const re = /^[a-zA-Z\s'-]+$/;
    return re.test(name);
  }

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const validatePhone = (phone) => {
    const re = /^(\d{3}-\d{3}-\d{4}|\d{8})$/;
    return re.test(phone);
  }

const handleSubmit = async (e) => {
  e.preventDefault();
  if(
    !firstNameRef.current?.value ||
    !lastNameRef.current?.value ||
    !emailRef.current?.value ||
    !phoneRef.current?.value
  ) {
    setErrorMsg("Please complete all fields");
    return;
  } 

    if (!validateName(firstNameRef.current.value) || !validateName(lastNameRef.current.value)) {
        setErrorMsg("Names should contain only letters");
        return;
    }

    if (!validateEmail(emailRef.current.value)) {
        setErrorMsg("Please enter a valid email address");
        return;
    }

    if (!validatePhone(phoneRef.current.value)) {
        setErrorMsg("Please enter a valid phone number");
        return;
    }

    try {
      setErrorMsg("");
      setLoading(true);
      const { data, error } = await supabaseClient
        .from('contacts')
        .insert([
          {
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            email:  emailRef.current.value,
            phone: phoneRef.current.value
          }
        ]);
    if (!error && data) {
        setMsg( "Contact added successfully");
        console.log(msg);
        // res.send("contact added successfully")
        // closeHandler();
    }
    } catch (error) {
      setErrorMsg("Error in adding contact details");
    }
    setLoading(false);
    resetForm();
    navigate('/submitted');
  }

  const resetForm = () => {
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    emailRef.current.value = "";
    phoneRef.current.value = "";
  };

  return (    
    <Form onSubmit={handleSubmit} className="text-white text-center mt-5">
      <Form.Group id="first-name" className="mt-3">
        <Form.Label>First name</Form.Label>
        <Form.Control type="text" ref={firstNameRef} required className="bg-transparent w-75 border border-3 text-white mx-auto" />
      </Form.Group>

      <Form.Group id="last-name" className="mt-3" >
        <Form.Label>Last name</Form.Label>
        <Form.Control type="text" ref={lastNameRef} required className="bg-transparent w-75 border border-3 text-white mx-auto"/>
      </Form.Group>

      <Form.Group id="email" className="mt-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" ref={emailRef} required className="bg-transparent w-75 border border-3 text-white mx-auto"/>
      </Form.Group>

      <Form.Group id="phone" className="mt-3">
        <Form.Label>Phone number</Form.Label>
        <Form.Control type="number" ref={phoneRef} placeholder="NXX-XXX-XXXX" required className="bg-transparent w-75 border border-3 text-white mx-auto"/>
      </Form.Group>

      {errorMsg && (
        <Alert
          variant="danger"
          onClose={() => setErrorMsg("")}
          dismissible>
          {errorMsg}
        </Alert>
      )}
      <div className="text-center mt-4">
        <Button disabled={loading} type="submit" className="order-btn">
          SUBMIT
        </Button>
      </div>
    </Form>
  )
}

export default ContactForm;
