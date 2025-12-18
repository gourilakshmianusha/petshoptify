import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, ShieldCheck, Lock, ChevronRight, Loader2 } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutProps {
  cartItems: CartItem[];
  clearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, clearCart }) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      navigate('/order-success');
    }, 2500);
  };

  if (cartItems.length === 0 && !isProcessing) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-6">Add some goodies for your pets first!</p>
        <button 
          onClick={() => navigate('/shop')}
          className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition-all"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-slate-500 hover:text-orange-600 mb-8 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" /> Back
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-orange-100 p-2 rounded-xl text-orange-600">
                    <Truck size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Shipping Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input 
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                      placeholder="alex@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                    <input 
                      required
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                    <input 
                      required
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Street Address</label>
                    <input 
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">City</label>
                    <input 
                      required
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Zip Code</label>
                    <input 
                      required
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
                      <CreditCard size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Payment</h2>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 w-10 bg-slate-100 rounded flex items-center justify-center grayscale text-[8px] font-bold">VISA</div>
                    <div className="h-6 w-10 bg-slate-100 rounded flex items-center justify-center grayscale text-[8px] font-bold">MC</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Card Number</label>
                    <div className="relative">
                      <input 
                        required
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        maxLength={19}
                        placeholder="0000 0000 0000 0000"
                        className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 pl-11 focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Expiry Date</label>
                      <input 
                        required
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        placeholder="MM / YY"
                        maxLength={5}
                        className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">CVC</label>
                      <input 
                        required
                        type="password"
                        name="cvc"
                        value={formData.cvc}
                        onChange={handleInputChange}
                        placeholder="•••"
                        maxLength={3}
                        className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-2 text-slate-400">
                  <ShieldCheck size={18} className="text-green-500" />
                  <span className="text-xs font-medium">Your payment details are encrypted and securely processed.</span>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full bg-orange-600 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-orange-100 hover:bg-orange-700 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:bg-slate-300 disabled:shadow-none"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" /> Processing Payment...
                  </>
                ) : (
                  <>Complete Purchase — ${total.toFixed(2)}</>
                )}
              </button>
            </form>
          </div>

          {/* Sticky Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-24">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center justify-between">
                Order Summary
                <span className="text-sm font-medium text-slate-400">{cartItems.length} Items</span>
              </h2>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 mb-6 scrollbar-hide">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-50 border border-slate-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-800 truncate">{item.name}</h4>
                      <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-slate-900 mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-100">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold uppercase text-[10px] tracking-wider">Free</span>
                </div>
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Estimated Tax</span>
                  <span className="font-medium text-slate-800">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-slate-900 pt-4 border-t border-slate-200">
                  <span>Total</span>
                  <span className="text-orange-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-orange-50 rounded-2xl flex items-start gap-3">
                <div className="bg-orange-600 p-1.5 rounded-lg text-white shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3" />
                </div>
                <p className="text-[11px] text-orange-800 font-medium leading-relaxed">
                  You're helping us make tails wag! Every purchase supports our mission to provide organic, healthy pet care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Sparkles: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
  </svg>
);

export default Checkout;