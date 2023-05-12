import React, { useState, useEffect } from 'react';



import { Toaster } from 'react-hot-toast';



import { MovingElement } from '../components/MovingElement.jsx';
import Buttons from '../components/Buttons.jsx';
import '../styles/App.css';
import 'react-awesome-button/dist/styles.css';
import ParticlesBg from 'particles-bg';
import { Explanation } from '../misc/Toasts.jsx'
import Loader from '../misc/Preloader.jsx';
import { useContext } from 'react';
import AnimationContext from '../misc/AnimationContext.jsx';
import { useLocation } from 'react-router-dom';
import ContactModal from '../misc/ContactModal.jsx';


const title = 'Hey!'
const tagline = 'Welcome to my website! Check out some stuff below.'


const styles = {
  bg: {
  },
}

function getRandomType() {
  const types = [
    { 'type': 'circle', 'num': 4 },
    // { 'type': 'square', 'num': 6 },
    { 'type': 'thick', 'num': 40 },
  ]
  const randomIndex = Math.floor(Math.random() * types.length);
  return types[randomIndex];
}







const Title = () => {
  return (
    <div className="my-container">
      <MovingElement type='zoomIn' element={() => 
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
      <MovingElement type='zoomIn' element={() =>
        <div className="tagline">
          {tagline}
        </div>}>
      </MovingElement>
      <MovingElement type='zoomIn' element={() =>
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
      text: 'More',
      row: 3,
      className: 'gray',
      navLink: '/more',
      link: '/more'

    },
    
    {
      text: 'Contact',
      row: 3,
      className: 'red',
      modal: ContactModal,
      modalId: 'contact',
      modalProps: {
      },
    }
  ]

  const { type, num } = getRandomType();

  const [isLoading, setIsLoading] = useState(true);

  const { hasAnimated, setHasAnimated } = useContext(AnimationContext);

  const location = useLocation();


  const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    if (allLinks.length > 0) {
      allLinks.forEach(link => {
        if (link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  };


  useEffect(() => {
    if (isLoading) {
      return;
    }
    handleExternalLinks();
  }, [isLoading, location]);

  return (
    <>
    {isLoading && !hasAnimated ? (
      <Loader finishLoading={() => { setIsLoading(false); setHasAnimated(true); }} />
    ) : (
    
      <div className="daylight" style={styles.bg}>

        <div className="default" >
          <main className="App-main">
            
            <Title />
            <Tagline />
            <Buttons buttonData={buttonData} effect="zoomIn"/>
            <Toaster />
            <ParticlesBg type={type} bg={true} num={num} 
            styles={{backgroundColor: 'black'}}
            />
          </main>

        </div>
        
      </div>
    )}
    </>
  );
};

export default Home;
