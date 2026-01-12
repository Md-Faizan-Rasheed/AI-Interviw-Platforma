import React from 'react';
import { Target, Heart, Zap, Users, Globe, TrendingUp, Award, Shield, Lightbulb, Rocket } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-lime-50 border border-green-200 rounded-full px-4 py-2 mb-6">
            <Heart className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Our Story</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Revolutionizing Hiring with{' '}
            <span className="bg-gradient-to-r from-green-600 to-lime-500 bg-clip-text text-transparent">
              Intelligent AI
            </span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed">
            We're on a mission to make hiring faster, fairer, and more efficient for companies worldwide through the power of artificial intelligence.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-lime-100 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              To empower organizations of all sizes to identify and hire the best talent efficiently through AI-powered interview technology that eliminates bias and reduces time-to-hire by 70%.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-lime-100 rounded-xl flex items-center justify-center mb-6">
              <Lightbulb className="w-7 h-7 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              To become the global standard for AI-driven recruitment, making quality hiring accessible to every company while creating opportunities for candidates worldwide, regardless of geography or background.
            </p>
          </div>
        </div>
      </div>

      {/* The Story */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Kerplunk Was Born
            </h2>
            <p className="text-lg text-gray-600">
              From frustration to innovation
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-lime-50 rounded-3xl p-10 border border-green-100">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Kerplunk was founded in 2023 by a team of HR professionals and AI engineers who experienced firsthand the challenges of modern recruitment. After conducting hundreds of interviews manually and watching qualified candidates slip through the cracks due to time constraints, we knew there had to be a better way.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We envisioned a platform where companies could interview thousands of candidates efficiently while maintaining quality and fairness. Where language barriers wouldn't prevent great talent from being discovered. Where bias could be minimized through objective AI evaluation.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Today, Kerplunk serves hundreds of companies across 40+ countries, having conducted over 10,000 AI-powered interviews. We're just getting started on our journey to transform global hiring.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we build and every decision we make
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Shield,
              title: 'Fairness',
              description: 'We believe in unbiased hiring that gives every candidate an equal opportunity to showcase their skills.'
            },
            {
              icon: Zap,
              title: 'Innovation',
              description: 'We continuously push boundaries with cutting-edge AI technology to solve real hiring challenges.'
            },
            {
              icon: Users,
              title: 'People-First',
              description: 'Technology serves people, not the other way around. We design with empathy for both recruiters and candidates.'
            },
            {
              icon: Award,
              title: 'Excellence',
              description: 'We set high standards for quality, accuracy, and reliability in every aspect of our platform.'
            }
          ].map((value, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-300 text-center group">
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-lime-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <value.icon className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-green-600 to-lime-500 rounded-3xl p-12 shadow-xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-lg text-green-50">
              Making a real difference in recruitment worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: '10,000+', label: 'Interviews Conducted' },
              { icon: Globe, value: '40+', label: 'Countries Served' },
              { icon: TrendingUp, value: '70%', label: 'Faster Hiring Process' },
              { icon: Award, value: '95+', label: 'Languages Supported' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-green-50 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Companies Choose Kerplunk
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're more than just an interview platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Rocket,
              title: 'Speed & Scale',
              description: 'Interview thousands of candidates in the time it takes to manually screen dozens. Scale your hiring without scaling your team.'
            },
            {
              icon: Shield,
              title: 'Unbiased Evaluation',
              description: 'AI-powered assessments focus on skills and qualifications, reducing unconscious bias in the hiring process.'
            },
            {
              icon: Globe,
              title: 'Global Reach',
              description: 'Break down language barriers with support for 95+ languages. Access talent from anywhere in the world.'
            },
            {
              icon: TrendingUp,
              title: 'Data-Driven Insights',
              description: 'Comprehensive analytics and reports help you make informed hiring decisions backed by objective data.'
            },
            {
              icon: Zap,
              title: 'Easy Integration',
              description: 'Set up in minutes, not weeks. Seamlessly integrate with your existing recruitment workflow and ATS.'
            },
            {
              icon: Award,
              title: 'Enterprise Security',
              description: 'Bank-level encryption and compliance with global data protection standards keep your data safe.'
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-lime-100 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-green-50 to-lime-50 rounded-3xl p-12 text-center border border-green-100">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Join Us on Our Journey
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Be part of the recruitment revolution. Start using Kerplunk today and experience the future of hiring.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-gradient-to-r from-green-600 to-lime-500 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl font-semibold hover:scale-105 transition-transform">
              Start Free Trial
            </button>
            <button className="bg-white text-gray-700 px-8 py-4 rounded-xl shadow-md hover:shadow-lg border border-gray-200 hover:border-green-300 font-semibold transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;