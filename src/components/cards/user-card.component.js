import React from 'react';
import card from '../../../public/assets/no-user.png';
// styles
import './cards.scss';

// redux

const UserCard = (props) => {
    const { content, jobTitle, userTitle, profilePic, type } = props;

    let pic = profilePic ? profilePic : card;

    return (
        <div className={`about-us--single-card ${type ? type : ''}`}>
            <div className="content" dangerouslySetInnerHTML={{ __html: content }}></div>

            <div className="card-footer">
                <div className="card-footer--profile-pic">
                    <div
                        className="img"
                        style={{
                            backgroundImage: "url('" + pic + "')",
                        }}
                    ></div>
                </div>

                <div className="card-footer--profile-name">
                    <p>{userTitle}</p>
                    <span className="job-title"> {jobTitle}</span>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
