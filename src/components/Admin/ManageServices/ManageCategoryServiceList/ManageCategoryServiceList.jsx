import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router';
import './ManageCategoryServiceList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ServiceUpdateModal from '../ServiceUpdateModal/ServiceUpdateModal';
import { Link } from 'react-router-dom';
import { appContext } from '../../../../App';
import { Spinner } from 'react-bootstrap';

const ManageCategoryServiceList = () => {
    const { loadingSpinner, setLoadingSpinner } = useContext(appContext);
    const { path, url } = useRouteMatch();
    const { category } = useParams();
    const [services, setService] = useState([]);
    const [chosenService, setChosenService] = useState({});
    const [isUpdate, setIsUpdate] = useState(false);


    const getServiceItems = () => {
        setLoadingSpinner(true);
        fetch(`https://serene-caverns-03356.herokuapp.com/serviceItem/${category}`)
            .then(res => res.json())
            .then(data => {
                setService(data);
                setLoadingSpinner(false);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getServiceItems();
    }, [isUpdate]);



    const handleDeleteServiceItem = (id) => {
        fetch(`https://serene-caverns-03356.herokuapp.com/deleteServiceItem/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => getServiceItems())
            .catch(err => alert('Something is wrong. Please try again'));
    }

    return (
        <div className="admin-manage-list">
            <Switch>
                <Route exact path={`${path}`}>
                    <h5 style={{ color: 'orangered' }}>Service list</h5>
                    {
                        loadingSpinner ? <div className="loadingSpinner">
                            <Spinner animation="border" variant="primary" />
                        </div> : <table className="table text-light table-hover" style={{ background: '#49678E' }}>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Fee</th>
                                    <th scope="col">Manage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    services.map((service, index) => (
                                        <tr key={service._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{service.serviceName}</td>
                                            <td>{service.fee}</td>
                                            <td>
                                                <Link to={`${url}/${service._id}`}><button onClick={() => { setChosenService(service) }} type="button" className="btn btn-outline-primary"><FontAwesomeIcon className="edit-icon" icon={faEdit} /></button></Link>
                                                <button onClick={() => handleDeleteServiceItem(service._id)} type="button" className="btn btn-outline-danger"><FontAwesomeIcon className="delete-icon" icon={faTrash} /></button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    }
                </Route>
                <Route path={`${path}/:id`}>
                    <ServiceUpdateModal key={chosenService._id} chosenService={chosenService} isUpdate={isUpdate} setIsUpdate={setIsUpdate} />
                </Route>
            </Switch>
        </div>
    );
};

export default ManageCategoryServiceList;