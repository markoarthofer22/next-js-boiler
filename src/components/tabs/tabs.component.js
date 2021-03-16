import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import SvgIcon from '../svg-icon/svg-icon.component';

import './tabs.scss';

//this Acordion takes data in form of array
//it is important that each item in array contains an ID

const TabsComponent = (props) => {
    const { data, tabsClass, type, returnValue } = props;

    const [index, setIndex] = useState(0);

    const onClickHandler = (id) => {
        if (id === index) {
            return;
        } else {
            setIndex(id);
        }
    };

    useEffect(() => {
        if (returnValue) {
            let activeIcon = document.querySelector('.tabs--item-active').dataset.icon;
            returnValue(activeIcon);
        }
    }, [index]);

    useEffect(() => {
        let height = document.querySelector(".tabs--content[data-index='" + index + "'").scrollHeight + 25;
        document.querySelector('.tabs--content-box').style.height = height + 'px';
    }, [index]);

    return (
        <div className={`tabs ${tabsClass ? tabsClass : ''}`}>
            <div className="tabs--holder">
                {data.map((item, i) => {
                    return <TabsItem onClickHandler={onClickHandler} type={type} index={index} id={i} key={i} {...item} />;
                })}
            </div>

            <div className="tabs--content-box">
                {data.map((item, i) => (
                    <CSSTransition
                        in={i === index}
                        timeout={500}
                        classNames={{
                            enterActive: 'animate__fadeIn',
                            exitActive: 'animate__fadeOut',
                        }}
                        key={i}
                        unmountOnExit
                    >
                        <div data-index={i} className={`animate__animated tabs--content ${i === index ? 'tabs--content-active' : ''}`}>
                            <div dangerouslySetInnerHTML={{ __html: item.text }}></div>
                        </div>
                    </CSSTransition>
                ))}
            </div>
        </div>
    );
};

const TabsItem = (props) => {
    const { title, icon, onClickHandler, index, id, type } = props;

    return type === 'our-values' ? (
        <div onClick={() => onClickHandler(id)} data-icon={icon} className={`tabs--item ${id === index ? 'tabs--item-active' : ''}`}>
            <span className="tabs--title">
                <SvgIcon icon={icon} />
                <span className="value">{title}</span>
            </span>
        </div>
    ) : (
        <div onClick={() => onClickHandler(id)} className={`tabs--item ${id === index ? 'tabs--item-active' : ''}`}>
            <span className="tabs--title">
                <img src={`/assets/white-section/${icon}.svg`} alt="" />
            </span>
        </div>
    );
};

export default TabsComponent;
