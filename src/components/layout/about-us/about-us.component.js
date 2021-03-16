import React, { useState, useEffect } from 'react';

//component
import UserCard from '../../cards/user-card.component';
import CustomSwiper from '../../swiper/swiper.component';

//styles
import './about-us.scss';

//assets
import bgLeft from '../../../../public/assets/dots/testimonials-left.png';
import bgRight from '../../../../public/assets/dots/testimonials-right.png';

//hooks
import useIsBreakpoint from '../../hooks/useIsBreakpoint.hook';

const AboutUs = (props) => {
    const { data, title, additionalClass, isSwiper, animationClass } = props;

    const isMobile = useIsBreakpoint();
    const [params, setParams] = useState({});

    const [paramsDesktop, setParamsDesktop] = useState({
        slidesPerView: 'auto',
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: false,
        loop: true,
        rebuildOnUpdate: true,
    });

    useEffect(() => {
        if (isMobile !== 'x-large' || isMobile !== 'large') {
            setParams({
                slidesPerView: 'auto',
                navigation: false,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true,
                    speed: 600,
                },
                loop: true,
                rebuildOnUpdate: true,
            });
        } else {
            setParams({});
        }
    }, [isMobile]);

    return (
        <section className={`about-us ${additionalClass ? additionalClass : ''}`}>
            <img src={bgLeft} alt="" className="bg-test-left" />
            <img src={bgRight} alt="" className="bg-test-right" />

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className={`about-us--title ${animationClass ? animationClass : ''}`} dangerouslySetInnerHTML={{ __html: title }}></h2>

                        <div className="about-us--cards">
                            {isMobile === 'large' || isMobile === 'x-large' ? (
                                !isSwiper ? (
                                    <div className="row grid-20">
                                        {data?.map((item, index) => (
                                            <div key={index} data-delay={index * 80} className={`col-lg-4 ${animationClass ? animationClass : ''}`}>
                                                <UserCard
                                                    content={item.testimonial}
                                                    profilePic={item.user_image?.sizes?.thumbnail}
                                                    userTitle={item.user_name}
                                                    jobTitle={item.user_position}
                                                    type={(index + 1) % 2 === 0 ? 'big' : 'small'}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <>
                                        <CustomSwiper containerClass="about-us-swiper--desktop" params={paramsDesktop}>
                                            {data?.map((item, index) => (
                                                <div key={index} className="col-lg-4">
                                                    <UserCard
                                                        content={item.testimonial}
                                                        profilePic={item.user_image?.sizes?.thumbnail}
                                                        userTitle={item.user_name}
                                                        jobTitle={item.user_position}
                                                        type={(index + 1) % 2 === 0 ? 'big' : 'small'}
                                                    />
                                                </div>
                                            ))}
                                        </CustomSwiper>
                                        {/* <button className="custom-next">Marko</button> */}
                                    </>
                                )
                            ) : (
                                <CustomSwiper containerClass="about-us-swiper" params={params}>
                                    {data?.map((item, index) => (
                                        <div key={index} className="col-12 col-sm-6">
                                            <UserCard
                                                content={item.testimonial}
                                                profilePic={item.user_image?.sizes?.thumbnail}
                                                userTitle={item.user_name}
                                                jobTitle={item.user_position}
                                                type={(index + 1) % 2 === 0 ? 'big' : 'small'}
                                            />
                                        </div>
                                    ))}
                                </CustomSwiper>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
