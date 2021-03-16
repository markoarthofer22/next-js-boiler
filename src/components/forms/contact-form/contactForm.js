import React, { useEffect, useState, useRef } from 'react';
import _ from 'underscore';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { NavLink } from 'react-router-dom';

//redux
import FormApi from '../../../redux/apis/form-api';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../../../redux/globals/globals.actions';

//styles
import '../form.scss';

// components
import Button from '../../buttons/button.component';
import InputComponent from '../../input/input.component';
import SvgIcon from '../../svg-icon/svg-icon.component';
import Select from '../../select/select.component';
//hooks
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const ContactForm = (props) => {
    const { formClass } = props;
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [shippingSelect, setShippingSelect] = useState({});
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const SweetAlert = withReactContent(Swal);

    const descriptionValues = [
        { name: 'Shippers', code: 'Shippers' },
        { name: 'Carriers', code: 'Carriers' },
        { name: 'Press Inquiries', code: 'Press Inquiries' },
        { name: 'Other', code: 'Other' },
    ];

    const { register, handleSubmit, errors, watch, setError } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
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
                setShippingSelect({});
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
                setShippingSelect({});
                setIsButtonDisabled(false);
            },
        });
    };

    //handle all data from inputs
    const handleData = (_data, e) => {
        e.preventDefault();

        if (_.isEmpty(shippingSelect)) {
            document.querySelector('.select-error').classList.add('visible');
            document.querySelector('.select-error').setAttribute('error', t('form.reqError'));
            setTimeout(() => {
                document.querySelector('.select-error').classList.remove('visible');
                document.querySelector('.select-error').setAttribute('error', '');
            }, 2000);
            return;
        }

        let data = {
            ..._data,
            department: shippingSelect.code,
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

        FormApi.post(`366e3c5f-034b-4794-ae14-b04d4a746397`, fields)
            .then((response) => {
                FormIsSent(response.data.inlineMessage);
            })
            .catch((error) => {
                FormIsError(error.message);
            });
    };

    return (
        <section className={`default-form ${formClass ? formClass : ''}`}>
            <form noValidate={true} onSubmit={handleSubmit(handleData)} className="form-group" autoComplete="1">
                <div className="form-item-container">
                    <div className={`form-item-floating ${errors.firstname && 'invalid'}`}>
                        <InputComponent
                            name="firstname"
                            labelText={t('form.first_name')}
                            errorMessage={errors.firstname}
                            register={register}
                            required={{ required: t('form.reqError') }}
                        />
                    </div>

                    <div className={`form-item-floating ${errors.lastname && 'invalid'}`}>
                        <InputComponent
                            name="lastname"
                            labelText={t('form.last_name')}
                            errorMessage={errors.lastname}
                            register={register}
                            required={{ required: t('form.reqError') }}
                        />
                    </div>
                </div>

                <div className="form-item-container single">
                    <div className={`form-item-floating ${errors.email && 'invalid'}`}>
                        <InputComponent
                            name="email"
                            labelText={t('form.mail')}
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
                </div>

                <div className="form-item-container single">
                    <div className={`form-item-floating select`}>
                        <Select
                            label={t('form.department')}
                            data={descriptionValues}
                            trackBy="name"
                            selectClass={`form-select`}
                            returnedValue={shippingSelect}
                            returnValue={setShippingSelect}
                        />
                        <span className="select-error" />
                    </div>
                </div>

                <div className="form-item-container single">
                    <div className={`form-item-floating ${errors.message && 'invalid'}`}>
                        <textarea
                            className={`no-resize  ${errors.message && 'invalid'}`}
                            ref={register({ required: t('form.reqError') })}
                            name="message"
                            required
                        />
                        <label htmlFor="comment">* {t('form.message')}</label>
                        {errors.message && <span name="message" error={errors.message && errors.message.message} />}
                    </div>
                </div>

                <div className="default-form--actions-box">
                    <p className="default-form--footer-text">
                        By clicking Sign Up you confirm you have read and agreed to Forager’s{' '}
                        <NavLink to="/forager-website-terms-conditions">General Terms and Conditions and Privacy</NavLink>
                    </p>
                    <Button type="submit" title={t('form.submit_alt')} customClass="orange-btn main-btn" isLoading={isButtonDisabled}>
                        <SvgIcon icon="scout" />
                    </Button>
                </div>
            </form>
        </section>
    );
};

export default ContactForm;
