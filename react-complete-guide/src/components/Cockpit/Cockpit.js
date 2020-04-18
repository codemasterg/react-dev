import React, {useEffect, useRef} from 'react'

/**  Component function that displays header and controls display of Persons
     cards. */
const cockpit = (props) => {
    // example of a React functional hook (NOT a lifecyle hook, they can
    // only be used in Components).  It runs for every update of 'persons'. 
    // It effectively gets called
    // on lifecycles componentDidMount and componentDidUpdate of persons.
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        // do something ... like rest call.  here just a timer
        const timer = setTimeout( () => {
            // do something on timeout
        }, 1000);

        // show how a ref setup during render can be used
        toggleButtonRef.current.click();

        // optionally return a ref to a method to do cleanup work before component is removed
        return () => {
            clearTimeout(timer);  // timer ref is maintained
            console.log('[Cokcpit.js] cleanup work in useEffect');
        }
        // only run when toggle persons is clicked in this example, name changes
        // will NOT cause this effect to run because they are part of persons which
        // is not a prop of this function component.
    }, []);  // note 2nd arg, 'showPersons'. 
                          //If you just want DidMount, just use empty array [],
                          // you can also list multiple props you want this hook to apply to

    // you can apply css class dynamically cause this is still as JS!
    const classesForStyling = [];
    if (props.personsLength <=2 ) {
        classesForStyling.push('red');
    }
    if (props.personsLength <=1 ) {
        classesForStyling.push('bold');   // ['red','bold']
    }
    // inline style example
    const buttonStyle = {
        backgroundColor: 'green',
        color: 'white',
        font: 'inherit',
        border: '1px solid blue',
        padding: '4px',
        
        };

    if (props.showPersons) {
        buttonStyle.backgroundColor='red';
    }


    const toggleButtonRef = useRef(null);
    return(
        <div>
            <h2>{props.title}</h2>
            <p className={classesForStyling.join(' ')}>Working!</p>
            <button  style={buttonStyle} onClick={props.clicked}
                // setup ref for use in useEffect -- above
                ref={toggleButtonRef}> 
                Toggle People
            </button>
        </div>
    );
}

// wrap so React can optimimize render of this component (i.e. does it need 
// to or not based on props change).  Only do this if this component's props
// may / may not change on each use of this component.  In this example, it's
// possible that personsLength may not change on each event so it's worth the
// overhead of wrapping it.
export default React.memo(cockpit); 