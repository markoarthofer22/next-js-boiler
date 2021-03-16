import React from 'react';

// styles
import './cards.scss';

// redux

const ShippersCard = (props) => {
    const { content, title, image } = props;

    return (
        <div className={`shippers--single-card`}>
            <div className="row">
                <div className="col-12 col-md-12 col-lg-6">
                    <h3 className="shippers--single-card--title">{title}</h3>

                    <div className="shippers--single-card--content" dangerouslySetInnerHTML={{ __html: content }}></div>
                </div>
                <div className="col-12 col-md-12 col-lg-6">
                    <img className="shippers--single-card--full-image" src={image} alt={title} />
                </div>
            </div>
        </div>
    );
};

export default ShippersCard;
