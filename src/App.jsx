import React from 'react';

import ParticlesBg from 'particles-bg';

import { AwesomeButton } from "react-awesome-button";
import MovingComponent from 'react-moving-text';
import 'react-awesome-button/dist/styles.css';
import './App.css';


const title = 'Hey!'
const tagline = 'Welcome to my website! Check out my stuff below.'


const styles = {
  bg: {
  },
  titleLetterStyle: {       
    display: 'inline-block',
    fontSize: '3em',
    fontFamily: 'Roboto, sans-serif',
    color: 'white',
    marginLeft: '0.02em',
    marginRight: '0.02em',
    textAlign: 'center',
  }
}

const buttonData = [
  {
    text: 'Portfolio',
    link: 'https://btschwartz.com/portfolio/',
    type: 'primary'
  },
  {
    text: 'Resume',
    link: 'https://drive.google.com/file/d/1wCPzd7fiAko-PfaizeCkd8ZChVdLK7eA/view?usp=sharing',
    type: 'secondary'
  },
  {
    text: 'Instagram Clone',
    link: 'https://btschwartz.com/insta',
    type: 'danger'
  },
  
  
]

const words = ["color", "lines", "thick", "square", "fountain"];


function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  console.log(words[randomIndex]);
  return words[randomIndex];
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
  
  return (
    <div className="button-container">
      {buttonData.map((button, index) => {
        return (
          <MovingElement element={() =>
            <AwesomeButton type={button.type} target="_blank" href={button.link}>{button.text}</AwesomeButton>}>
          </MovingElement>
        )
      })}
        
    </div>
  );
}

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


  return (
    <div className='daylight' style={styles.bg}>
      <div
        className='default'
      >
        <main className="App-main">
          <ParticlesBg type={getRandomWord()} bg={true} />
          <Title />
          <Tagline />
          <Buttons />


        </main>
      </div>
    </div>
  );
}

export default App;
