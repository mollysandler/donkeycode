import React, { useState } from 'react';
import './SubNavbar.css';

const SubNavbar = ({ onSelect }) => {
    const [active, setActive] = useState('');
    const [showTimeOptions, setShowTimeOptions] = useState(false);
    const [selectedTime, setSelectedTime] = useState('');

    const handleClick = (item) => {
        setActive(item);
        if (item === 'Time') {
            setShowTimeOptions(!showTimeOptions);
        } else {
            setShowTimeOptions(false);
            setSelectedTime('');  // Reset time selection if another item is selected
        }
        onSelect(item);  // Notify App.js of the selected item
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
        setActive('Time');  // Keep "Time" as the active item
        // Optionally, pass the selected time to the parent component
        onSelect('Time-' + time);  // Example to pass the selected time as 'Time-15s', 'Time-30s', etc.
    };

    return (
        <nav className="navbar">
            <ul className="nav-list">
                {['Time', 'Words', 'Usages', 'Algorithms'].map((item) => (
                    <li
                        key={item}
                        className={`nav-item ${active === item ? 'active' : ''}`}
                        onClick={() => handleClick(item)}
                    >
                        {item}
                        {item === 'Time' && showTimeOptions && (
                            <ul className="dropdown">
                                {['15s', '30s', '1m'].map((time) => (
                                    <li
                                        key={time}
                                        className={`dropdown-item ${selectedTime === time ? 'active' : ''}`}
                                        onClick={() => handleTimeSelect(time)}
                                    >
                                        {time}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default SubNavbar;
