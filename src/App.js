import './App.css';
import Mainarea from './components/Mainarea';
import Navbar from './components/Navbar';
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState("light");

  if (theme === "light") {
    document.body.style.background = "#fff";
  } else {
    document.body.style.background = "#1c1c1c";
  }

  const handleSwitchTheme = () => {
      if (theme === "light") {
        setTheme("dark");
    } else {
      setTheme("light");
    }
  }
  return (
    <>
    <Navbar theme = {theme} handleSwitchTheme={handleSwitchTheme} />
    <Mainarea theme = {theme} />
    </>
  );
}

export default App;
