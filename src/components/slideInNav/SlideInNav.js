import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
// import Navigation from '../navigation/navigation.component';
// import FlagDropdown from '../flagDropdown/FlagDropdown';
import './slideinnav.scss';

const SlideInNav = ({ isOpen, handleClose, children }) => {
    useEffect(() => {
        document.addEventListener('keydown', handleClose);
        return () => {
            document.removeEventListener('keydown', handleClose);
        };
    }, [handleClose]);

    useEffect(() => {
        if (isOpen) {
            document.querySelector('body').classList.add('no-scroll');
        } else {
            document.querySelector('body').classList.remove('no-scroll');
        }

        return () => {
            document.querySelector('body').classList.remove('no-scroll');
        };
    }, [isOpen]);

    return (
        <CSSTransition in={isOpen} classNames="slide-in-nav" timeout={500} unmountOnExit>
            <div onClick={handleClose} className="slide-in-nav">
                <nav>
                    {/* <FlagDropdown /> */}
                    {/* <Navigation /> */}
                    {children}
                </nav>
            </div>
        </CSSTransition>
    );
};

export default SlideInNav;
