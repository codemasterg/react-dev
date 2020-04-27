import React, {Component} from 'react'

/**
 * Example of lazy loading a component HOC wrapper
 * @param {*} importComponent 
 */
const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null,
        }

        componentDidMount() {
            importComponent()
                .then(cmp => {
                    this.setState({component: cmp.default});
                })

        }

        render() {
            const LazyComponentToRender = this.state.component;

            return LazyComponentToRender ? <LazyComponentToRender {...this.props} /> : null;
        }
    }
}

export default asyncComponent;
