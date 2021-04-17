import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../PaymentForm/PaymentForm';
import './Payment.css';

const stripePromise = loadStripe('pk_test_51IeC0ZDONHijbFR8TfUiYsgD8mSBdBFGuaElmBH5pf3Fcq48BdfCwHsaoOY2Bu37L5gJ0WKUTI4W329jYEw6IoFa00MyqcX5tN');

const Payment = ({ chosenItem }) => {
    console.log(chosenItem);
    return (
        <div className="payment">
            <div className="container rounded">
                <h2 style={{ color: 'orangered' }} className="text-center mb-3">PAYMENT</h2>
                <Elements stripe={stripePromise}>
                    <PaymentForm key="3" chosenItem={chosenItem} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;