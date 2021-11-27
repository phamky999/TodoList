import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../../assets/css/Header.css";
export default function Header() {
  return (
    <div className="container">
      <header>
        <div className="header-logo">
          <span>TodoList</span>
          <em>.</em>
        </div>
        <nav className="header-menu">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add-contact">Add Contact</Link>
            </li>
            <li>
              <Link to="/albums-v1">Albums</Link>
            </li>
            
          </ul>
        </nav>
      </header>
    </div>
  );
}
