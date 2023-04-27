import React, { useState, useEffect } from 'react';



import { Toaster } from 'react-hot-toast';



import { MovingElement } from '../components/MovingElement.jsx';
import Buttons from '../components/Buttons.jsx';
import '../styles/App.css';
import 'react-awesome-button/dist/styles.css';
import ParticlesBg from 'particles-bg';
import { Explanation, TestToast } from '../misc/Toasts.jsx'
import LoginModal from '../misc/LoginModal.jsx';

const title = 'Hey!'
const tagline = 'Welcome to my website! Check out some stuff below.'


const styles = {
  bg: {
  },
}

function getRandomType() {
  const types = [
    { 'type': 'circle', 'num': 4 },
    { 'type': 'square', 'num': 6 },
    { 'type': 'thick', 'num': 40 },
  ]
  const randomIndex = Math.floor(Math.random() * types.length);
  return types[randomIndex];
}

const handleSuccess = () => {
  window.location.href = '/vip';
};


  



const Title = () => {
  return (
    <div className="my-container">
      <MovingElement type='fadeIn' element={() => 
        <h1 className='intro'>{title}</h1>}>
      </MovingElement>      
    </div>
  );
}


const Tagline = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000); // Update every 1000ms (1 second)

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="my-container">
      <MovingElement type='fadeIn' element={() =>
        <div className="tagline">
          {tagline}
        </div>}>
      </MovingElement>
      <MovingElement type='fadeIn' element={() =>
        <div className="tagline-small">
          {currentTime}
        </div>}>
      </MovingElement>
    </div>
  );
};


const Home = () => {


  const buttonData = [
    {
      text: 'What?',
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
      text: 'Test Toast',
      row: 6,
      toast: TestToast,
      className: 'gray'
    },
    {
      text: 'VIP',
      row: 6,
      modalId: 'vip',
      modal: LoginModal,
      modalProps: { 
        onSuccess: () => handleSuccess(),
        // onSubmit: (username, password) => onLoginAttempt(username, password),
      },
      className: 'pink'
    },
  ]

  const { type, num } = getRandomType();

  return (
    <div className="daylight" style={styles.bg}>

      <div className="default" >
        <main className="App-main">
          <ParticlesBg type={type} bg={true} num={num} 
          styles={{backgroundColor: 'black'}}
          />
          <Title />
          <Tagline />
          <Buttons buttonData={buttonData}/>
          <Toaster />
          
        </main>

      </div>
      
    </div>
  );
};

export default Home;
