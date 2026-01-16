import { useState } from 'react';
import { Check, ArrowRight, Sparkles, Zap, Shield, Users } from 'lucide-react';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const pricingPlans = [
    {
      name: 'Starter',
      price: { monthly: 49, annual: 470 },
      description: 'Perfect for small teams getting started with AI interviews',
      icon: <Users className="w-6 h-6" />,
      features: [
        'Up to 50 interviews/month',
        'Basic AI interview assessment',
        'Standard video recording',
        'Email support',
        'Basic analytics dashboard',
        '2 team members',
        'Mobile-friendly interface'
      ],
      cta: 'Start Free Trial',
      popular: false
    },
    {
      name: 'Professional',
      price: { monthly: 149, annual: 1430 },
      description: 'Ideal for growing companies scaling their hiring',
      icon: <Zap className="w-6 h-6" />,
      features: [
        'Up to 200 interviews/month',
        'Advanced AI evaluation',
        'Custom interview templates',
        'Priority support (24/7)',
        'Advanced analytics & insights',
        'Unlimited team members',
        'ATS integrations',
        'Custom branding',
        'API access'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: { monthly: 'Custom', annual: 'Custom' },
      description: 'For large organizations with complex needs',
      icon: <Shield className="w-6 h-6" />,
      features: [
        'Unlimited interviews',
        'Enterprise AI models',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced security & compliance',
        'White-label solution',
        'Custom workflows',
        'SLA guarantee',
        'On-premise deployment',
        'Training & onboarding'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/20 to-lime-50/20 py-12 px-4 sm:px-6 lg:px-8 ">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-12 lg:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-6">
          <Sparkles className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium text-gray-700">Simple, transparent pricing</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 lg:mb-6 px-4">
          Choose the perfect plan for
          <span className="block mt-2 bg-gradient-to-r from-green-500 to-lime-500 bg-clip-text text-transparent">
            your hiring needs
          </span>
        </h1>
        
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-8 lg:mb-12 px-4">
          Scale your recruitment with AI-powered interviews. No hidden fees, cancel anytime.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center gap-2 sm:gap-4 p-1.5 sm:p-2 bg-white rounded-2xl shadow-sm border border-gray-100">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-semibold text-sm sm:text-base transition-all ${
              billingCycle === 'monthly'
                ? 'bg-gradient-to-r from-green-500 to-lime-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-semibold text-sm sm:text-base transition-all relative ${
              billingCycle === 'annual'
                ? 'bg-gradient-to-r from-green-500 to-lime-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Annual
            <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full font-medium">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${
              plan.popular ? 'ring-2 ring-green-500 transform lg:scale-105' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-green-500 to-lime-500 text-white px-4 py-1.5 rounded-bl-2xl text-sm font-semibold">
                Most Popular
              </div>
            )}

            <div className="p-6 lg:p-8">
              {/* Plan Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-green-100 to-lime-100 text-green-600 mb-4">
                {plan.icon}
              </div>

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 text-sm mb-6 min-h-[40px]">{plan.description}</p>

              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  {typeof plan.price[billingCycle] === 'number' ? (
                    <>
                      <span className="text-4xl lg:text-5xl font-bold text-gray-900">
                        ${plan.price[billingCycle]}
                      </span>
                      <span className="text-gray-600">
                        /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                      </span>
                    </>
                  ) : (
                    <span className="text-4xl lg:text-5xl font-bold text-gray-900">
                      {plan.price[billingCycle]}
                    </span>
                  )}
                </div>
                {billingCycle === 'annual' && typeof plan.price[billingCycle] === 'number' && (
                  <p className="text-sm text-gray-500 mt-1">
                    ${Math.round(plan.price[billingCycle] / 12)}/month billed annually
                  </p>
                )}
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 mb-8 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-green-500 to-lime-500 text-white shadow-md hover:shadow-lg hover:scale-105'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Features */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-900 mb-4">Everything included:</p>
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-green-500 to-lime-500 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm p-6 lg:p-12">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: 'Can I switch plans anytime?',
              a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.'
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.'
            },
            {
              q: 'Is there a free trial?',
              a: 'Yes, all plans come with a 14-day free trial. No credit card required to start.'
            },
            {
              q: 'What happens if I exceed my interview limit?',
              a: 'You can purchase additional interview credits or upgrade to a higher plan at any time.'
            }
          ].map((faq, index) => (
            <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto text-center mt-16 bg-gradient-to-br from-green-500 to-lime-500 rounded-3xl p-8 lg:p-12 text-white shadow-xl">
        <h2 className="text-2xl lg:text-3xl font-bold mb-4">
          Still have questions?
        </h2>
        <p className="text-green-50 mb-8 max-w-2xl mx-auto">
          Our team is here to help you find the perfect plan for your organization
        </p>
        <button className="bg-white text-green-600 px-8 py-3.5 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl">
          Schedule a Demo
        </button>
      </div>
    </div>
  );
};

export default PricingPage;