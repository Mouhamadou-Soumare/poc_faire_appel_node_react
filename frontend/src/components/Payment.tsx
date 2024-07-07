import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const Payment: React.FC = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

  const handlePaymentSuccess = async (details: any, data: any) => {
    const token = Cookies.get('auth_token');
    try {
      const response = await axios.post(
        `${baseUrl}/cotisations`,
        {
          montant: 200,
          datePaiement: new Date(),
          statut: 'payé',
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Paiement effectué avec succès');
    } catch (error: any) {
      setMessage('Échec du paiement');
    }
  };

  return (
    <div className="bg-white flex flex-column h-screen pb-0">
      <div className="mx-auto max-w-7xl px-24 lg:px-44 flex-sportsync items-center content-center">
        <h2 className="text-4xl text-center pb-12">Payer maintenant ma cotisation</h2>
        {message && <div style={{ color: message.includes('succès') ? 'green' : 'red' }}>{message}</div>}
        <div className="paypal-buttons-container">
          <PayPalScriptProvider options={{ clientId: "ARhmJT_kLoCMLyNw-e2AvtYCeKBvqqqaUgoijICwPRPeLkpnxS6JUFrK0cYklPsqgdK-vmmQJpPbdEB_" }}>
            <PayPalButtons
              style={{ layout: 'vertical' }}
              createOrder={(data, actions) => {
                if (!actions.order) {
                  return Promise.reject(new Error("actions.order is undefined"));
                }
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [{
                    amount: {
                      currency_code: 'USD',
                      value: '200',
                    },
                  }],
                });
              }}
              onApprove={(data, actions) => {
                if (!actions.order) {
                  return Promise.reject(new Error("actions.order is undefined"));
                }
                return actions.order.capture().then(details => {
                  handlePaymentSuccess(details, data);
                });
              }}
              onError={(err) => {
                setMessage('Échec du paiement');
              }}
            />
          </PayPalScriptProvider>
        </div>
        {message.includes('succès') && (
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Aller au tableau de bord
          </button>
        )}
      </div>
    </div>
  );
};

export default Payment;
