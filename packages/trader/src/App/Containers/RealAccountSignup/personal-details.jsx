import classNames           from 'classnames';
import { Input }            from 'deriv-components';
import { Formik, Field }    from 'formik';
import React, { Component } from 'react';
import { CSSTransition }    from 'react-transition-group';
import { localize }         from 'App/i18n';
import Localize             from 'App/Components/Elements/localize.jsx';
import { toMoment }         from 'Utils/Date';
import FormSubmitButton     from './form-submit-button.jsx';
import DatePickerCalendar   from './date-picker-calendar.jsx';
import 'Sass/personal-details-form.scss';

class DateOfBirth extends Component {
    state = {
        should_show_calendar: false,
        max_date            : toMoment().subtract(18, 'years'),
        min_date            : toMoment().subtract(100, 'years'),
        date                : toMoment().subtract(18, 'years').unix(),
    };

    constructor(props) {
        super(props);
        this.reference = React.createRef();
    }

    closeDatePicker = () => {
        this.setState({
            should_show_calendar: false,
        });
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick, { passive: true });
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick);
    }

    handleClick = (e) => {
        if (!this.reference.current) {
            return;
        }
        if (!this.reference.current.contains(e.target)) {
            this.setState({
                should_show_calendar: false,
            });
        }
    };

    handleFocus = () => {
        this.setState({
            should_show_calendar: true,
        });
    };

    render() {
        return (
            <Field
                id={this.props.id}
                name={this.props.name}
                render={({
                    field: { name, value },
                    form : { setFieldValue },
                }) => (
                    <div className='datepicker'>
                        <InputField
                            {...this.props}
                            onFocus={this.handleFocus}
                            className={classNames(this.props.className, {
                                'datepicker--active-label': !!value,
                            })}
                            onBlur={this.handleBlur}
                            value={value ? toMoment(value).format('YYYY-MM-DD') : ''}
                            readOnly
                        />
                        <CSSTransition
                            in={this.state.should_show_calendar}
                            timeout={100}
                            classNames={{
                                enter    : 'datepicker__picker--enter datepicker__picker--bottom-enter',
                                enterDone: 'datepicker__picker--enter-done datepicker__picker--bottom-enter-done',
                                exit     : 'datepicker__picker--exit datepicker__picker--bottom-exit',
                            }}
                            unmountOnExit
                        >
                            <div
                                className='datepicker__picker'
                                ref={this.reference}
                            >
                                <DatePickerCalendar
                                    max_date={this.state.max_date}
                                    min_date={this.state.min_date}
                                    date={this.state.date}
                                    onChange={(val, type) => {
                                        setFieldValue(name, val, true);
                                        if (type === 'day') {
                                            this.closeDatePicker();
                                        }
                                    }}
                                    value={value}
                                />
                            </div>
                        </CSSTransition>
                    </div>
                )}
            />
        );
    }
}

const InputField = (props) => {
    return (
        <Field name={props.name}>
            {
                ({
                    field,
                    form: { errors, touched },
                }) => (
                    <React.Fragment>
                        <Input
                            type='text'
                            required
                            autoComplete='off'
                            maxLength='30'
                            error={touched[field.name] && errors[field.name]}
                            {...field}
                            {...props}
                        />
                    </React.Fragment>
                )
            }
        </Field>
    );
};

class PersonalDetails extends Component {
    constructor(props) {
        super(props);

        this.form = React.createRef();
    }

    componentDidMount() {
        this.form.current.getFormikActions().validateForm();
    }

    render() {
        return (
            <Formik
                initialValues={{
                    first_name   : this.props.value.first_name,
                    last_name    : this.props.value.last_name,
                    date_of_birth: this.props.value.date_of_birth,
                }}
                validate={this.validatePersonalDetails}
                onSubmit={(values, actions) => {
                    this.props.onSubmit(this.props.index, values, actions.setSubmitting);
                }}
                ref={this.form}
            >
                {
                    ({
                        handleSubmit,
                        isSubmitting,
                        errors,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className='personal-details-form'>
                                <div className='personal-details-form__elements'>
                                    <InputField
                                        className='dc-input--no-placeholder'
                                        name='first_name'
                                        label={localize('First name')}
                                        placeholder={localize('John')}
                                    />
                                    <InputField
                                        name='last_name'
                                        className='dc-input--no-placeholder'
                                        label={localize('Last name')}
                                        placeholder={localize('Doe')}
                                    />
                                    <DateOfBirth
                                        name='date_of_birth'
                                        className='dc-input--no-placeholder'
                                        label={localize('Date of birth')}
                                        placeholder={localize('1999-07-01')}
                                    />
                                </div>
                                <p className='personal-details-form__description'>
                                    <Localize
                                        i18n_default_text={'Any information you provide is confidential and will be used for verification purposes only.'}
                                    />
                                </p>
                            </div>
                            <FormSubmitButton
                                is_disabled={
                                    // eslint-disable-next-line no-unused-vars
                                    isSubmitting ||
                                    Object.keys(errors).length > 0
                                }
                                label='Next'
                                has_cancel
                                cancel_label='Previous'
                                onCancel={this.props.onCancel}
                            />
                        </form>
                    )
                }
            </Formik>
        );
    }

    validatePersonalDetails = (values) => {
        const max_date    = toMoment().subtract(18, 'days');
        const validations = {
            first_name: [
                v => !!v,
                v => v.length > 2,
                v => v.length < 30,
                v => /^[a-zA-Z \-\.\']{2,30}$/.exec(v) !== null,
            ],
            last_name: [
                v => !!v,
                v => v.length > 2,
                v => v.length < 30,
                v => /^[a-zA-Z \-\.\']{2,30}$/.exec(v) !== null,
            ],
            date_of_birth: [
                v => !!v,
                v => toMoment(v).isValid() && toMoment(v).isBefore(max_date),
            ],
        };

        const mappedKey = {
            first_name   : localize('First name'),
            last_name    : localize('Last name'),
            date_of_birth: localize('Date of birth'),
        };

        const common_messages  = [
            '%s is required',
            '%s is too short',
            '%s is too long',
            '%s is not in a proper format.',
        ];

        const date_of_birth_validation_messages = [
            '%s is required',
            '%s is not in a proper format.',
        ];

        const errors    = {};

        Object.entries(validations)
            .forEach(([key, rules]) => {
                const error_index = rules.findIndex(v => !v(values[key]));
                if (error_index !== -1) {
                    if (key === 'date_of_birth') {
                        errors[key] =
                            localize(date_of_birth_validation_messages[error_index].replace('%s', mappedKey[key]));
                    } else {
                        errors[key] = localize(common_messages[error_index].replace('%s', mappedKey[key]));
                    }
                }
            });

        return errors;
    };
}

export default PersonalDetails;
