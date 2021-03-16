import React, { useState, useEffect } from 'react';
import Button from '../../buttons/button.component';
import Select from '../../select/select.component';

//helpers
import _ from 'underscore';

//img for test

import './spot-quote.scss';
const SpotQuoteBox = (props) => {
    const { note, CTA } = props;
    const [pickupDate, setPickupDate] = useState({});
    const [deliveryDate, setDeliveryDate] = useState({});
    const [crossingCity, setCrossingCity] = useState({});
    const [transportationType, setTransportationType] = useState(1);

    const returnModalValue = (e) => {
        e.preventDefault();
        e.stopPropagation();

        CTA.action(true);
    };

    const list = [
        { name: 'Afghanistan', code: 'AF' },
        { name: 'Åland Islands', code: 'AX' },
        { name: 'Albania', code: 'AL' },
        { name: 'Algeria', code: 'DZ' },
        { name: 'American Samoa', code: 'AS' },
        { name: 'AndorrA', code: 'AD' },
        { name: 'Angola', code: 'AO' },
        { name: 'Anguilla', code: 'AI' },
        { name: 'Antarctica', code: 'AQ' },
        { name: 'Antigua and Barbuda', code: 'AG' },
        { name: 'Argentina', code: 'AR' },
        { name: 'Armenia', code: 'AM' },
        { name: 'Aruba', code: 'AW' },
        { name: 'Australia', code: 'AU' },
        { name: 'Austria', code: 'AT' },
        { name: 'Azerbaijan', code: 'AZ' },
        { name: 'Bahamas', code: 'BS' },
        { name: 'Bahrain', code: 'BH' },
        { name: 'Bangladesh', code: 'BD' },
        { name: 'Barbados', code: 'BB' },
        { name: 'Belarus', code: 'BY' },
        { name: 'Belgium', code: 'BE' },
        { name: 'Belize', code: 'BZ' },
        { name: 'Benin', code: 'BJ' },
        { name: 'Bermuda', code: 'BM' },
        { name: 'Bhutan', code: 'BT' },
        { name: 'Bolivia', code: 'BO' },
        { name: 'Bosnia and Herzegovina', code: 'BA' },
    ];

    return (
        <>
            <h4 className="spot-quote--heading">
                Get a spot quote <span>now</span>
            </h4>
            <section className="spot-quote">
                <div className="spot-quote--flex">
                    <div className="spot-quote--select-holder">
                        <Select
                            label="Enter Pickup City"
                            data={list}
                            trackBy="name"
                            title="Pickup City"
                            selectClass={`spot-quote--select `}
                            returnValue={setPickupDate}
                            isSearchable
                        />
                    </div>

                    <div className="spot-quote--select-holder">
                        <Select
                            label="Enter Delivery City"
                            data={list}
                            trackBy="name"
                            title="Delivery City"
                            selectClass={`spot-quote--select `}
                            returnValue={setDeliveryDate}
                            isSearchable
                        />
                    </div>

                    <div className="spot-quote--select-holder">
                        <Select
                            isDisabled={true}
                            label="* Truck Type"
                            trackBy="name"
                            title="Dry Van"
                            selectClass={`spot-quote--select `}
                            isSearchable
                        />
                    </div>
                </div>

                <div className={`spot-quote--additional ${!_.isEmpty(deliveryDate) && !_.isEmpty(pickupDate) ? 'open' : ''}`}>
                    <div className="spot-quote--select-holder">
                        <Select
                            label="Enter Crossing City"
                            data={list}
                            trackBy="name"
                            title="Crossing City"
                            selectClass={`spot-quote--select `}
                            returnValue={setCrossingCity}
                            isSearchable
                        />
                    </div>
                    <div className="spot-quote--radio-btn-holder">
                        <div
                            data-val="0"
                            onClick={(e) => setTransportationType(e.currentTarget.dataset.val)}
                            className={`spot-quote--radio-btn ${parseInt(transportationType) === 0 ? 'active' : ''}`}
                        >
                            <span className="val">Transload</span>
                        </div>
                        <div
                            data-val="1"
                            onClick={(e) => setTransportationType(e.currentTarget.dataset.val)}
                            className={`spot-quote--radio-btn ${parseInt(transportationType) === 1 ? 'active' : ''}`}
                        >
                            <span className="val">Direct</span>
                        </div>
                    </div>
                </div>
            </section>
            <div className="spot-quote--actions">
                {note && <span className="notes">{note}</span>}
                {CTA && (
                    <Button
                        isLoading={_.isEmpty(deliveryDate) || _.isEmpty(pickupDate) || _.isEmpty(crossingCity)}
                        customClass="orange-btn"
                        title={CTA.title}
                        clicked={(e) => returnModalValue(e)}
                    />
                )}
            </div>
        </>
    );
};

export default SpotQuoteBox;
