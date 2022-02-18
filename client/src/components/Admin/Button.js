import React from 'react';
import "../../modules/Button.css"

const Button = ({children}) => {
    return (
        <div className="btn-container">
            <h5>
                {children}
            </h5>
        </div>
    );
};

export default Button;
