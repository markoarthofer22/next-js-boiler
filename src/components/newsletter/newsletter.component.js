import React, { useState, useEffect } from 'react';
import _ from 'underscore';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

//redux
import FormApi from '../../redux/apis/form-api';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../../redux/globals/globals.actions';
//components
import Button from '../buttons/button.component';
import SvgIcon from '../svg-icon/svg-icon.component';
import InputComponent from '../input/input.component';

//assets
import newsletterImg from '../../../public/assets/newsletter/newsletter-bg.png';

//hooks
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
// styles
import './newsletter.scss';

const Newsletter = ({ title, subtitle }) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const { t } = useTranslation();
    const SweetAlert = withReactContent(Swal);

    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    });

    const FormIsSent = (successMessage) => {
        dispatch(setIsLoading(false));

        SweetAlert.fire({
            title: 'Success!',
            text: successMessage,
            icon: 'success',
            customClass: {
                container: 'form--alert-box',
                popup: 'form--alert-box-popup',
                title: 'form--alert-box-title',
                content: 'form--alert-box-content',
            },
            showConfirmButton: false,
            padding: '4rem',
            width: 500,
            timer: 1500,
            timerProgressBar: true,
            onClose: () => {
                document.querySelector('.form-group').reset();
                setIsButtonDisabled(false);
            },
        });
    };

    const FormIsError = (error) => {
        dispatch(setIsLoading(false));

        SweetAlert.fire({
            title: 'Fail!',
            text: error,
            icon: 'error',
            customClass: {
                container: 'form--alert-box form--alert-box--error',
                popup: 'form--alert-box-popup',
                title: 'form--alert-box-title',
                content: 'form--alert-box-content',
            },
            showConfirmButton: false,
            padding: '4rem',
            width: 500,
            timer: 1500,
            timerProgressBar: true,
            onClose: () => {
                document.querySelector('.form-group').reset();
                setIsButtonDisabled(false);
            },
        });
    };

    //handle all data from inputs
    const handleData = (_data, e) => {
        e.preventDefault();

        let data = {
            ..._data,
        };

        dispatch(setIsLoading(true));
        setIsButtonDisabled(true);

        let hubSpotData = [];
        const entries = Object.entries(data);
        for (const [property, value] of entries) {
            hubSpotData.push({
                name: property,
                value: value,
            });
        }

        let fields = {
            fields: hubSpotData,
        };

        FormApi.post(`41a02ccb-6585-405a-b275-89b487342708`, fields)
            .then((response) => {
                FormIsSent(response.data.inlineMessage);
            })
            .catch((error) => {
                FormIsError(error.message);
            });
    };
    return (
        <section
            className="newsletter"
            style={{
                backgroundImage: "url('" + newsletterImg + "')",
            }}
        >
            <div className="newsletter--content">
                {title && <h3 className="newsletter--content--title">{title}</h3>}

                {subtitle && <h5 className="newsletter--content--subtitle">{subtitle}</h5>}
            </div>

            <div className="newsletter--input-holder">
                <form noValidate={true} onSubmit={handleSubmit(handleData)} className="form-group" autoComplete="1">
                    <div className="newsletter--input-holder--input">
                        <InputComponent
                            name="email"
                            labelText={t('newsletter.input')}
                            errorMessage={errors.email}
                            register={register}
                            required={{
                                required: t('form.reqError'),
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: t('form.mailValid'),
                                },
                            }}
                        />
                    </div>

                    <Button type="submit" title={t('newsletter.subscribe')} customClass="newsletter--submit" isLoading={isButtonDisabled}>
                        <SvgIcon icon="scout" />
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;
