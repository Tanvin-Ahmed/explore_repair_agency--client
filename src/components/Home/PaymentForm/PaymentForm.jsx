import React, { useContext, useState } from 'react';
import { appContext } from '../../../App';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './PaymentForm.css';
import axios from 'axios';

const PaymentForm = ({ chosenItem }) => {
    const { loggedInUser } = useContext(appContext);
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(null);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setPaymentError(error.message);
            setPaymentSuccess(null);
        } else {
            setPaymentError(null);
            // console.log('payment', paymentMethod);

            if (chosenItem) {
                const newOrder = { 
                    email: loggedInUser?.email,
                    paymentId: paymentMethod?.id,
                    category: chosenItem.category,
                    serviceName: chosenItem?.serviceName,
                    fee: chosenItem?.fee,
                    status: 'pending'
                 };
                axios.post('https://serene-caverns-03356.herokuapp.com/placeOrder', newOrder)
                    .then(data => {
                        setPaymentSuccess(paymentMethod.id);
                    })
                    .catch(err => setPaymentError('Something went wrong, please try again'));

            } else {
                alert('Choose service first');
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" className="form-control my-2" value={loggedInUser.displayName} />
                <input type="email" className="form-control my-2" value={loggedInUser.email} />
                <input type="text" className="form-control my-2" value={chosenItem?.serviceName} />
                <CardElement />
                <button className="user-payment-btn form-control mt-4 mb-3" type="submit" disabled={!stripe}>
                    Pay {chosenItem?.fee}$
                </button>
            </form>
            {
                paymentError && <p className="text-danger">{paymentError}</p>
            }
            {
                paymentSuccess && <p className="text-success">Payment was successful</p>
            }
        </div>
    );
};

export default PaymentForm;