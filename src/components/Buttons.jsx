import React, { useState } from 'react';


import { AwesomeButton } from "react-awesome-button";
import toast from 'react-hot-toast';
import 'react-awesome-button/dist/styles.css';
import { MovingElement } from './MovingElement.jsx';

// import MyModal from './Modal.jsx';
import '../App.css';


const styles = {
    toast1: {
        minWidth: "250px",
        fontSize: "20px",
        backgroundColor: "#de6191",
        color: "#fdffe5",
        fontFamily: "Roboto, sans-serif",
        whiteSpace: "pre-wrap",
        width: "auto",
    },
    toast2: {
        minWidth: "250px",
        fontSize: "20px",
        backgroundColor: "#19c37d",
        color: "#fdffe5",
        fontFamily: "Roboto, sans-serif",
        whiteSpace: "pre-wrap",
        width: "auto",
    },
    toast3: {
      minWidth: "250px",
      fontSize: "20px",
      backgroundColor: "#fffc6c",
      color: "#6c6a00",
      fontFamily: "Roboto, sans-serif",
      whiteSpace: "pre-wrap",
      width: "auto",
    },
}


const API_URL = 'https://btschwartz.com/api/v1/';
const explanation = "My name is Ben Schwartz, and you just found the landing page of my website. Please check out my portfolio, it's the only decent thing you'll find here.";








const ServerInfo = () => {

    const fetchData = () => {
        return fetch(API_URL + 'server')
            .then(response => response.json())
            .then(data => {
            const respData = {
                currentTime: data.current_time,
                joke: data.joke,
                os: data.system_info.os,
                machine: data.system_info.machine,
                processor: data.system_info.processor,
                pythonVersion: data.system_info.python_version,
                nodeName: data.system_info.node_name,
                clientIP: data.client_ip
            }
            return respData;
            })
            .catch(error => console.error(error));
    };

    const myPromise = fetchData();
    return (
        toast.promise(
            myPromise, 
            {
                loading: 'Loading',
                success: (respData) => {
                const currentTime = respData.currentTime;
                const { os, machine, processor, pythonVersion, nodeName, clientIP } = respData;
                return (
                    "Server:\n\n" +
                    "Hello, my name is " + nodeName + ". " +
                    'My operating system is ' + os + " " +
                    "and I'm running on a " + machine + " machine " +
                    "with a " + processor + " processor. " +
                    "I am currently running uWSGI and Flask with Python " + pythonVersion + "." +
                    "\n\n" +
                    "I live in New York, but I think it is " + currentTime + "\n\n" +
                    "I don't know where you live, but your IP address is: " + clientIP
                )
                },
                error: 'Error when fetching',
            },
            {
                style: styles.toast1,
                success: { duration: 5000 },
                reverseOrder: false,
                position: 'bottom-right',
            }

        )
    );
}


const Joke = () => {

      const fetchData = () => {
        return fetch(API_URL + 'chat/joke')
            .then(response => response.json())
            .then(data => {
            const respData = {
                joke: data.content
            }
            return respData;
            })
            .catch(error => console.error(error));
    };

  
    const myPromise = fetchData();
    return (
        toast.promise(
            myPromise, 
            {
                loading: 'Loading',
                success: (respData) => {
                const joke = respData.joke;
                return (
                    "ChatGPT:\n\n" + joke
                )
                },
                error: 'Error when fetching',
            },
            {
                style: styles.toast2,
                success: { duration: 5000 },
                reverseOrder: false,
                position: 'top-right',
                
            }

        )
    );
}


const FunFact = () => {

    const fetchData = () => {
      return fetch(API_URL + 'funfact')
          .then(response => response.json())
          .then(data => {
          const respData = {
              funfact: data.content
          }
          return respData;
          })
          .catch(error => console.error(error));
  };


  const myPromise = fetchData();
  return (
      toast.promise(
          myPromise, 
          {
              loading: 'Loading',
              success: (respData) => {
                const fun_fact = respData.funfact;
                return (
                    fun_fact
                )
              },
              error: 'Error when fetching',
          },
          {
              style: styles.toast3,
              success: { duration: 5000 },
              reverseOrder: false,
              position: 'top-right',
              
          }

      )
  );
}

// const Cole = () => toast.error("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
const Explanation = () => toast(explanation, {
  style: {
    minWidth: '250px',
    fontSize: "20px",
    backgroundColor: "#6678c5",
    color: "#fdffe5",
    fontFamily: "Roboto, sans-serif",
  },
  duration: 4000,
  reverseOrder: true,
  position: 'top-left',
});

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
    row: 3,
    className: 'gray'
  },
  {
    text: 'Server',
    row: 4,
    toast: ServerInfo,
    className: 'gray'
  },
  {
    text: 'ChatGPT',
    row: 4,
    toast: Joke,
    className: 'green'
  },
  {
    text: 'Fun Fact',
    row: 4,
    toast: FunFact,
    className: 'gray'
  },
  {
    text: 'Test',
    row: 5,
    modal: {
      url: 'https://btschwartz.com/ap1/v1/chat',
    },
    className: 'gray'
  },
  

  
  
]


const Buttons = () => {

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const numRows = Math.max(...buttonData.map(button => button.row));
    const buttonRows = [];
  
    for (let i = 1; i <= numRows; i++) {
      const buttonsInRow = buttonData.filter(button => button.row === i);
      buttonRows.push(buttonsInRow);
    }

    const handlePress = (button) => {
      if (button.toast) {
        button.toast();
      }
      if (button.modal) {
        handleShow();
      }
    }

  
    return (
      
      <>
        {buttonRows.map((buttonRow, index) => (
          <div className={`my-button-container row-${index+1}`} key={index}>
            {buttonRow.map((button, buttonIndex) => (
              <MovingElement key={buttonIndex} element={() =>
                <>
                {console.log(button.colors)}
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
            ))}
          </div>
        ))}
        {/* <MyModal show={show} handleClose={handleClose} /> */}
      </>
    );
  };

export default Buttons;
