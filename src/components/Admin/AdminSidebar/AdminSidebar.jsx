import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import './AdminSidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faPlus, faUserPlus, faThLarge, faHome } from '@fortawesome/free-solid-svg-icons';

const AdminSidebar = () => {
    return (
        <div className="admin-sidebar">
            <Link style={{color: 'orangered' }} to="/"><FontAwesomeIcon icon={faHome} /></Link>
            <h4 className="text-light">Admin Panel</h4>
            <div className="sidebar-container">
                <Link className="sidebar-link" to="/admin"><FontAwesomeIcon icon={faShoppingBasket} /> Order List</Link>
                <Link className="sidebar-link" to="/admin/addService"><FontAwesomeIcon icon={faPlus} /> Add Service</Link>
                <Link className="sidebar-link" to="/admin/makeAdmin"><FontAwesomeIcon icon={faUserPlus} /> Make Admin</Link>
                <Link className="sidebar-link" to="/admin/manageService"><FontAwesomeIcon icon={faThLarge} /> Manage Service</Link>
            </div>
        </div>
    );
};

export default AdminSidebar;