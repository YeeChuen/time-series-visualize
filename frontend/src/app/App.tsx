import { useEffect } from 'react';
import './App.css';
import AppProvider from './AppProvider';
import AppRouter from './AppRouter';
import { getRunProjects } from '../lib/api/runProjectApi';

function App() {
  useEffect(() => {
    function setVH() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    // Run the function on page load and on resize
    setVH(); // Set initial value

    // call to connect with webservice and database
    
    const fetchRunProjects = async () => {
      const data = await getRunProjects();
      if (data.statusCode === 200) {
        console.log("Connected to webservices and database.")
      } else {
        console.error("Request failed:");
        console.error(data.message ? data.message : "Undefined error.");
      }
    };
    fetchRunProjects();
  }, []);

  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  )
}

export default App
