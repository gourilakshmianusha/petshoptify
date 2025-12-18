import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Heart } from 'lucide-react';

const OrderSuccess: React.FC = () => {
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Generate a mock order ID
    const id = 'PWR-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    setOrderId(id);
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8 animate-fade-in">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-green-100 rounded-full scale-150 animate-pulse opacity-50"></div>
          <div className="relative bg-white rounded-full p-6 shadow-xl text-green-500">
            <CheckCircle2 size={64} strokeWidth={1.5} />
          </div>
          {/* Confetti-like bits */}
          <div className="absolute -top-4 -right-4 text-orange-400 animate-bounce">✨</div>
          <div className="absolute -bottom-2 -left-6 text-blue-400 animate-bounce delay-150">🐶</div>
          <div className="absolute top-8 -left-8 text-yellow-400 animate-bounce delay-300">🐱</div>
        </div>

        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-3">Order Confirmed!</h1>
          <p className="text-slate-500 text-lg">
            Thanks for shopping with us! We're preparing your pet's treats with love.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 font-medium">Order Number</span>
            <span className="text-slate-900 font-bold font-mono">{orderId}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 font-medium">Delivery Est.</span>
            <span className="text-slate-900 font-bold">2-4 Business Days</span>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center gap-3 text-left">
            <div className="bg-slate-50 p-3 rounded-2xl text-slate-400">
              <Package size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tracking</p>
              <p className="text-sm text-slate-600">Confirmation sent to your email</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link 
            to="/shop" 
            className="flex-1 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg"
          >
            Keep Shopping <ArrowRight size={18} />
          </Link>
          <button 
            onClick={() => alert("Check your email!")}
            className="flex-1 bg-white border border-slate-200 text-slate-600 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all"
          >
            Track Order
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-slate-400 text-sm font-medium">
          <Heart size={14} className="text-red-400 fill-current" />
          <span>Pawradise Team</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;