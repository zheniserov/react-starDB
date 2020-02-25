import React from 'react';

import './header.css';

const Header = () => {
    return (

        <div className="header">
            <h1>Star DB</h1>
            <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="nav-item"><a href="#">People</a></li>
                    <li className="nav-item"><a href="#">Planets</a></li>
                    <li className="nav-item"><a href="#">Starships</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;