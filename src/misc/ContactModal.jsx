import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import emailjs from '@emailjs/browser';

function ContactModal({ show, handleClose }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();

        setIsSubmitting(true);

        console.log(form.current);
        

        emailjs.sendForm('service_si7990d', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_USER_ID')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                handleClose();
            }, (error) => {
                console.error('FAILED...', error);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Contact Me</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Feel free to reach out!</p>
                <Form ref={form} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" name="user_name" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" name="user_email" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="message">
                        <Form.Label>Message:</Form.Label>
                        <Form.Control as="textarea" rows={3} name="message" required />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button
                    variant={isSubmitting ? "secondary" : "primary"}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ContactModal;
