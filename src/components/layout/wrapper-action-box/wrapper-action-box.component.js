import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../buttons/button.component';
import SvgIcon from '../../svg-icon/svg-icon.component';

//assets
import bgLeft from '../../../../public/assets/dots/testimonials-left.png';
import bgRight from '../../../../public/assets/dots/testimonials-right.png';
//Styles
import './wrapper-action-box.scss';

const WrapperActionBox = (props) => {
    const { title, subtitle, buttons, hasDots, animationClass } = props;

    return (
        <div className="description-tab">
            {hasDots && <img src={bgLeft} alt="" className="bg-test-left" />}

            <h2 className={`description-tab--title ${animationClass ? animationClass : ''}`} dangerouslySetInnerHTML={{ __html: title }}></h2>

            <p className={`description-tab--content ${animationClass ? animationClass : ''}`} dangerouslySetInnerHTML={{ __html: subtitle }}></p>
            <div className={`description-tab--actions ${animationClass ? animationClass : ''}`}>
                {buttons?.map((item, index) =>
                    item.is_external ? (
                        <a key={index} href={item.button_url_external ? item.button_url_external : ''} target="_blank" rel="noopener noreferrer">
                            <Button title={item.button_title} customClass={`main-btn ${item.button_gradient ? item.button_gradient : ''}`}>
                                {item.button_icon && <SvgIcon icon={item.button_icon} />}
                            </Button>
                        </a>
                    ) : (
                        <NavLink to={item.button_url?.post_name ? item.button_url?.post_name : ''} key={index}>
                            <Button title={item.button_title} customClass={`main-btn ${item.button_gradient ? item.button_gradient : ''}`}>
                                {item.button_icon && <SvgIcon icon={item.button_icon} />}
                            </Button>
                        </NavLink>
                    )
                )}
            </div>
        </div>
    );
};

export default WrapperActionBox;
