import React from "react";
import { IconMoon, Logo } from "./Icons";

const Header = function() {
  return (
    <header className="main-header">
      <div className="main-header__left">
        <div className="logo-container">
          <div></div>
          <div></div>
          <Logo />
        </div>
        < IconMoon />
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