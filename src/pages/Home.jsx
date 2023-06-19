import React, { useState, useEffect } from 'react';



import { Toaster } from 'react-hot-toast';


import { AwesomeButton } from "react-awesome-button";
import { MovingElement } from '../components/MovingElement.jsx';
import Buttons from '../components/Buttons.jsx';
import '../styles/App.css';
import 'react-awesome-button/dist/styles.css';
import ParticlesBg from 'particles-bg';
import { Explanation } from '../misc/Toasts.jsx'
import Loader from '../misc/Preloader.jsx';
import { useContext } from 'react';
import AnimationContext from '../misc/AnimationContext.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
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

const Countdown = ({ onEnd, onCancel }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown < 1) {
      return;
    }
    
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000); // Update every 1 second

    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0) {
      onEnd();
    }
  }, [countdown, onEnd]);

  return (
    <>
    <div className="my-container">
      <MovingElement key={countdown} type='zoomIn' element={() =>
        <div className='intro'>
          {countdown > 0 ? countdown : 0}
        </div>
      }/>
    </div>
    <div className='my-container'>
      <MovingElement type='zoomIn' element={() =>
          <div className="tagline">
            Redirecting to my portfolio...
          </div>}>
        </MovingElement>
    </div>
    <div className='my-container'>
      <MovingElement type='slideInFromTop' element={() =>

        <AwesomeButton
            type='primary'
            className={`aws-btn purple`}
            onPress={onCancel}
        >
          Stop!
        </AwesomeButton>
      }/>
    </div>
    </>
  );
};




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

const { type, num } = getRandomType();


const Home = () => {
  

  const [isLoading, setIsLoading] = useState(true);
  const [cancel, setCancel] = useState(false);

  const { hasAnimated, setHasAnimated } = useContext(AnimationContext);

  const location = useLocation();

  const navigate = useNavigate();


  useEffect(() => {
    if (isLoading) {
      return;
    }
    handleExternalLinks();
  }, [isLoading, location]);



  const redirectToPortfolio = () => {
    window.location.href = "https://btschwartz.com/portfolio/";
    // navigate('/portfolio')
  }

  const cancelCountdown = () => {
    setCancel(true);
  };

  const finishLoading = () => {
    setIsLoading(false);
    setHasAnimated(true);
  };

  return (
    <>
      {isLoading && !hasAnimated ? (
        <Loader finishLoading={finishLoading} />
      ) : (
        <>
        <ParticlesBg type={type} bg={true} num={num} styles={{ backgroundColor: 'black' }} />
          <div className="daylight" style={styles.bg}>
            <div className="default">
              <main className="App-main">
                {cancel ? (
                <>
                <Title />
                <Tagline />
                <Buttons buttonData={buttonData} effect="zoomIn" />
                <Toaster />
                </>
                ) : (
                  <>
                    <Countdown onEnd={redirectToPortfolio} onCancel={cancelCountdown} />
                  </>
                )}
              </main>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
