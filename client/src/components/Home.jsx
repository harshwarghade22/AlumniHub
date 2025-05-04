import React from 'react';
import { Users, Briefcase, GraduationCap, Calendar, Globe, Award, MessageSquare } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Modern gradient background */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24">
        <div className="absolute opacity-10 top-0 left-0 w-full h-full bg-[url('/api/placeholder/1200/800')] bg-cover bg-center"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to Alumni Network</h1>
            <p className="text-xl mb-8 text-blue-100">Connect, Collaborate, and Grow with Your Alumni Community</p>
            <button className="bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
              Join Network
            </button>
          </div>
        </div>
        {/* Decorative element */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-16 text-gray-50 fill-current">
            <path d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,90.7C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section - Card layout */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Users className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Networking</h3>
              <p className="text-gray-600">Connect with alumni across different industries and locations.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Briefcase className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Job Opportunities</h3>
              <p className="text-gray-600">Access exclusive job postings and career opportunities.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <div className="bg-purple-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <GraduationCap className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Mentorship</h3>
              <p className="text-gray-600">Get guidance from experienced alumni in your field.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <div className="bg-orange-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Calendar className="text-orange-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Events</h3>
              <p className="text-gray-600">Participate in alumni meets and professional workshops.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section - With animations */}
      <section className="py-16 bg-gradient-to-r from-gray-100 to-gray-200">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Users className="text-blue-600" size={28} />
                <h2 className="text-4xl font-bold ml-2 text-gray-800">5000+</h2>
              </div>
              <p className="text-gray-600 font-medium">Alumni Members</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Globe className="text-green-600" size={28} />
                <h2 className="text-4xl font-bold ml-2 text-gray-800">100+</h2>
              </div>
              <p className="text-gray-600 font-medium">Countries</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Briefcase className="text-purple-600" size={28} />
                <h2 className="text-4xl font-bold ml-2 text-gray-800">1000+</h2>
              </div>
              <p className="text-gray-600 font-medium">Job Opportunities</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Award className="text-orange-600" size={28} />
                <h2 className="text-4xl font-bold ml-2 text-gray-800">500+</h2>
              </div>
              <p className="text-gray-600 font-medium">Success Stories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section - New addition */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Alumni Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="flex items-center mb-4">
                <img src="/api/placeholder/64/64" alt="Alumni" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-800">Sarah Johnson</h4>
                  <p className="text-gray-500 text-sm">Class of 2018</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"The alumni network helped me secure my dream job at a Fortune 500 company. The mentorship I received was invaluable."</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="flex items-center mb-4">
                <img src="/api/placeholder/64/64" alt="Alumni" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-800">Michael Chen</h4>
                  <p className="text-gray-500 text-sm">Class of 2016</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"I found my business partner through the alumni network. Today, our startup has raised over $2 million in funding."</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="flex items-center mb-4">
                <img src="/api/placeholder/64/64" alt="Alumni" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-800">Priya Patel</h4>
                  <p className="text-gray-500 text-sm">Class of 2019</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"The workshops and networking events organized by the alumni association gave me the confidence to pivot my career into tech."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - More engaging */}
      <section className="py-20 px-6 bg-indigo-700 text-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Connect with Your Alumni Community?</h2>
            <p className="text-xl mb-8 text-indigo-100">Join thousands of alumni who are growing their careers and expanding their networks.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-700 hover:bg-indigo-50 font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300">
                Get Started
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-700 font-semibold py-3 px-8 rounded-lg transition duration-300 flex items-center justify-center">
                <MessageSquare className="mr-2" size={20} />
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;