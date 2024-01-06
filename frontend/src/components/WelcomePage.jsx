import React from 'react';
import './WelcomePage.css';

const WelcomePage = () => {
  return (
    <div className='welcome-container'>
    <div className="welcome">
      <span id="splash-overlay" className="splash"></span>
      <span id="welcome" className="z-depth-4"></span>

      <header className="navbar-fixed">
        <nav className="row deep-purple darken-3">
          <div className="col s12">
            <ul className="right">
              <li className="right">
                <a href="" target="_blank" className="fa fa-facebook-square fa-2x waves-effect waves-light"></a>
              </li>
              <li className="right">
                <a href="" target="_blank" className="fa fa-github-square fa-2x waves-effect waves-light"></a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="valign-wrapper">
        <span className="container grey-text text-lighten-1">
          <p className="flow-text">Welcome to</p>
          <h1 className="title grey-text text-lighten-3">jason's classroom</h1>
          <blockquote className="flow-text">A place to study for your High School Equivalency Diploma</blockquote>
        </span>
      </main>

      <div className="fixed-action-btn">
        <a href="#message" className="modal-trigger btn btn-large btn-floating amber waves-effect waves-light">
          <i className="large material-icons">message</i>
        </a>
      </div>

      <div id="message" className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4>Contact</h4>
          <p>coming soon...</p>
        </div>
        <div className="modal-footer">
          <a href="" className="modal-action modal-close waves-effect btn-flat">close</a>
        </div> 
      </div> 

      <footer className="page-footer deep-purple darken-3">
        <div className="footer-copyright deep-purple darken-4">
          <div className="container">
            <time>&copy; 2016 Jason</time>
          </div>
        </div>
      </footer>
    </div>
    </div>
  );
};

export default WelcomePage;
