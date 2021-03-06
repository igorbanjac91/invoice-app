import React, { useState } from "react";
import { IconMoon, IconSun, Logo } from "./Icons";

const Header = function() {

  const [ mode, setMode ] = useState("light");

  function toggleMode() {
    let container = document.querySelector(".container");
    if (mode === "light") {
      setMode("dark");
      container.classList.add("dark");
    } else {
      setMode("light");
      container.classList.remove("dark");
    }
  }

  return (
    <header className="main-header">
      <div className="main-header__left">
        <div className="logo-container">
          <div></div>
          <div></div>
          <Logo />
        </div>
        <button className="btn-mode"
                onClick={toggleMode}
        >
        { mode === "light"
          ? <IconMoon />
          : <IconSun />
        }
          
        </button>
      </div>
      <div className="main-header__right">
        <div className="user-image-container">
          <img src="/images/image-avatar.jpg" alt="user-image" />
        </div>
      </div>
    </header>
  )
}

export default Header;