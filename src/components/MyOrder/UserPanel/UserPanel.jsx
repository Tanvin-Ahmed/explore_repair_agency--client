import React from 'react';
import { Switch, useRouteMatch } from 'react-router';
import PrivateRoute from '../../PrivateRoute/PrivateRoute';
import OrderSidebar from '../UserOrderSidebar/UserOrderSidebar';
import Review from '../Review/Review';
import OrderList from '../UserOrderList/UserOrderList';

const MyOrder = () => {
    const {path} = useRouteMatch();
    return (
        <section className="myOrder">
            <OrderSidebar />
            <Switch>
                <PrivateRoute exact path={`${path}`}>
                    <OrderList />
                </PrivateRoute>
                <PrivateRoute path={`${path}/review`}>
                    <Review />
                </PrivateRoute>
            </Switch>
        </section>
    );
};

export default MyOrder;