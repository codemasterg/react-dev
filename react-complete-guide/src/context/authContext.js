import React from 'react';

const authContext = React.createContext(
    {
        authenticated: false,
        someString: 'abc123',
        login: () => {}
    }
)

export default authContext;