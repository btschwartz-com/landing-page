import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import '../styles/bootstrap.css';

function LoginModal({ show, handleClose, onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    setSubmitting(true);
    setErrorMessage('');

    // Simulate an async operation like API call
    setTimeout(() => {
      // Simulate a 50% chance of successful login
      const success = Math.random() > 0.5;

      if (success) {
        onSuccess({ username, password });
        setSubmitting(false);
        handleClose();
      } else {
        setErrorMessage('Invalid username or password.');
        setSubmitting(false);
      }
    }, 1000);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            {errorMessage && (
              <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
                {errorMessage}
              </Alert>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginModal;
