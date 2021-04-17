import React from 'react';
import { Switch, useRouteMatch } from 'react-router';
import PrivateRoute from '../../PrivateRoute/PrivateRoute';
import OrderSidebar from '../OrderSidebar/OrderSidebar';
import './MyOrder.css';
import Payment from '../../Home/Payment/Payment';
import Review from '../Review/Review';

const MyOrder = () => {
    const {path} = useRouteMatch();
    return (
        <section className="myOrder">
            <OrderSidebar />
            <Switch>
                {/* <PrivateRoute exact path={`${path}`}>
                    <Payment />
                </PrivateRoute> */}
                <PrivateRoute path={`${path}/review`}>
                    <Review />
                </PrivateRoute>
            </Switch>
        </section>
    );
};

export default MyOrder;