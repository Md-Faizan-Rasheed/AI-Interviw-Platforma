// // import React from "react";

// const Home = () => {
//   return (
//     <div className="text-center py-20 px-6">
//       <h1 className="text-5xl font-bold mb-4">
//         {/* Simplify Your Hiring with */}
//          <span className="text-purple-600">
//           {/* AI Video Interviews */}
//           </span>
//       </h1>
//       <p className="text-lg text-gray-600 mb-8">
//         {/* Interview, vet, and hire thousands of job applicants through our AI-powered video interviewer in under 3 minutes & 95 languages. */}
//       </p>
//       <div className="flex justify-center space-x-4">
//         <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600">
//           Schedule Demo
//         </button>
//         <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200">
//           {/* 14 Days Free Trial */}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;


import React from 'react';
import { Zap, Users, BarChart3, CheckCircle, ArrowRight, Sparkles, Clock, Globe } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-lime-50 border border-green-200 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">AI-Powered Interview Platform</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Simplify Your Hiring with{' '}
            <span className="bg-gradient-to-r from-green-600 to-lime-500 bg-clip-text text-transparent">
              AI Video Interviews
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Interview, vet, and hire thousands of job applicants through our AI-powered video interviewer in under 3 minutes & 95 languages.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button className="group bg-gradient-to-r from-green-600 to-lime-500 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 font-semibold">
              Schedule Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white text-gray-700 px-8 py-4 rounded-xl shadow-md hover:shadow-lg border border-gray-200 hover:border-green-300 transition-all duration-300 font-semibold">
              14 Days Free Trial
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Setup in 5 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Clock, label: 'Average Interview Time', value: '< 3 min' },
            { icon: Globe, label: 'Languages Supported', value: '95+' },
            { icon: Users, label: 'Candidates Interviewed', value: '10,000+' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <stat.icon className="w-10 h-10 text-green-600 mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to hire smarter
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Streamline your entire hiring process with AI-powered automation and intelligent candidate evaluation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              title: 'AI Video Interviews',
              description: 'Automated video interviews with intelligent question generation and real-time candidate assessment.'
            },
            {
              icon: Users,
              title: 'Candidate Management',
              description: 'Organize and track all candidates in one place with detailed profiles and interview history.'
            },
            {
              icon: BarChart3,
              title: 'Analytics & Reports',
              description: 'Get comprehensive evaluation reports with ratings, insights, and hiring recommendations.'
            },
            {
              icon: CheckCircle,
              title: 'Resume Processing',
              description: 'Upload and automatically parse resumes to extract key candidate information instantly.'
            },
            {
              icon: Sparkles,
              title: 'Smart Job Posting',
              description: 'Create and manage job listings with AI-optimized descriptions to attract top talent.'
            },
            {
              icon: Globe,
              title: 'Multi-language Support',
              description: 'Conduct interviews in 95+ languages to reach a global talent pool effortlessly.'
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-lime-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-green-600 to-lime-500 rounded-3xl p-12 text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to transform your hiring process?
          </h2>
          <p className="text-lg text-green-50 mb-8 max-w-2xl mx-auto">
            Join hundreds of companies already using Kerplunk to find and hire the best talent faster.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-green-600 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl font-semibold hover:scale-105 transition-transform">
              Get Started Free
            </button>
            <button className="bg-green-700 text-white px-8 py-4 rounded-xl shadow-lg hover:bg-green-800 font-semibold border-2 border-green-400">
              Talk to Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;