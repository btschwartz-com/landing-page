import React from 'react';

import ParticlesBg from 'particles-bg';

import { AwesomeButton } from "react-awesome-button";
import MovingComponent from 'react-moving-text';
import toast, { Toaster } from 'react-hot-toast';
import 'react-awesome-button/dist/styles.css';
import './App.css';


const title = 'Hey!'
const tagline = 'Welcome to my website! Check out some stuff below.'


const styles = {
  bg: {
  },
}

// const API_URL = 'https://jservice.io/api/random';
const API_URL = 'https://btschwartz.com/api/joke';

const fetchData = () => {
  return fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      // const respData = {
      //   question: data[0].question,
      //   answer: data[0].answer,
      // }
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




const Cole = () => {
  
  const myPromise = fetchData();
  return (
    toast.promise(
      myPromise, 
      {
        loading: 'Loading',
        success: (respData) => {
          const joke = respData.joke;
          const currentTime = respData.currentTime;
          const { os, machine, processor, pythonVersion, nodeName, clientIP } = respData;
          return (
            "It's me, the server!\n\n" +
            "My name is " + nodeName + ". " +
            'My operating system is ' + os + " " +
            "and I'm running on a " + machine + " machine " +
            "with a " + processor + " processor. " +
            "I am currently running flask on Python " + pythonVersion + "." +
            "\n\n" +
            "Your IP address is: " + clientIP + "\n\n" +
            "I live in New York, but to me the time is: " + currentTime + "\n\n" +
            "Here's a joke: " + joke
          )
        },
              

        
        error: 'Error when fetching',
      },
      {
        style: {
          minWidth: "250px",
          fontSize: "20px",
          backgroundColor: "#de6191",
          color: "#fdffe5",
          fontFamily: "Roboto, sans-serif",
          whiteSpace: "pre-wrap",
          width: "auto",
        },
        success: {
          duration: 5000,
        },
        reverseOrder: false,
        position: 'bottom-right',
      }

    )
  );
}
  
  
const explanation = "My name is Ben Schwartz, and you just found the landing page of my website. Please check out my portfolio, it's the only decent thing you'll find here.";
  
// const Cole = () => toast.error("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
const Explanation = () => toast(explanation, {
  style: {
    minWidth: '250px',
    fontSize: "20px",
    backgroundColor: "#6678c5",
    color: "#fdffe5",
    fontFamily: "Roboto, sans-serif",
  },
  duration: 3000,
  reverseOrder: true,
  position: 'top-left',
});

const buttonData = [
  {
    text: 'What?',
    type: 'secondary',
    row: 1,
    toast: Explanation,
    position: 'top-left',

  },
  {
    text: 'Portfolio',
    link: 'https://btschwartz.com/portfolio/',
    type: 'primary',
    row: 2,

  },
  {
    text: 'Resume',
    link: 'https://drive.google.com/file/d/1wCPzd7fiAko-PfaizeCkd8ZChVdLK7eA/view?usp=sharing',
    type: 'secondary',
    row: 2,
  },
  {
    text: 'Instagram Clone',
    link: 'https://btschwartz.com/insta',
    type: 'secondary',
    row: 3,
  },
  {
    text: 'Server',
    type: 'danger',
    row: 4,
    toast: Cole,
    position: 'top-right',
  },
  
  
]


const types = [
  {
    'type': 'circle',
    'num': 4
  },
  {
    'type': 'square',
    'num': 6
  },
  {
    'type': 'thick',
    'num': 40
  },
]



function getRandomType() {
  const randomIndex = Math.floor(Math.random() * types.length);
  return types[randomIndex];
}

const MovingElement = ({ element: Element, ...props }) => {
  return (
    <MovingComponent
      type="unfold"
      duration="1000ms"
      delay="0s"
      direction="alternate"
      timing="ease"
      iteration="1"
      fillMode="none"
      {...props}
    >
      <Element />
    </MovingComponent>
  );
};



const Buttons = () => {

  const numRows = Math.max(...buttonData.map(button => button.row));
  const buttonRows = [];

  for (let i = 1; i <= numRows; i++) {
    const buttonsInRow = buttonData.filter(button => button.row === i);
    buttonRows.push(buttonsInRow);
  }

  return (
    <>
      {buttonRows.map((buttonRow, index) => (
        <div className={`button-container row-${index+1}`} key={index}>
          {buttonRow.map((button, buttonIndex) => (
            <MovingElement key={buttonIndex} element={() =>
              <>
              <AwesomeButton
                type={button.type}
                target="_blank"
                href={button.link}
                onPress={() => {
                  if (button.toast) {
                    button.toast();
                  }
                }}
              >
                {button.text}
              </AwesomeButton>
              </>
            }>
            </MovingElement>
          ))}
        </div>
      ))}
    </>
  );
};



const Title = () => {
  return (
    <div className="container">
      <MovingElement type='fadeIn' element={() => 
        <h1 className='intro'>{title}</h1>}>
      </MovingElement>      
    </div>
  );
}



const Tagline = () => {
  return (
    <div className="container">
      <MovingElement type='fadeIn' element={() => 
        <div className="tagline">
          {tagline}
        </div>}>
      </MovingElement> 
    </div>
  );
}


const App = () => {
  const { type, num } = getRandomType();

  return (
    <div className="daylight" style={styles.bg}>
      <div className="default">
        <main className="App-main">
          <ParticlesBg type={type} bg={true} num={num} />
          <Title />
          <Tagline />
          <Buttons buttons={buttonData}/>
          <Toaster />
        </main>
      </div>
    </div>
  );
};

export default App;
