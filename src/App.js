import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // Function to handle Telegram authentication
  const handleTelegramAuth = () => {
    const botToken = '7747060551:AAEBFVtxaRSMZT37q8Y65O2fHD37kM_I7GU'; // Replace with your bot's username
    const origin = encodeURIComponent('https://ronescape.github.io'); // Replace with your domain
    const returnTo = encodeURIComponent('https://ronescape.github.io/tele-login-app'); // Replace with your redirect URL

    // Redirect to Telegram for authentication
    window.location.href = `https://oauth.telegram.org/auth?bot_id=${botToken}&origin=${origin}&embed=1&request_access=write&return_to=${returnTo}`;
  };

  // Function to parse the URL hash and extract user data
  const parseTelegramAuthData = () => {
    const hash = window.location.hash.substring(1); // Remove the '#' from the hash
    const params = new URLSearchParams(hash);

    if (params.has('id')) {
      const user = {
        id: params.get('id'),
        first_name: params.get('first_name'),
        last_name: params.get('last_name'),
        username: params.get('username'),
        photo_url: params.get('photo_url'),
        auth_date: params.get('auth_date'),
        hash: params.get('hash'),
      };

      console.log('User data:', user);
      alert(`Logged in as ${user.first_name} ${user.last_name} (${user.username})`);
    }
  };

  // Check for Telegram auth data in the URL hash when the component mounts
  useEffect(() => {
    parseTelegramAuthData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        {/* Telegram Login Button */}
        <button onClick={handleTelegramAuth} style={{ marginTop: '20px', height : '50px', width: '200px', fontSize: '20px' }}>
          Login with Telegram
        </button>
      </header>
    </div>
  );
}

export default App;