import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const handleTgLogin = () => {
    const telegram = window.Telegram;
    if (telegram && telegram.Login) {
      telegram.Login.auth(
        { bot_id: '7747060551:AAEBFVtxaRSMZT37q8Y65O2fHD37kM_I7GU' },
        async (authData) => {
          console.log('authData:', authData);

          // Send the auth data back to the parent window
          window.parent.postMessage(
            { type: 'LOGIN_SUCCESS', payload: authData },
            '*' // Allow any origin (replace with your parent app's origin for security)
          );
        }
      );
    } else {
      console.error('Telegram API not loaded yet.');
    }
  };

  useEffect(() => {
    // Dynamically load the Telegram widget script
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.onload = () => {
      console.log('Telegram widget script loaded.');
      handleTgLogin(); // Call handleTgLogin after the script loads
    };
    script.onerror = (error) => {
      console.error('Failed to load Telegram widget script:', error);
    };

    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div id="telegram-login"></div>
      </header>
    </div>
  );
}

export default App;