import React, { useState, useEffect } from 'react';



import { Toaster } from 'react-hot-toast';



import { MovingElement } from '../components/MovingElement.jsx';
import Buttons from '../components/Buttons.jsx';
import '../styles/App.css';
import 'react-awesome-button/dist/styles.css';
import ParticlesBg from 'particles-bg';
import { ServerInfo, FunFact, Explanation, AskChatGPT } from '../misc/Toasts.jsx'
import ChatGPTModal from '../misc/ChatGPTModal.jsx';
import { useNavigate } from 'react-router-dom';

const title = 'B)'
const tagline = 'Welcome to the VIP section! Check out some stuff below.'


const styles = {
  bg: {
  },
}

const BackHome = () => {
  window.location.href = '/';
};


const buttonData = [
  {
    text: 'What?',
    type: 'secondary',
    row: 1,
    toast: Explanation,
    className: 'gold'

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
    text: 'Return Home',
    handleClick: BackHome,
    row: 6,
    className: 'pink'

  },


]


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


const VIP = () => {


  return (
    <div className="daylight" style={styles.bg}>

      <div className="default" >
        <main className="App-main">
          <ParticlesBg type='ball' color='#000000' bg={true} num={4}
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

export default VIP;
