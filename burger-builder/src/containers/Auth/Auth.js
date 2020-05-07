import React, { Component } from 'react'
import {connect} from 'react-redux'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import * as actions from '../../store/actions/index'

class Auth extends Component {

    state = {
        controls: {
            email: this.setupInput("email", "Your email@abc123.com"),
            password: this.setupInput("password", "Your password", { minLength: 6 }),
        }
    }

    render() {
        const formElements = [];
        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key],
            });
        }

        const form = formElements.map(formElement => (
            <Input elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                key={formElement.id} />
        ));

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>

            </div>
        )

    }

    // common input config creater
    setupInput(inputType, placeholderText, validationRules) {
        return ({
            elementType: 'input',
            elementConfig: {
                type: inputType,
                placeholder: placeholderText,
            },
            value: '',
            validation: {
                required: true,
                ...validationRules,  // add any input specific validation passed in
            },
            valid: false,  // assume invalid to actually validated
            touched: false,  // has user ever entered anything?
        });
    }
    checkValidity(value, rules) {
        let isValid = true;
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.trim().length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    /**
     * Perform 2-way binding of input field being changed (i.e. updated field value that
     * is displayed with the user's input)
     * @param {} event 
     * @param {*} inputId 
     */
    inputChangedHandler(event, inputId) {
        // console.log(event.target.value);

        // Since spread operator does a shallow copy, do a 2nd spread to get element value copy
        const updatedLoginForm = {...this.state.controls };
        const updatedFormElement = {...updatedLoginForm[inputId] };

        updatedFormElement.value = event.target.value;  // copy user input char(s)
        updatedFormElement.valid 
            = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedLoginForm[inputId] = updatedFormElement;  // The login form copy now has the updated input value

        let formIsValid = true;
        for(let inputId in updatedLoginForm) {
            formIsValid = updatedLoginForm[inputId].valid && formIsValid;
        }

        // note that the whole form is being updated
        this.setState({controls: updatedLoginForm, formIsValid: formIsValid});

    }

    submitHandler = (event) => {
        event.preventDefault();  // do not reload on submit
        // fire redux action event to update state 
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value)
    }
}

const mapPropsToDispatch = (dispatch) => {
    return {
        onAuth: (email, passwd) => dispatch(actions.auth(email, passwd))
    }
}

export default connect(null, mapPropsToDispatch)(Auth);