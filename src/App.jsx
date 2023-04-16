import React from 'react';

import ParticlesBg from 'particles-bg';

import { Toaster } from 'react-hot-toast';



import { MovingElement } from './components/MovingElement.jsx';
import Buttons from './components/Buttons.jsx';
import './App.css';
import 'react-awesome-button/dist/styles.css';


const title = 'Hey!'
const tagline = 'Welcome to my website! Check out some stuff below.'


const styles = {
  bg: {
  },
}



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
          <Buttons />
          <Toaster />
          
        </main>

      </div>
      
    </div>
  );
};

export default App;
