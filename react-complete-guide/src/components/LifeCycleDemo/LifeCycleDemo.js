import React, {Component} from 'react';

class LifeCycleDemo extends Component {

    // use to optimize whether or not this component should re-render
    // IF you want to automatically check all props, just make this class
    // extend 'PureComponent' and do not need  to implement this method
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.mills !== nextProps.mills) {
            console.log('[LifeCycleDemo] shouldComponentUpdate');
            return true; 
        } else {
            return false;
        }
    }
    
    componentDidMount() {
        console.log('[LifeCycleDemo] componentDidMount');
    }
    
    render() {
        return (
        <p>LifeCycleDemo! Starting mills {mills}, mills as prop: {this.props.mills}</p>
        );
    }
    
}

const mills = new Date().getMilliseconds();

export default LifeCycleDemo; 