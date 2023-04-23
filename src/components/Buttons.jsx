import React, { useState } from 'react';


import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';
import { MovingElement } from './MovingElement.jsx';

import ChatGPTModal from './ChatGPTModal.jsx';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';
import { ServerInfo, FunFact, Explanation, AskChatGPT, TestToast } from './Toasts.jsx'





const buttonData = [
  {
    text: 'What?',
    type: 'secondary',
    row: 1,
    toast: Explanation,
    className: 'gold'

  },
  {
    text: 'Portfolio',
    link: 'https://btschwartz.com/portfolio/',
    row: 2,
    className: 'purple'

  },
  {
    text: 'Resume',
    link: 'https://drive.google.com/file/d/1wCPzd7fiAko-PfaizeCkd8ZChVdLK7eA/view?usp=sharing',
    row: 2,
    className: 'black'
  },

  {
    text: 'Instagram Clone',
    link: 'https://btschwartz.com/insta',
    row: 4,
    className: 'gray'
  },
  {
    text: 'Server',
    row: 5,
    toast: ServerInfo,
    className: 'gray'
  },
  {
    text: 'Ask ChatGPT',
    row: 3,
    modalId: 'chatGPT',
    modal: ChatGPTModal, // Replace with your specific modal component
    modalProps: { onSubmit: AskChatGPT }, // Pass any additional props your modal might need
    className: 'green'
  },
  {
    text: 'Fun Fact',
    row: 5,
    toast: FunFact,
    className: 'gray'
  },
  {
    text: 'Test Toast',
    row: 6,
    toast: TestToast,
    className: 'gray'
  },
  {
    text: 'VIP',
    row: 6,
    toast: TestToast,
    className: 'pink'
  },
]




const Buttons = () => {
  const [modalStates, setModalStates] = useState({});
  const navigate = useNavigate();

  const handleShow = (modalId) => {
    setModalStates((prevState) => ({ ...prevState, [modalId]: true }));
  };

  const handleClose = (modalId) => {
    setModalStates((prevState) => ({ ...prevState, [modalId]: false }));
  };

  const handlePress = (button) => {
    if (button.toast) {
      button.toast();
    }
    if (button.modal) {
      handleShow(button.modalId);
    }
  };

  const handleLoginSuccess = ({ username, password }) => {
    console.log('Successful login:', { username, password });
    navigate('/vip');
  };

  const renderButtons = (buttonRow) =>
    buttonRow.map((button) => (
      <MovingElement key={button.text} element={() =>
        <>
          <AwesomeButton
            type='primary'
            target="_blank"
            href={button.link}
            className={`aws-btn ${button.className}`}
            onPress={() => handlePress(button)}
          >
            {button.text}
          </AwesomeButton>
        </>
      }>
      </MovingElement>
    ));

  const renderModals = () =>
    buttonData.filter(button => button.modal).map(button => (
      <button.modal
        key={button.modalId}
        show={modalStates[button.modalId]}
        handleClose={() => handleClose(button.modalId)}
        {...button.modalProps}
      />
    ));

  const getButtonRows = () => {
    const numRows = Math.max(...buttonData.map(button => button.row));
    const buttonRows = [];
  
    for (let i = 1; i <= numRows; i++) {
      const buttonsInRow = buttonData.filter(button => button.row === i);
      buttonRows.push(buttonsInRow);
    }
    return buttonRows;
  };

  return (
    <>
      {getButtonRows().map((buttonRow, index) => (
        <div className={`my-button-container row-${index + 1}`} key={index}>
          {renderButtons(buttonRow)}
        </div>
      ))}
      {renderModals()}
    </>
  );
};

export default Buttons;