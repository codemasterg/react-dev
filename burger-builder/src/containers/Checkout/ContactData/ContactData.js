import React, { Component, Fragment } from 'react'
import axios from '../../../axios-orders'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../../hoc/WithErrorHandler/withErrorHandler'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {

    state = {
        orderForm: {
            name: this.setupInput("text", "Your Name"),
            street: this.setupInput("text", "Your Street"),
            town: this.setupInput("text", "Your Town"),
            zipCode: this.setupInput("text", "Your Zip"),
            email: this.setupInput("email", "Your email@abc123.com"),
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: '',
            },
        },
        loading: false,
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
                {this.state.loading ? <Spinner /> :

                    <div className={classes.ContactData}>
                        <h4>Enter your contact data</h4>
                        <form>
                            {formElements.map(input => {
                                return(
                                    <Input elementType={input.config.elementType} 
                                        elementConfig={input.config.elementConfig} 
                                        value={input.config.value}
                                        changed={(event) => this.inputChangedHandler(event, input.id)}
                                        key={input.id} />
                                );
                            })}
                            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                        </form>
                    </div>
                }
            </Fragment>
        );
    }

    orderHandler = (event) => {

        // default behavior on a form is to send a request and reload the page, disable
        event.preventDefault();
        // make some fake data for posting
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice, // normally set on server!
        }

        // base url set in instance that was imported
        this.setState({ loading: true }); // for busy wheel
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                console.log(response);
                this.props.history.push('/');  // redirect back to main page
            })
            .catch(error => {
                this.setState({ loading: false });
                console.log(error);
            })
            .finally(() => {
                // place holder.  cannot call setState here because sucess case does a
                // redirect (history.push) which unmounts this component.
            })
    }
 
    // common input config creater
    setupInput(inputType, placeholderText) {
        return ({
            elementType: 'input',
            elementConfig: {
                type: inputType,
                placeholder: placeholderText,
            },
            value: '',
        })
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
        updatedOrderForm[inputId] = updatedFormElement;  // The order form copy now has the updated input value
        this.setState({orderForm: updatedOrderForm});   // note that the whole form is being updated


    }
}

export default withErrorHandler(ContactData, axios);