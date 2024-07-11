import React, { useState } from 'react';
import axios from 'axios';

const TripPlanner = () => {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [days, setDays] = useState('');
  const [tripPlan, setTripPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePlanTrip = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:5000/api/trip/plan`, {
        country,
        city,
        days,
      });
      setTripPlan(response.data);
      setError('');
    } catch (error) {
      setError(error.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Travel Wise</h2>
      <input
        type="text"
        placeholder="Enter country name"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        placeholder="Enter number of days"
        value={days}
        onChange={(e) => setDays(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handlePlanTrip}
        className={`w-full py-2 px-4 bg-blue-500 text-white rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Plan Trip'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {tripPlan && (
        <div className="mt-8">
          <strong>Generated Trip Plan:</strong>
          <p>{tripPlan.plan}</p>
          <strong>Top Places to Visit:</strong>
          <div className="grid grid-cols-2 gap-4">
            {tripPlan.touristPlaces.map((item) => (
              <div key={item.name} className="border rounded shadow">
                {item.image && (
                  <img
                    alt={item.name}
                    src={item.image}
                    className="h-40 w-full object-cover rounded-t"
                  />
                )}
                <div className="p-2">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                </div>
              </div>
            ))}
          </div>
          <strong className="mt-4 block">Top Restaurants:</strong>
          <div className="grid grid-cols-2 gap-4">
            {tripPlan.restaurants.map((item) => (
              <div key={item.name} className="border rounded shadow">
                {item.image && (
                  <img
                    alt={item.name}
                    src={item.image}
                    className="h-40 w-full object-cover rounded-t"
                  />
                )}
                <div className="p-2">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                </div>
              </div>
            ))}
          </div>
          <strong className="mt-4 block">Top Hotels:</strong>
          <div className="grid grid-cols-2 gap-4">
            {tripPlan.hotels.map((item) => (
              <div key={item.name} className="border rounded shadow">
                {item.image && (
                  <img
                    alt={item.name}
                    src={item.image}
                    className="h-40 w-full object-cover rounded-t"
                  />
                )}
                <div className="p-2">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TripPlanner;
