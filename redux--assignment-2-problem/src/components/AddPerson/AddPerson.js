import React, {Component} from 'react';

import './AddPerson.css';

class AddPerson extends Component {

    // no need for redux, only needed by this component
    state = {
        name: '',
        age: ''
    }

    render() {
        return (
            <div className="AddPerson">
                <input type="text" placeholder="Name" 
                    onChange={this.nameChangeHandler} 
                    // remember - set value on input to setup 2-way binding
                    value={this.state.name}/>
                <input type="text" placeholder="Age" 
                    onChange={this.ageChangeHandler} 
                    value={this.state.age}/>/>
                <button onClick={() => this.props.personAdded(this.state.name, this.state.age)}>
                    Add Person
                </button>
            </div>
        );
    }

    nameChangeHandler = (event) => {
        this.setState({name: event.target.value});
    }

    ageChangeHandler = (event) => {
        this.setState({age: event.target.value});
    }
}

export default AddPerson;