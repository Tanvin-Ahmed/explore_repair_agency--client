import React, { useContext, useEffect, useState } from 'react';
import { appContext } from '../../../App';
import TestimonialsBody from '../TestimonialsBody/TestimonialsBody';
import './Testimonials.css';

const Testimonials = () => {

    const { loadingSpinner, setLoadingSpinner } = useContext(appContext);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        setLoadingSpinner(true);
        fetch('https://serene-caverns-03356.herokuapp.com/getAllReview')
            .then(res => res.json())
            .then(data => {
                setReviews(data);
                setLoadingSpinner(false);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <section className="testimonials">
            <div className="container">
                <div className="header text-center mb-5">
                    <h5 style={{ color: 'orangered' }}>TESTIMONIALS</h5>
                    <h1 className="header-color">What Our Clients Saying?</h1>
                </div>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {
                        loadingSpinner ? <div className="text-center">

                        </div> : reviews.map(review => <TestimonialsBody key={review._id} review={review} />)
                    }
                </div>
            </div>
        </section>
    );
};

export default Testimonials;