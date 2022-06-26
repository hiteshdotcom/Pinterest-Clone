import React, { useState } from "react";
import { Button } from "antd";
import "./menu.css";

const logo =
  "https://res.cloudinary.com/dsfb4u7kc/image/upload/v1656131442/Pinterest-Logo_djffeo.png";
function Menu({ authorised, setAuthorised }) {
  const logout = () => {
    localStorage.clear();
    setAuthorised(false);
  };
  const [buttonState, setButtonState] = useState(false);

  return (
    <nav className="menu-container navbar">
      {authorised ? (
        <>
          <div className="menu-logo">
            <a href="/">
              <img src={logo} alt="pinterest-logo" />
            </a>
          </div>
          <a
            href="#"
            class="toggle-button"
            onClick={() => setButtonState(!buttonState)}
          >
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </a>
          <div
            className={` ${
              buttonState ? "active" : ""
            } navbar-links menu-links `}
          >
            <ul>
              <li>
                <a className="hover-underline-animation" href="/saved-pins">
                  Saved Pins
                </a>
              </li>
              <li>
                <a className="hover-underline-animation" href="/my-pins">
                  My Pins
                </a>
              </li>
              <li>
                <a href="/create">Create</a>
              </li>
              <li>
                <a href="/" onClick={logout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
          {/* <div className="menu-links">
            <a className="hover-underline-animation" href="/saved-pins">
              Saved Pins
            </a>
            <a className="hover-underline-animation" href="/my-pins">
              My Pins
            </a>
            <div className="menu-profile">
              <a href="/create">
                <Button type="danger">Create</Button>
              </a>
            </div>
            <div className="menu-logout">
              <a href="/">
                <Button type="danger" onClick={logout}>
                  Logout
                </Button>
              </a>
            </div>
          </div> */}
        </>
      ) : (
        <>
          <div className="menu-btn-container">
            <div className="navbar-links menu-links">
              <ul>
                <li>
                  <a href="/">Sign Up</a>
                </li>
                <li>
                  <a href="/signin">Sign In</a>
                </li>
              </ul>

            </div>
          </div>
        </>
      )}
    </nav>
  );
}

export default Menu;
