import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router';
import { appContext } from '../../../App';
import './ServiceList.css';
import NavBar from '../../Shared/NavBar/NavBar';
import PrivateRoute from '../../PrivateRoute/PrivateRoute';
import Payment from '../Payment/Payment';
import ServiceItem from '../ServiceItem/ServiceItem';

const ServiceList = () => {
    const { loadingSpinner, setLoadingSpinner } = useContext(appContext);
    const { category } = useParams();
    const { path, url } = useRouteMatch();
    const [items, setItems] = useState([]);

    useEffect(() => {
        setLoadingSpinner(true);
        fetch(`https://serene-caverns-03356.herokuapp.com/serviceItem/${category}`)
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setLoadingSpinner(false);
            })
            .catch(err => console.log(err));
    }, []);


    return (
        <section>
            <NavBar />
            <Switch>
                <Route exact path={`${path}`}>
                    <ServiceItem key="1" url={url} category={category} loadingSpinner={loadingSpinner} items={items} />
                </Route>
                <PrivateRoute path={`${path}/payment/:id`}>
                        <Payment key="2" />
                </PrivateRoute>
            </Switch>
        </section>
    );
};

export default ServiceList;