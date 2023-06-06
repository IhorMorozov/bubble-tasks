import { useState } from 'react';

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import BubbleArena from "./components/BubbleArena";
import LoadPopUp from "./components/LoadPopUp";
import { GoogleOAuthProvider } from '@react-oauth/google';
import './input.css';

const CLIENT_ID = '629948942017-22phl42prde52475ma4gmiu1fofkriu1.apps.googleusercontent.com';

const App = () => {
  const [user, setUser] = useState(null);
  const isUserAuthorized = user !== null;
  console.log("user: " + JSON.stringify(user));

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="App">
        <NavBar user={user} />
        <div className="flex flex-col items-center justify-center w-screen h-screen absolute" id="popupContainer">
          <LoadPopUp
            setUser={setUser}
            isUserAuthorized={isUserAuthorized}
          />
        </div>
        {isUserAuthorized &&
          <BubbleArena />
        }
        <Footer />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
