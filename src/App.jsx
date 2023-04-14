import React, { useState, useEffect } from 'react';
import './App.css';
import Configs from './configurations.json';
import ParticlesBg from 'particles-bg';

import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';

const Buttons = () => {
  return (
    <>
    <AwesomeButton 
      type="primary" 
      href="https://btschwartz.com/portfolio/" 
    >
      Portfolio
    </AwesomeButton>
    </>
  );
}

const App = () => {
  const [state, setState] = useState({
    darkBackgroundModes: [
      'day',
      'terminal',
      'torquoise',
      'alizarin',
      'amythyst',
      'carrot',
      'peterriver'
    ],
    lightBackgroundModes: [
      'night',
      'lightred',
      'lightpurple',
      'lightgreen',
      'lightblue',
      'lightyellow'
    ],
    backgroundType: Configs.backgroundType || 'plain',
    appClass: Configs.plainBackgroundMode || 'daylight',
    devIntro: Configs.devIntro || 'Lorem Ipsum',
    devDesc:
      Configs.devDesc ||
      'Aute veniam ut deserunt cillum irure pariatur Lorem dolore anim nostrud quis veniam elit culpa.',
    backgroundMode: 'default',
    backgroundIndex: 0,
    bgStyle: {},
    icons: Configs.icons || []
  });

  useEffect(() => {
    // Add any side effects here
  }, []);

  const {
    appClass, bgStyle, backgroundMode, devIntro, devDesc, icons
  } = state;

  return (
    <div className={appClass} style={bgStyle}>
      <div
        className={backgroundMode}
      >
        <main className="App-main">
          <ParticlesBg type="thick" bg={true} />
          <div className="container">
            <h1 className="intro">{devIntro}</h1>
            <Buttons />
            <div className="tagline">
            </div>
            
            {/* <div className="icons-social">
              {icons.map((icon, i) => (
                <a
                  target="_blank"
                  key={i}
                  rel="noopener noreferrer"
                  href={`${icon.url}`}
                >
                  <i className={`fab ${icon.image}`} />
                </a>
              ))}
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
