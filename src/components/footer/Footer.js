import React from 'react';
import { NavLink } from 'react-router-dom';
import './footer.scss';
import SvgIcon from '../svg-icon/svg-icon.component';

//assets
import bgImage from '../../../public/assets/background.jpg';
import logo from '../../../public/assets/logo.png';

const Footer = ({ menuLeft, menuRight }) => {
    return (
        <footer
            className="footer"
            style={{
                backgroundImage: "url('" + bgImage + "')",
            }}
        >
            <div className="container">
                <div className="row grid-15">
                    <div className="col-12 col-md-4 bordered">
                        <div className="footer-branding">
                            <NavLink to="/" className="logo">
                                <img src={logo} alt="Forager" />
                            </NavLink>

                            <div className="footer-branding--description mobile-center">
                                The new standard for <br /> cross-border shipping
                            </div>

                            <div className="footer-branding--socials">
                                <a href="https://www.facebook.com/ForagerSCS" target="_blank" rel="noopener noreferrer">
                                    <SvgIcon icon="facebook" />
                                </a>

                                <a href="https://twitter.com/ForagerSCS" target="_blank" rel="noopener noreferrer">
                                    <SvgIcon icon="twitter" />
                                </a>

                                <a href="https://www.instagram.com/foragerscs" target="_blank" rel="noopener noreferrer">
                                    <SvgIcon icon="instagram" />
                                </a>

                                <a href="https://www.linkedin.com/company/foragerlogistics" target="_blank" rel="noopener noreferrer">
                                    <SvgIcon icon="linkedin" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="row grid-10">
                            <div className="col-12 col-sm-4 mobile-center">
                                <span className="address">
                                    2045 W Grand Ave, Ste B #38559
                                    <br />
                                    <br />
                                    Chicago, Illinois 60612
                                </span>

                                <a href="tel:+18854367243" className="tel-link">
                                    +1 (855) 436-7243
                                </a>
                            </div>

                            <div className="col-12 col-sm-4 mobile-center">
                                <ul className="footer-nav first">
                                    {menuLeft?.map((item, index) => (
                                        <li key={index} className="footer-nav--link">
                                            <NavLink to={item.slug}>{item?.title}</NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="col-12 col-sm-4 mobile-center">
                                <div className="footer-nav last">
                                    {menuRight?.map((item, index) => (
                                        <li key={index} className="footer-nav--link">
                                            <NavLink to={item.slug}>{item?.title}</NavLink>
                                        </li>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="footer-branding--copyright">
                            <p>©2020 Forager Group, Inc. All Rights Reserved</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
