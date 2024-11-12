import React from 'react';
import { X } from 'lucide-react';

const SubscriptionScreen = () => {
  const plans = [
    {
      name: 'Free',
      price: 0,
      credits: 'Free credits daily by logging in',
      features: [],
      buttonVariant: 'secondary',
      bgColor: 'bg-zinc-800',
    },
    {
      name: 'Basic',
      price: 25,
      credits: '500 Credits per month',
      pricePerCredit: '$1.00 per 20 Credits',
      features: [
        'Daily logging in credits',
        'Image Upscale',
        'Watermark Removal',
      ],
      buttonVariant: 'primary',
      bgColor: 'bg-blue-800/20',
    },
    {
      name: 'Pro',
      price: 45,
      credits: '1000 Credits per month',
      pricePerCredit: '$0.90 per 20 Credits',
      features: [
        'Daily logging in credits',
        'Image Upscale',
        'Watermark Removal',
        'Priority access to new features',
      ],
      buttonVariant: 'primary',
      bgColor: 'bg-emerald-800/20',
    },
    {
      name: 'Gold',
      price: 100,
      credits: '2500 Credits per month',
      pricePerCredit: '$0.80 per 20 Credits',
      features: [
        'Daily logging in credits',
        'Image Upscale',
        'Watermark Removal',
        'Priority access to new features',
      ],
      buttonVariant: 'primary',
      bgColor: 'bg-yellow-700/20',
    },
  ];

  const user = {
    userName: "XAI1892",
    plan: "Pro - Monthly Subscription",
    renewal: "11/22/2024"
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with user info */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-zinc-700 rounded-full" />
            <div>
              <h2 className="text-lg font-medium">{user.userName}</h2>
              <div className="text-sm text-zinc-400">
                <div>Membership Subscriptions:</div>
                <div>{user.plan}{' '}(Renews on {user.renewal})</div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm mr-20 text-zinc-400">My Credits:</div>
            <div className="flex items-center gap-2">
              <span>96.00</span>
              <div className="text-blue-400 text-sm">Purchase Credits</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg p-6 ${plan.bgColor} flex flex-col`}
            >
              <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
              <div className="text-2xl font-bold mb-4">
                $ {plan.price} <span className="text-sm font-normal">per month</span>
              </div>
              
              <div className="text-sm text-zinc-300 mb-2">{plan.credits}</div>
              {plan.pricePerCredit && (
                <div className="text-sm text-zinc-400 mb-4">{plan.pricePerCredit}</div>
              )}
              
              <div className="flex-grow">
                {plan.features.map((feature, index) => (
                  <div key={index} className="text-sm text-zinc-300 mb-2">
                    {feature}
                  </div>
                ))}
              </div>
              
              <button
                className={`w-full py-2 px-4 rounded-md mt-4 
                  ${plan.buttonVariant === 'primary' 
                    ? 'bg-blue-500 hover:bg-blue-600' 
                    : 'bg-zinc-700 hover:bg-zinc-600'}`}
              >
                {plan.name}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 text-sm text-zinc-400">
          View{' '}
          <a href="#" className="text-blue-400 hover:underline">
            Terms of Paid Service
          </a>{' '}
          or{' '}
          <a href="#" className="text-blue-400 hover:underline">
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionScreen;