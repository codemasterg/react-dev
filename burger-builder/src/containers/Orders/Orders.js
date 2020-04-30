import React, {Component} from 'react'

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler'

class Orders extends Component {

    state = {
        orders: [],
        loading: true,  // true because we always start by loading
    }

    componentDidMount() {

        // .json suffix is required by Firebase
        axios.get('/orders.json')
            .then(response => {

                // convert map of K/Vs in response to array
                const fetchedOrders = [];
                for(let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],  // use spread operator to retain original K/V pairs in data
                        id: key            // and add new id prop so Firebase key is retained for querying a specific order
                    });
                }

                this.setState({loading: false, orders: fetchedOrders})
            })
            .catch(err => {
                this.setState({loading: false});
            })
    }

    render() {
        return(
            <div>
                {this.state.orders.map(order => {
                    return(
                        <Order 
                            ingredients={order.ingredients}
                            price={+order.price} 
                            key={order.id}/>
                    );
                })}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);