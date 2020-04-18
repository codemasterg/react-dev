import React from 'react'; 

const userOutput = (props) => {
    return (
        <div className="UserOutput">
            <p>User Name: {props.username}</p>
            <p>2ndst para</p>
        </div>
    );
}

export default userOutput;