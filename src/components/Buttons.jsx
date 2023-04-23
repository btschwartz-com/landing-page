import React, { useState } from 'react';


import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';
import { MovingElement } from './MovingElement.jsx';

import '../styles/App.css';



const Buttons = ({ buttonData }) => {
  const [modalStates, setModalStates] = useState({});

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
    if (button.handleClick) {
      button.handleClick();
    }
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