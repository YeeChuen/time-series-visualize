import { useEffect } from 'react';
import './App.css'
import AppProvider from './AppProvider'
import AppRouter from './AppRouter'

function App() {
  useEffect(() => {
    function setVH() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    // Run the function on page load and on resize
    setVH(); // Set initial value
  }, []);

  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  )
}

export default App
