import React, { useState, useEffect } from 'react';
import SvgIcon from '../svg-icon/svg-icon.component';

import './accordion.scss';

//this Acordion takes data in form of array
//it is important that each item in array contains an ID

const Accordion = (props) => {
    const { data, accordionClass } = props;

    const [index, setIndex] = useState(null);

    const onClickHandler = (id) => {
        if (id === index) {
            setIndex(null);
        } else {
            setIndex(id);
        }
    };

    useEffect(() => {
        const promiseFunction = new Promise((resolve, reject) => {
            document.querySelectorAll('.accordion-content').forEach((item) => {
                item.style.height = 0 + 'px';
            });

            resolve();
        });

        if (index === null) return;

        promiseFunction.then(() => {
            let height = document.querySelector(".accordion-content[data-index='" + index + "'").scrollHeight + 40;
            document.querySelector(".accordion-content[data-index='" + index + "'").style.height = height + 'px';
        });
    }, [index]);

    return (
        <div className={`accordion ${accordionClass ? accordionClass : ''}`}>
            {data.map((item, i) => {
                return <AccordionItem onClickHandler={onClickHandler} id={i} order={i + 1} index={index} key={i} {...item} />;
            })}
        </div>
    );
};

const AccordionItem = (props) => {
    const { question, answer, onClickHandler, order, id, index } = props;

    return (
        <div className="accordion-holder">
            <div onClick={() => onClickHandler(id)} className="accordion-item">
                <SvgIcon icon="drop-arrow" iconclass={`accordion-icon ${id === index ? 'accordion-icon-active' : ''}`} />

                <div className="accordion-title">
                    <span className="accordion-order">
                        {order > 9 && order + '.'}
                        {order <= 9 && '0' + order + '.'}
                    </span>
                    <span className="accordion-title-value">{question}</span>
                </div>
            </div>
            <div
                data-index={order - 1}
                className={`accordion-content ${id === index ? 'accordion-content-active' : ''}`}
                dangerouslySetInnerHTML={{ __html: answer }}
            ></div>
        </div>
    );
};

export default Accordion;
