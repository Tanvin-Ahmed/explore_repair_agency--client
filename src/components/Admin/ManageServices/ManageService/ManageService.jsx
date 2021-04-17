import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import { Route, Switch, useRouteMatch } from 'react-router';
import { appContext } from '../../../../App';
import ManageCategory from '../ManageCategory/ManageCategory';
import ManageCategoryServiceList from '../ManageCategoryServiceList/ManageCategoryServiceList';
import './ManageService.css';

const ManageService = () => {
    const { loadingSpinner, setLoadingSpinner } = useContext(appContext);
    const { path } = useRouteMatch();
    const [allCategory, setAllCategory] = useState([]);

    const getAllCategory = () => {
        setLoadingSpinner(true);
        fetch('https://serene-caverns-03356.herokuapp.com/getAllCategory')
            .then(res => res.json())
            .then((data) => {
                setAllCategory(data);
                setLoadingSpinner(false);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getAllCategory();
    }, [])
    return (
        <div className="manage-service">
            <div className="container">
                <h2 className="header-color">Manage Service</h2>
                <Switch>
                    <Route exact path={path} >
                        {
                            loadingSpinner ? <div className="loadingSpinner">
                                 <Spinner animation="border" variant="primary" />
                            </div> : <div className="category"> 
                                <h5 style={{ color: 'orangered' }}>ManageCategory</h5>
                                {
                                    allCategory.map(category => <ManageCategory key={category._id} category={category.category} getAllCategory={getAllCategory} />)
                                }
                            </div>
                        }
                    </Route>
                    <Route path={`${path}/:category`}>
                        <ManageCategoryServiceList />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default ManageService;