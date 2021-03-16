import React, { useState, useEffect } from 'react';
import moment from 'moment';

//components
import FsLightbox from 'fslightbox-react';

//assets
import noImage from '../../../public/assets/no-image.jpg';

// styles
import './cards.scss';

// redux

const BlogCard = (props) => {
    const { content, title, category, user, background, date, openLightBox, videoLink } = props;
    const [lightBoxController, setLightBoxController] = useState(false);
    return (
        <>
            {videoLink && openLightBox && <FsLightbox toggler={lightBoxController} sources={[videoLink]} />}
            <div
                style={videoLink && { cursor: 'pointer' }}
                className={`blog--single-card`}
                onClick={videoLink && openLightBox && (() => setLightBoxController(!lightBoxController))}
            >
                <div className="blog--single-card--img">
                    <img src={background ? background : noImage} alt={title} />
                </div>
                <div className="blog--single-card--holder">
                    <div>
                        {category && <span className="blog--single-card--category">{category}</span>}

                        <h3 className="blog--single-card--title" dangerouslySetInnerHTML={{ __html: title }}></h3>

                        <div className="blog--single-card--content" dangerouslySetInnerHTML={{ __html: content }}></div>
                    </div>
                    <div>
                        {user && (
                            <div className="blog--single-card--user">
                                <img src={user?.acf?.blog_avatar?.sizes?.thumbnail} alt={user?.name} />
                                <div className="blog--single-card--user-text">
                                    <h5 className="title">{user?.name}</h5>
                                    {date && <span className="date">{moment(date).format('Do MMM YYYY')}</span>}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default BlogCard;
