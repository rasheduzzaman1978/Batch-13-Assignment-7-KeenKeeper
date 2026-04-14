import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-pink-50 to-red-100 px-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-10 w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <span className="loading loading-spinner loading-lg text-orange-500"></span>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-3">
          Loading friends details...
        </h2>

        <p className="text-slate-500 text-sm leading-relaxed">
          Please wait while we prepare friends details information for you.
        </p>

        <div className="mt-6 flex justify-center gap-2">
          <span className="w-3 h-3 rounded-full bg-orange-400 animate-bounce"></span>
          <span className="w-3 h-3 rounded-full bg-pink-400 animate-bounce [animation-delay:0.2s]"></span>
          <span className="w-3 h-3 rounded-full bg-red-400 animate-bounce [animation-delay:0.4s]"></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;