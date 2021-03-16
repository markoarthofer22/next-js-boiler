import React, { useState, useEffect, useRef } from 'react';
import SvgIcon from '../svg-icon/svg-icon.component';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentLanguage } from '../../redux/globals/globals.actions';
import { languageSlugs } from '../../redux/globals/globals.selectors';
import { window, document } from 'ssr-window';

//style
import './flagdropdown.scss';

const FlagDropdown = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { activeLang, languages, type } = props;
    const mainDiv = useRef();
    const allPageSlugs = useSelector(languageSlugs);

    useEffect(() => {
        function handleClickOutside(e) {
            if (mainDiv.current.contains(e.target)) {
                // inside click
                return;
            }
            // outside click
            setIsOpen(false);
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div ref={mainDiv} className={`flagdrop ${type ? type : ''}`}>
            <div className={`flagdrop-active ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                <span>{activeLang}</span>
                <SvgIcon icon="icon-angle-down" />
            </div>
            {languages && (
                <ul className={`flagdrop-list ${isOpen ? 'flagdrop-list-open' : ''}`}>
                    {languages.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className="flagdrop-item"
                                onClick={(e) => {
                                    window.location = `${allPageSlugs?.[item.language_code]}`;
                                    dispatch(setCurrentLanguage(item.language_code));
                                    setIsOpen(false);
                                }}
                            >
                                <span>
                                    <img src={`/assets/flags/${item.language_code}.png`} alt={item.language_code} />
                                    <span>{item.native_name}</span>
                                </span>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default FlagDropdown;
