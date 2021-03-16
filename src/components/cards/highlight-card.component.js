import React from 'react';
import SvgIcon from '../svg-icon/svg-icon.component';

// styles
import './cards.scss';

// redux

const HighlightCard = (props) => {
    const { title, subtitle, icon } = props;

    return (
        <div className={`highlights--single-card`}>
            <div className="icon-holder">
                <SvgIcon icon={icon} />
            </div>
            <h3 className="title">{title}</h3>

            <p className="subtitle">{subtitle}</p>
        </div>
    );
};

export default HighlightCard;
