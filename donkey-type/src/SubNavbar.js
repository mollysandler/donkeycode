import React, { useState } from 'react';
import './SubNavbar.css';

const SubNavbar = () => {
    const [active, setActive] = useState('');

    const handleClick = (item) => {
        setActive(item);
    };

    return (
        <nav className="navbar">
            <ul className="nav-list">
                {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                    <li
                        key={item}
                        className={`nav-item ${active === item ? 'active' : ''}`}
                        onClick={() => handleClick(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default SubNavbar;
