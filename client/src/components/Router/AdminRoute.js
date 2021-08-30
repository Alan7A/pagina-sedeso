import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const admins = [1,2,3]

export const AdminRoute = ({ userId=-1, children, ...rest }) => {

    return (
        <Route
            {...rest}
            render={({ location }) =>
                admins.includes(userId) ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
}
