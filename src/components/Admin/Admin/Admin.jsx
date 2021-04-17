import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import PrivateRoute from '../../PrivateRoute/PrivateRoute';
import AddService from '../AddService/AddService';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import ManageService from '../ManageServices/ManageService/ManageService';
import OrderList from '../OrderList/OrderList';
import './Admin.css';


const Admin = () => {
    const { path } = useRouteMatch();
    return (
        <section className="admin">
            <AdminSidebar />
                <Switch>
                    <PrivateRoute exact path={`${path}`}>
                        <OrderList />
                    </PrivateRoute>
                    <PrivateRoute path={`${path}/addService`}>
                        <AddService />
                    </PrivateRoute>
                    <PrivateRoute path={`${path}/makeAdmin`}>
                        <MakeAdmin />
                    </PrivateRoute>
                    <PrivateRoute path={`${path}/manageService`}>
                        <ManageService />
                    </PrivateRoute>
                </Switch>
        </section>
    );
};

export default Admin;