import React, { useEffect, useState } from "react";

import { RouterProvider } from "react-router-dom";

import useLocalStorage from "use-local-storage";

import "./App.css";

function App({ router }) {
  const [lightTheme, setLightTheme] = useLocalStorage("lightTheme", false);
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    const splashScreenInterval = setInterval(() => {
      console.log(router);
      const navState = router.state.navigation.state;
      if (navState === "idle") {
        setShowSplashScreen(false);
        clearInterval(splashScreenInterval);
      }
    }, 1000);

    return () => clearInterval(splashScreenInterval);
  }, []);

  return (
    <div className="app" data-light-theme={lightTheme}>
      {showSplashScreen ? (
        <h1>Loading...</h1>
      ) : (
        <RouterProvider router={router(lightTheme, setLightTheme)} />
      )}
    </div>
  );
}

export default App;
