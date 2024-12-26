import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import UseAuth from '../CustomHook/UseAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Helmet } from 'react-helmet-async';

const stripePromise = loadStripe('pk_test_51PQ08d06r4LiuGszyTNoicQqEbt2whQGaWQL0DULtI3bTQWj5rUVJ2jhV6E3VEc6dVCWOilQJilhwqrY7pULj3EU00VQryh9ga'); // Replace with your Stripe publishable key

const CheckoutForm = ({ amount, onPaymentSuccess, onPaymentError }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      onPaymentError(error.message);
      return;
    }

    try {
      const response = await fetch("https://assetflow-server-side.vercel.app/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount })
      });

      const paymentIntent = await response.json();

      if (paymentIntent.error) {
        onPaymentError(paymentIntent.error);
        return;
      }

      const confirmedPayment = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
        payment_method: paymentMethod.id
      });

      if (confirmedPayment.error) {
        onPaymentError(confirmedPayment.error.message);
      } else {
        onPaymentSuccess();
      }
    } catch (err) {
      onPaymentError(err.message);
    }
  };

  return (
    <div className='border border-purple px-1 py-2 rounded'>
      <CardElement />
      <button type="button" onClick={handleSubmit} className='bg-purple text-white font-semibold px-6 py-1 rounded mt-3 hover:bg-purple/95'>
        Pay Now
      </button>
    </div>
  );
};

const JoinAsAdmin = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false); // Track payment status

  const { createUser, updateUserProfile } = UseAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm();

  const toggleShow = () => setShow(!show);

  const isPasswordValid = (password) => {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    return (
      password.length >= 6 &&
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password)
    );
  };

  const notify = (message) => toast.error(message);

  const handlePaymentSuccess = () => {
    setPaymentStatus(true);  // Mark payment as successful
    toast.success("Payment Successful");
    setIsPaymentProcessing(false);
  };

  const handlePaymentError = (message) => {
    notify(message);
    setIsPaymentProcessing(false);
  };

  const onSubmit = async (data) => {
    if (!paymentStatus) {
      notify("You must complete the payment first.");
      return;
    }

    const { email, password, name, companyName, companyLogo, dateofbirth } = data;
    const addUser = {
      email,
      role: "Admin",
      name,
      companyName,
      companyLogo,
      dateofbirth,
      packages: selectedPackage,
      affiliateWith: companyName
    };

    if (isPasswordValid(password)) {
      try {
        await createUser(email, password);
        await updateUserProfile(name, companyLogo);

        const response = await fetch("https://assetflow-server-side.vercel.app/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(addUser)
        });

        if (!response.ok) {
          throw new Error(`Failed to Register: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (data.insertedId) {
          toast.success("Successfully Registered");
          navigate("/");
        }
      } catch (error) {
        console.error('Error during registration:', error);
        notify("Failed to Register");
      }
    } else {
      notify("Password should have 1 uppercase letter, 1 lowercase letter and 6 characters long");
    }
  };

  return (
    <div className='w-full h-full bg2'>
      <Helmet>
        <title>Join as Admin</title>
      </Helmet>
      <div className='w-full mx-auto max-w-md p-4 rounded-md sm:p-8'>
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            {/* Registration Form */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm">Name</label>
              <input
                type="text"
                id="name"
                {...register('name', { required: true })}
                className="w-full bg-transparent px-3 py-2 border border-black rounded-md"
                placeholder="Enter your name"
              />
              {errors.name && <span className="text-red-500">Name is required</span>}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">Email</label>
              <input
                type="email"
                id="email"
                {...register('email', { required: true })}
                className="w-full bg-transparent px-3 py-2 border border-black rounded-md"
                placeholder="Enter your email"
              />
              {errors.email && <span className="text-red-500">Email is required</span>}
            </div>
              <div className="space-y-2">
                <label htmlFor="companyName" className="block text-sm">Company Name</label>
                <input type="text" name="companyName" id="companyName" placeholder="Your Company Name" className="w-full bg-transparent px-3 py-2 border border-black rounded-md" {...register("companyName", { required: true })} />
                {errors.companyName && <span className='text-sm text-red-600 font-semibold'>This field is required</span>}
              </div>
              <div className="space-y-2">
                <label htmlFor="companyLogo" className="block text-sm">Company Logo</label>
                <input type="url" name="companyLogo" id="companyLogo" placeholder="Your Company Logo" className="w-full bg-transparent px-3 py-2 border border-black rounded-md" {...register("companyLogo", { required: false })} />
              </div>
              <div className="space-y-2">
                <label htmlFor="dateofbirth" className="block text-sm">Date of Birth</label>
                <input type="date" name="dateofbirth" id="dateofbirth" placeholder="Date of Birth" className="w-full bg-transparent px-3 py-2 border border-black rounded-md" {...register("dateofbirth", { required: true })} />
                {errors.dateofbirth && <span className='text-sm text-red-600 font-semibold'>This field is required</span>}
              </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm">Password</label>
              <input
                type="password"
                id="password"
                {...register('password', { required: true })}
                className="w-full bg-transparent px-3 py-2 border border-black rounded-md"
                placeholder="Enter your password"
              />
              {errors.password && <span className="text-red-500">Password is required</span>}
            </div>

            {/* Package Selection */}
            <div className="space-y-2">
              <label htmlFor="packages" className="block text-sm">Select Your Package</label>
              <select
                name="packages"
                id="packages"
                className="w-full bg-transparent px-3 py-2 border border-black rounded-md"
                onChange={(e) => setSelectedPackage(e.target.value)}
              >
                <option value="">Select Your Package</option>
                <option value="5">5 Members for $5</option>
                <option value="10">10 Members for $8</option>
                <option value="20">20 Members for $15</option>
              </select>
            </div>

            {/* Payment Section */}
            {selectedPackage && !paymentStatus && (
              <div className="mt-8">
                <h2 className="text-xl mb-4 font-bold">Payment</h2>
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    amount={parseInt(selectedPackage) * 100}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentError={handlePaymentError}
                  />
                </Elements>
              </div>
            )}

            {paymentStatus && <p className="text-green-600 font-bold">Payment Successful!</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full mt-5 px-8 py-3 font-semibold rounded-md bg-purple text-white`}
            disabled={!paymentStatus}
            style={{
              cursor: paymentStatus ? 'pointer' : 'not-allowed',
              opacity: paymentStatus ? '1' : '0.6',
            }}
          >
            {paymentStatus ? "Sign Up" : "Make Payment First"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default JoinAsAdmin;
