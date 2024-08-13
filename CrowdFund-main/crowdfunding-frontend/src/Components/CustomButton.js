// CustomButton.js
import React from 'react';
import { Button } from 'react-bootstrap';
import '../Stylings/CustomButton.css'; // Ensure this is correctly imported

const CustomButton = (props) => {
    return (
        <Button
            className={`custom-button ${props.className || ''}`}
            type={props.type}
            onClick={props.onClick}
            {...props} // Spread other props to ensure they are passed down
        >
            {props.children}
        </Button>
    );
};

export default CustomButton;
