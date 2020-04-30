import React, {Component, Fragment} from 'react'
import axios from '../../../axios-orders'

import Button from  '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../../hoc/WithErrorHandler/withErrorHandler'

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipCode: '',
        },
        loading: false,
    }
    render() {
        return (
            <Fragment>
                {this.state.loading ? <Spinner /> :

                    <div className={classes.ContactData}>
                        <h4>Enter your contact data</h4>
                        <form>
                            <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                            <input className={classes.Input} type="email" name="email" placeholder="Your email" />
                            <input className={classes.Input} type="text" name="street" placeholder="Your street" />
                            <input className={classes.Input} type="text" name="zipCode" placeholder="Your zip" />
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
            customer: {
                name: 'Greg',
                address: {
                    street: '100 Main St.',
                    town: 'My Town',
                    zipCode: 12345,
                },
                email: 'test@test.com',
                deliveryMethod: 'mega-delivery'        
            },

            }
        
        // base url set in instance that was imported
        this.setState({loading: true}); // for busy wheel
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                console.log(response);
                this.props.history.push('/');  // redirect back to main page
            })
            .catch(error => {
                this.setState({loading: false});
                console.log(error);
            })
            .finally( () => {
                // place holder.  cannot call setState here because sucess case does a
                // redirect (history.push) which unmounts this component.
            })

    }
}

export default withErrorHandler(ContactData);