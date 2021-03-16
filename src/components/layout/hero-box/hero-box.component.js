import React, { useState, useEffect } from 'react';
//component

// styles
import './herobox.scss';

const HeroBox = (props) => {
    const { heroClass, bgImage, helperImage, children } = props;

    return (
        <>
            <section
                className={`hero-box ${heroClass ? heroClass : ''}`}
                style={{
                    backgroundImage: "url('" + bgImage + "')",
                }}
            >
                {helperImage && (
                    <div
                        className="hero-box--helper-img"
                        style={{
                            backgroundImage: "url('" + helperImage + "')",
                        }}
                    ></div>
                )}

                {children}
            </section>
        </>
    );
};

export default HeroBox;
