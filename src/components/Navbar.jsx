import React from "react";

const Navbar = (props) => {
  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-${props.theme} bg-${props.theme}`}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#"> 
           <span className="me-2"> Weather APP </span> <i class="bi bi-wind"></i>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex">
              <button className={`btn btn-${props.theme==="light"?"dark":"light"}`} onClick={() => props.handleSwitchTheme()}>Switch to {props.theme==="light"?"Dark":"Light"} Theme</button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
