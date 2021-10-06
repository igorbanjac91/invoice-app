import React from "react";

const Header = function() {
  return (
    <header className="main-header">
      <div className="main-header__left">
        <div className="logo-container">
          <div></div>
          <div></div>
          {/* left icon */} 
        </div>
        <div>
          {/* moon/sun icon */}
        </div> 
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