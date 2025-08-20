// src/components/Hero.jsx
import { useState } from 'react';

export default function Hero() {
  const [email, setEmail] = useState('');

  return (
    <section className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 py-20 min-h-screen flex items-center">
      <div className="container mx-auto px-4 text-center">
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">
          <h1 className="text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Welcome to Our 
            <span className="text-yellow-300 block mt-2">Landing Page</span>
          </h1>
          <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed">
            This is a colorful hero section with a functional email input to test 
            <span className="text-yellow-200 font-semibold"> Tailwind CSS </span>
            integration!
          </p>
          
          <div className="max-w-lg mx-auto space-y-6">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-6 py-4 border-2 border-white/30 rounded-2xl bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-300/50 focus:border-yellow-300 transition-all duration-300 text-lg"
              />
            </div>
            
            <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Get Started 🚀
            </button>
            
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-2">Current email:</p>
              <p className="text-yellow-200 font-mono text-lg break-all">
                {email || 'Type something above...'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center space-x-4">
          <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse delay-150"></div>
          <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse delay-300"></div>
        </div>
      </div>
    </section>
  );
}