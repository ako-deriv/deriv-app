import {
    FormInputField as InputField,
    FormSubmitButton,
    ThemedScrollbars,
    Dropdown,
    Loading,
}                            from 'deriv-components';
import { Formik }            from 'formik';
import PropTypes             from 'prop-types';
import React, { Component }  from 'react';
import { WS }                from 'Services';
import {
    Localize,
    localize,
}                            from 'deriv-translations';
import { FormSubHeader }     from 'Modules/Account/Components/layout-components.jsx';
import FileUploaderContainer from 'Modules/Account/Sections/Verification/ProofOfAddress/file-uploader-container.jsx';
import { poa_status_codes }  from 'Modules/Account/Sections/Verification/ProofOfAddress/proof-of-address-container.jsx';
import {
    Expired,
    NeedsReview,
    Unverified,
    Verified,
    Submitted,
}                            from 'Modules/Account/Sections/Verification/ProofOfAddress/proof-of-address-messages.jsx';
import {
    validAddress,
    validLength,
    validPostCode }          from 'Utils/Validator/declarative-validation-rules';

const form = React.createRef();

const Description = () => (
    <React.Fragment>
        <p>
            <Localize
                i18n_default_text='Please ensure that this address is the same as in your proof of address'
            />
        </p>
        <p>
            <strong>
                <Localize
                    i18n_default_text='Please upload one of the following:'
                />
            </strong>
        </p>
        <ul>
            <li>
                <Localize
                    i18n_default_text='A recent utility bill (e.g. electricity, water, gas, phone or internet)'
                />
            </li>
            <li>
                <Localize
                    i18n_default_text='A recent bank statement or government-issued letter with your name and address'
                />
            </li>
        </ul>
    </React.Fragment>
);

class MT5POA extends Component {
    file_uploader_ref = undefined;
    state             = {
        document_file     : undefined,
        file_error_message: undefined,
        form_error        : '',
        poa_status        : 'none',
        is_loading        : true,
        resubmit_poa      : false,
        has_poi           : false,
    };

    validateForm = (values) => {
        // No need to validate if we are waiting for confirmation.
        if ([
            poa_status_codes.verified,
            poa_status_codes.pending,
        ].includes(this.state.poa_status)) {
            return {};
        }

        const validations = {
            address_line_1: [
                v => !!v,
                v => validAddress(v),
            ],
            address_line_2: [
                v => !v || validAddress(v),
            ],
            address_city: [
                v => !!v,
                v => validLength(v, { min: 1, max: 35 }),
            ],
            address_state: [
                v => !v || validLength(v, { min: 0, max: 35 }),
            ],
            address_postcode: [
                v => !!v,
                v => validPostCode(v),
            ],
            document_file: [
                v => !!v,
                ([file]) => !!file.name,
            ],
        };

        const mappedKey = {
            address_line_1  : localize('First line of address'),
            address_line_2  : localize('Second line of address'),
            address_city    : localize('Town/City'),
            address_state   : localize('State/Province'),
            address_postcode: localize('Postal/ZIP Code'),
            document_file   : localize('Document file'),
        };

        const required_messages = [
            '{{field_name}} is required',
            '{{field_name}} is not in a proper format.',
        ];

        const optional_messages = [
            '{{field_name}} is not in a proper format.',
        ];

        const errors = {};

        Object.entries(validations)
            .forEach(([key, rules]) => {
                const error_index = rules.findIndex(v => !v(values[key]));
                if (error_index !== -1) {
                    switch (key) {
                        case 'address_state':
                        case 'address_line_2':
                        case 'document_file':
                            errors[key] = <Localize
                                i18n_default_text={optional_messages[error_index]}
                                values={{
                                    field_name: mappedKey[key],
                                }}
                                options={{ interpolation: { escapeValue: false } }}
                            />;
                            break;
                        default:
                            errors[key] = <Localize
                                i18n_default_text={required_messages[error_index]}
                                values={{
                                    field_name: mappedKey[key],
                                }}
                                options={{ interpolation: { escapeValue: false } }}
                            />;
                    }
                }
            });

        return errors;
    };

    handleCancel = (values) => {
        this.props.onSave(this.props.index, values);
        this.props.onCancel();
    };

    onFileDrop = (document_file, file_error_message, setFieldTouched, setFieldValue) => {
        setFieldTouched('document_file', true);
        setFieldValue('document_file', document_file);
        this.setState({ document_file, file_error_message });
    };

    proceed = () => {
        this.props.onSubmit(this.props.index, ...this.state);
    };

    onSubmit = async (values, actions) => {
        const { document_file, ...uploadables } = values;
        actions.setSubmitting(true);
        const data = await WS.setSettings(uploadables);
        if (data.error) {
            this.setState({
                form_error: data.error.message,
            });

            actions.setSubmitting(false);
            return;
        }
        const { error, get_settings } = await WS.authorized.storage.getSettings();
        if (error) {
            this.setState({
                form_error: error.message,
            });
            return;
        }

        // Store newly stored values in the component.
        const {
            address_line_1,
            address_line_2,
            address_city,
            address_state,
            address_postcode,
        } = get_settings;

        this.setState({
            address_line_1,
            address_line_2,
            address_city,
            address_postcode,
            address_state,
            form_error: '',
        });

        try {
            const api_response = await this.file_uploader_ref.current.upload();
            if (api_response.warning) {
                this.setState({
                    form_error: api_response.warning,
                });
                actions.setSubmitting(false);
                return;
            }
            const { error: e, get_account_status } = await WS.authorized.storage.getAccountStatus();
            if (e) {
                this.setState({
                    form_error: error.message,
                });
                actions.setSubmitting(false);
                return;
            }
            const { identity } = get_account_status.authentication;
            const has_poi      = !(identity && identity.status === 'none');
            if (has_poi) {
                this.proceed();
            } else {
                this.setState({
                    form_error: localize('Proof of identity failed. redirecting you back to previous step.'),
                });
                setTimeout(() => {
                    this.handleCancel(get_settings);
                }, 3000);
            }
        } catch (e) {
            this.setState({
                form_error: e.message,
            });
        }
        actions.setSubmitting(false);
        this.props.onSave(this.props.index, values);
        this.props.onSubmit(this.props.index, values, actions.setSubmitting);
    };

    componentDidMount() {
        WS.authorized.getAccountStatus().then(response => {
            const { get_account_status } = response;
            const { document, identity } = get_account_status.authentication;
            const has_poi                = !!(identity && identity.status === 'none');
            this.setState({ poa_status: document.status, has_poi, is_loading: false });
            this.props.refreshNotifications();
        });
    }

    handleResubmit = () => {
        this.setState({ resubmit_poa: true });
    };

    setFileUploadRef = (ref) => {
        this.file_uploader_ref = ref;
    };

    render() {
        const {
            states_list,
            value: {
                address_line_1,
                address_line_2,
                address_city,
                address_state,
                address_postcode,
            },
        } = this.props;

        const {
            is_loading,
            resubmit_poa,
            submitted_poa,
        } = this.state;

        return (
            <div id='real_mt5_personal_details' className='details-form mt5-details-form'>
                <Formik
                    initialValues={{
                        address_line_1,
                        address_line_2,
                        address_city,
                        address_state,
                        address_postcode,
                        document_file: this.state.document_file,
                    }}
                    isInitialValid={({ initialValues }) => this.validateForm(initialValues)}
                    validate={this.validateForm}
                    onSubmit={this.onSubmit}
                    ref={form}
                >
                    {
                        ({
                            errors,
                            handleSubmit,
                            isSubmitting,
                            handleChange,
                            setFieldTouched,
                            setFieldValue,
                            values,
                        }) => {

                            return (
                                <form onSubmit={handleSubmit}>
                                    {is_loading &&
                                    <Loading is_fullscreen={false} className='account___intial-loader' />}
                                    {(resubmit_poa || this.state.poa_status === poa_status_codes.none) && (
                                        <div className='account-form mt5-proof-of-address'>
                                            <ThemedScrollbars
                                                autohide
                                                style={{
                                                    maxHeight: '420px',
                                                }}
                                            >
                                                <div className='mt5-proof-of-address__field-area'>
                                                    <FormSubHeader
                                                        subtitle={localize('(All fields are required)')}
                                                        title={localize('Financial information')}
                                                    />
                                                    <InputField
                                                        name='address_line_1'
                                                        required
                                                        label={localize('First line of address*')}
                                                        placeholder={localize('First line of address')}
                                                    />
                                                    <InputField
                                                        name='address_line_2'
                                                        label={localize('Second line of address')}
                                                        optional
                                                        placeholder={localize('Second line of address')}
                                                    />
                                                    <div className='mt5-proof-of-address__inline-fields'>
                                                        <InputField
                                                            name='address_city'
                                                            required
                                                            label={localize('Town/City*')}
                                                            placeholder={localize('Town/City')}
                                                        />
                                                        <fieldset className='address-state__fieldset'>
                                                            <Dropdown
                                                                is_alignment_top={(window.innerHeight < 930)}
                                                                id='address_state'
                                                                className='address_state-dropdown'
                                                                is_align_text_left
                                                                list={states_list}
                                                                name='address_state'
                                                                value={values.address_state}
                                                                onChange={handleChange}
                                                                placeholder={localize('State/Province')}
                                                            />
                                                        </fieldset>
                                                        <InputField
                                                            name='address_postcode'
                                                            required
                                                            label={localize('Postal/ZIP Code*')}
                                                            placeholder={localize('Postal/ZIP Code')}
                                                        />
                                                    </div>
                                                    <div className='mt5-proof-of-address__description'>
                                                        <Description />
                                                    </div>
                                                    <div className='mt5-proof-of-address__file-upload'>
                                                        <FileUploaderContainer
                                                            onRef={ref => this.setFileUploadRef(ref)}
                                                            onFileDrop={
                                                                ({ document_file: df, file_error_message }) =>
                                                                    this.onFileDrop(
                                                                        df,
                                                                        file_error_message,
                                                                        setFieldTouched,
                                                                        setFieldValue,
                                                                    )}
                                                        />
                                                    </div>
                                                </div>
                                            </ThemedScrollbars>
                                        </div>
                                    )}
                                    {this.state.poa_status !== poa_status_codes.none && !resubmit_poa &&
                                    <ThemedScrollbars
                                        autohide
                                        style={{
                                            maxHeight: '420px',
                                        }}
                                    >
                                        {submitted_poa && <Submitted has_poi={this.state.has_poi} />}
                                        {this.state.poa_status === poa_status_codes.pending &&
                                        <NeedsReview />
                                        }
                                        {this.state.poa_status === poa_status_codes.verified &&
                                        <Verified has_poi={this.state.has_poi} />
                                        }
                                        {this.state.poa_status === poa_status_codes.expired &&
                                        <Expired onClick={this.handleResubmit} />
                                        }
                                        {this.state.poa_status === poa_status_codes.rejected &&
                                        <Unverified />
                                        }
                                        {this.state.poa_status === poa_status_codes.suspected &&
                                        <Unverified />
                                        }
                                    </ThemedScrollbars>
                                    }
                                    <FormSubmitButton
                                        has_cancel
                                        cancel_label={localize('Previous')}
                                        is_disabled={!!Object.keys(errors).length || isSubmitting}
                                        label={localize('Next')}
                                        is_loading={isSubmitting}
                                        form_error={this.state.form_error}
                                        onCancel={() => this.handleCancel(values)}
                                    />
                                </form>
                            );
                        }
                    }
                </Formik>
            </div>
        );
    }
}

MT5POA.propTypes = {
    onCancel           : PropTypes.func,
    onSave             : PropTypes.func,
    onSubmit           : PropTypes.func,
    storeProofOfAddress: PropTypes.func,
    value              : PropTypes.object,
};

export default MT5POA;
