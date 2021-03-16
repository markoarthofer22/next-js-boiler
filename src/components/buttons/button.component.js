import React from 'react';
import { NavLink } from 'react-router-dom';

const Button = ({ link, children, customClass, clicked, title, isLoading, attributes }) => {
    return link ? (
        <NavLink to={`${link ? `/${link}` : ''}`}>
            <button
                title={title}
                className={`button ${customClass} ${isLoading ? 'disabled' : ''}`}
                onClick={clicked && ((e) => clicked(e))}
                disabled={isLoading}
                {...attributes}
            >
                {children} {title}
            </button>
        </NavLink>
    ) : (
        <button
            title={title}
            className={`button ${customClass} ${isLoading ? 'disabled' : ''}`}
            onClick={clicked && ((e) => clicked(e))}
            disabled={isLoading}
            {...attributes}
        >
            {children} {title}
        </button>
    );
};
export default Button;
