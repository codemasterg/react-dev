import React, {Fragment, Component} from 'react';
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSideDrawer: false,
        menuClickHandler: null,
    }

    constructor(props) {
        super(props);
        this.setMenuClickHandler();
    }

    componentDidMount() {
        this.setMenuClickHandler();
        
    }

    render () {
        return (
            <Fragment>
                <Toolbar 
                    menuClickHandler={this.state.menuClickHandler} />
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closeHandler={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }

    setMenuClickHandler() {
        if (window.matchMedia("(max-width: 500px)").matches) {
            if (this.state.showSideDrawer) {
                this.setState({menuClickHandler: this.sideDrawerClosedHandler})
            }
            else {
                this.setState({menuClickHandler: this.sideDrawerOpenedHandler})
            }
        }
        else {
            this.setState({menuClickHandler: this.mainMenuHandler, showSideDrawer: false});
        }
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerOpenedHandler = () => {
        this.setState({showSideDrawer: true});
    }

    mainMenuHandler = () => {
        window.location.href="/";
    }
}
export default Layout;