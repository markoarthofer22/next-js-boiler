import React, { useState, useEffect, useRef } from 'react';
import _ from 'underscore';
import SvgIcon from '../svg-icon/svg-icon.component';
import './select.scss';

const Select = ({ title, returnedValue, isDisabled, data, selectClass, searchID, placeholder, label, returnValue, isSearchable, trackBy }) => {
    const [isOpen, setOpen] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState('');
    const [selectData, setSelectData] = useState(data);
    const searchInput = useRef();
    const mainInput = useRef();

    useEffect(() => {
        setSelectedTitle(title);
    }, [title]);

    useEffect(() => {
        /* if (isOpen) {
            searchInput.current.focus();
        } */

        function handleClickOutside(e) {
            if (mainInput.current.contains(e.target)) {
                // inside click
                return;
            }
            // outside click
            setOpen(false);
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

    const toggleDropdown = (e) => {
        setOpen(!isOpen);
    };

    useEffect(() => {
        if (_.isEmpty(returnedValue) && returnedValue !== undefined) {
            setSelectedTitle('');
        }
    }, [returnedValue]);

    const selectItem = (e, item) => {
        e.stopPropagation();
        setOpen(false);
        setSelectedTitle(item[trackBy]);
        returnValue(item);
    };

    const clearItem = (e) => {
        e.stopPropagation();
        setOpen(false);
        setSelectedTitle(title);
        returnValue({});
    };

    const searchTroughSelectData = (e) => {
        if (e.target.value.length !== 0) {
            let res = data.filter((item) => new RegExp(e.target.value, 'i').test(item.country));
            setSelectData(res);
        } else {
            setSelectData(data);
        }
    };

    return (
        <div
            className={`select ${selectedTitle ? 'selected' : ''} ${isOpen ? 'open' : ''} ${selectClass} ${isDisabled ? 'disabled' : ''}`}
            ref={mainInput}
        >
            <label className="select-label">{label}</label>
            <div
                className={`select-header ${isOpen ? 'open' : ''} `}
                onClick={() => {
                    toggleDropdown();
                }}
            >
                {selectedTitle ? (
                    <div className="selected-item-title">{selectedTitle ? selectedTitle : ''}</div>
                ) : (
                    <div className="placeholder">{placeholder ? placeholder : ''}</div>
                )}

                <SvgIcon iconclass={` ${isOpen ? 'open' : ''} `} icon="drop-arrow" />
            </div>
            <div className={`select-list ${isOpen ? 'open' : ''}`}>
                {isSearchable && (
                    <input
                        ref={searchInput}
                        type="text"
                        autoComplete="off"
                        name="search-select"
                        id={searchID}
                        className="search-select"
                        onChange={(e) => searchTroughSelectData(e)}
                    />
                )}
                {selectData && (
                    <li
                        className="select-item"
                        onClick={(e) => {
                            clearItem(e);
                        }}
                    >
                        Clear All
                    </li>
                )}
                {selectData?.map((item, index) => {
                    return (
                        <li
                            className="select-item"
                            key={index}
                            data-value={item[trackBy]}
                            onClick={(e) => {
                                selectItem(e, item);
                            }}
                        >
                            {item[trackBy]}
                        </li>
                    );
                })}
            </div>
        </div>
    );
};

export default Select;
