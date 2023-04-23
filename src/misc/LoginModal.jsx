import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import '../styles/bootstrap.css';


/*

const AskChatGPT = (prompt) => {

  const gptFetch = (prompt) => {
    return fetch('https://btschwartz.com/api/v1/chat/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        question: prompt,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const respData = {
          answer: data.content
        }
        return respData;
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
      });
  };
*/




function LoginModal({ show, handleClose, onSubmit, onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    setSubmitting(true);
    setErrorMessage('');

    const successfulLogin = onSubmit({ username, password });

    console.log('successfulLogin', successfulLogin);

    if (successfulLogin) {
      onSuccess();
      setSubmitting(false);
      handleClose();
    }
    else {
      setErrorMessage('Invalid username or password.');
      setSubmitting(false);
    }
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
