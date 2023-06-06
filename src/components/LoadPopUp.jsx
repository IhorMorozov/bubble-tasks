import { useGoogleLogin } from '@react-oauth/google';
import { useEffect } from 'react';
import '../input.css';
import { gapiLoad, onSucessCallback } from '../modules/google';
import { fetchUserProfile } from '../modules/tasks';

const SCOPE = 'https://www.googleapis.com/auth/tasks';

const LoadPopUp = (props) => {

  useEffect(() => {
    gapiLoad();
  }, [])

  const auth = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
      onSucessCallback(tokenResponse);
      props.setUser(await fetchUserProfile());
      console.log("profile: " + JSON.stringify(fetchUserProfile()));
      document.getElementById("loadPopUp").style.display = "none";
    },
		onError: err => console.log(err),
		scope: SCOPE
	});

  return (
    <div className="hero min-h-screen" style={{ backgroundImage: `url("https://cdn.osxdaily.com/wp-content/uploads/2020/10/macos-big-sur-wallpaper-1-scaled.jpg")` }}>
      <div className="hero-overlay bg-opacity-10"></div>
      <div className="hero-content text-center text-neutral-content">
        {!props.isUserAuthorized &&
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello, World!</h1>
            <p className="mb-5">BubbleTasks - The most beautiful and interactive visualizer for Google Tasks.</p>
            <button className="btn btn-neutral" onClick={() => auth()}>Sign In With Google</button>
          </div>
        }
      </div>
    </div>
  );

}

export default LoadPopUp;
