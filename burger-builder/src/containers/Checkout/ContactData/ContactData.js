import React, { Component, Fragment } from 'react'
import axios from '../../../axios-orders'
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../../hoc/WithErrorHandler/withErrorHandler'
import Input from '../../../components/UI/Input/Input'
import * as actions from '../../../store/actions/order'

class ContactData extends Component {

    state = {
        orderForm: {
            name: this.setupInput("text", "Your Name"),
            street: this.setupInput("text", "Your Street"),
            town: this.setupInput("text", "Your Town"),
            zipCode: this.setupInput("text", "Your Zip", {minLength: 5, maxLength: 5}),
            email: this.setupInput("email", "Your email@abc123.com"),
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,  // drop-down is always valid
            },
        },
        formIsValid: false,
    }

    render() {
        const formElements = [];
        for(let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }

        return (
            <Fragment>
                {this.props.loading ? <Spinner /> :

                    <div className={classes.ContactData}>
                        <h4>Enter your contact data</h4>
                        <form onSubmit={this.orderHandler}>
                            {formElements.map(input => {
                                return(
                                    <Input elementType={input.config.elementType} 
                                        elementConfig={input.config.elementConfig} 
                                        value={input.config.value}
                                        invalid={!input.config.valid}
                                        shouldValidate={input.config.validation}
                                        touched={input.config.touched}
                                        changed={(event) => this.inputChangedHandler(event, input.id)}
                                        key={input.id} />
                                );
                            })}
                            <Button 
                                btnType="Success" 
                                disabled={!this.state.formIsValid}
                                clicked={this.orderHandler}>ORDER</Button>
                        </form>
                    </div>
                }
            </Fragment>
        );
    }

    orderHandler = (event) => {

        // default behavior on a form is to send a request and reload the page, disable
        event.preventDefault();

        // base url set in instance that was imported

        // Just need contact input field names and values entered so they can be posted
        const contactData ={};
        for(let formElementId in this.state.orderForm) {
            contactData[formElementId] = this.state.orderForm[formElementId].value;
        }

        // build the order (burger, price, contact) for posting
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice, // normally set on server!
            contactData: contactData,
        }
        this.props.onOrderBurger(order);
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

    /**
     * Perform 2-way binding of input field being changed (i.e. updated field value that
     * is displayed with the user's input)
     * @param {} event 
     * @param {*} inputId 
     */
    inputChangedHandler(event, inputId) {
        // console.log(event.target.value);

        // Since spread operator does a shallow copy, do a 2nd spread to get element value copy
        const updatedOrderForm = {...this.state.orderForm };
        const updatedFormElement = {...updatedOrderForm[inputId] };

        updatedFormElement.value = event.target.value;  // copy user input char(s)
        updatedFormElement.valid 
            = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputId] = updatedFormElement;  // The order form copy now has the updated input value

        let formIsValid = true;
        for(let inputId in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputId].valid && formIsValid;
        }

        // note that the whole form is being updated
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});

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
}

// subset of state to pass to connect that this component is interested in.  In this
// example, prop "ings" is mapped to state "ingredients" which was established in ingredientsReducer.js.
// ings will be passed as normal props to BurgerBuilder via connect().  "ingReducer" and 
// "priceReducer" are the prop names defined in index.js where the separate reducers
// are combined.
const mapStateToProps = (state) => {
    return {
        ings: state.ingReducer.ingredients,
        totalPrice: state.priceReducer.totalPrice,
        error: state.ingReducer.error,
        loading: state.orderReducer.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));