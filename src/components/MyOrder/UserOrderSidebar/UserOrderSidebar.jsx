import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import './UserOrderSidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingCart, faShoppingBasket, faCommentDots } from '@fortawesome/free-solid-svg-icons';

const OrderSidebar = () => {
    const { url } = useRouteMatch();
    return (
        <div className="order-sidebar">
            <Link className="home-link" to="/"><FontAwesomeIcon icon={faHome} /></Link>
            <div className="header"><h4>USER</h4></div>
            <div className="link-list">
                <Link className="sidebar-link" to={`${url}`}><FontAwesomeIcon icon={faShoppingBasket} /> Order List</Link>
                <Link className="sidebar-link" to={`${url}/review`}><FontAwesomeIcon icon={faCommentDots} /> Review</Link>
            </div>
        </div>
    );
};

export default OrderSidebar;