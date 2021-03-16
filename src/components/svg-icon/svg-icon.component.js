import React from 'react';

const SvgIcon = ({ icon, iconclass, pureSvg, clicked }) => {
    if (pureSvg) {
        return <svg className={`icon ${iconclass ? iconclass : ''}`} dangerouslySetInnerHTML={{ __html: pureSvg }} />;
    } else {
        return (
            <svg onClick={clicked && ((e) => clicked(e))} className={`icon ${iconclass ? iconclass : icon}`}>
                <use xlinkHref={`/assets/icons.svg#${icon}`} />
            </svg>
        );
    }
};

export default SvgIcon;
