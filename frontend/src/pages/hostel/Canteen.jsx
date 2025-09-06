import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

const Canteen = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('timetable');
  const [mealPlan, setMealPlan] = useState({});
  const [monthlyBill, setMonthlyBill] = useState({});
  const [mealHistory, setMealHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canEditTimetable, setCanEditTimetable] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Check if timetable can be edited (after 25th of month)
  useEffect(() => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    setCanEditTimetable(currentDay >= 25);
  }, []);

  useEffect(() => {
    const fetchCanteenData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock meal plan data
      const mockMealPlan = {
        breakfast: {
          1: { selected: true, time: '07:30' },
          2: { selected: true, time: '08:00' },
          3: { selected: false, time: '07:30' },
          4: { selected: true, time: '07:45' },
          5: { selected: true, time: '08:00' },
          6: { selected: false, time: '08:30' },
          7: { selected: true, time: '09:00' }
        },
        lunch: {
          1: { selected: true, type: 'veg', time: '12:30' },
          2: { selected: true, type: 'non-veg', time: '12:45' },
          3: { selected: true, type: 'veg', time: '13:00' },
          4: { selected: true, type: 'non-veg', time: '12:30' },
          5: { selected: true, type: 'veg', time: '12:45' },
          6: { selected: false, type: 'veg', time: '13:00' },
          7: { selected: true, type: 'veg', time: '12:30' }
        },
        dinner: {
          1: { selected: true, type: 'veg', time: '19:30' },
          2: { selected: true, type: 'non-veg', time: '20:00' },
          3: { selected: true, type: 'veg', time: '19:45' },
          4: { selected: true, type: 'non-veg', time: '20:00' },
          5: { selected: false, type: 'veg', time: '19:30' },
          6: { selected: true, type: 'veg', time: '20:15' },
          7: { selected: true, type: 'veg', time: '19:45' }
        }
      };

      // Mock monthly bill data
      const mockMonthlyBill = {
        totalAmount: 4250,
        breakdown: {
          breakfast: { count: 26, amount: 1300, rate: 50 },
          lunch: { 
            veg: { count: 15, amount: 1125, rate: 75 },
            nonVeg: { count: 12, amount: 1200, rate: 100 }
          },
          dinner: {
            veg: { count: 18, amount: 1350, rate: 75 },
            nonVeg: { count: 8, amount: 800, rate: 100 }
          }
        },
        month: 'January 2025',
        daysInMonth: 31,
        paidStatus: false
      };

      // Mock meal history
      const mockMealHistory = [
        { date: '2025-01-15', breakfast: true, lunch: 'veg', dinner: 'non-veg', amount: 225 },
        { date: '2025-01-14', breakfast: true, lunch: 'non-veg', dinner: 'veg', amount: 225 },
        { date: '2025-01-13', breakfast: false, lunch: 'veg', dinner: 'veg', amount: 150 },
        { date: '2025-01-12', breakfast: true, lunch: 'veg', dinner: false, amount: 125 },
        { date: '2025-01-11', breakfast: true, lunch: 'non-veg', dinner: 'veg', amount: 225 }
      ];

      setMealPlan(mockMealPlan);
      setMonthlyBill(mockMonthlyBill);
      setMealHistory(mockMealHistory);
      setLoading(false);
    };

    fetchCanteenData();
  }, [selectedMonth, selectedYear]);

  const updateMealPlan = (mealType, day, updates) => {
    setMealPlan(prev => ({
      ...prev,
      [mealType]: {
        ...prev[mealType],
        [day]: {
          ...prev[mealType][day],
          ...updates
        }
      }
    }));
  };

  const getDayName = (dayNumber) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[dayNumber - 1];
  };

  const getMealTypeColor = (type) => {
    switch (type) {
      case 'veg':
        return 'bg-success text-white';
      case 'non-veg':
        return 'bg-danger text-white';
      default:
        return 'bg-slate-500 text-white';
    }
  };

  const saveTimetable = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLoading(false);
    alert('Meal timetable updated successfully!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading canteen data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2 heading-font">
            {user?.name}'s Canteen Management
          </h1>
          <p className="text-slate-600">
            Manage your meal preferences and track monthly expenses
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Monthly Bill</p>
                <p className="text-2xl font-bold text-primary">₹{monthlyBill.totalAmount}</p>
              </div>
              <div className="bg-primary p-3 rounded-xl text-white text-2xl">
                💰
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Meals This Month</p>
                <p className="text-2xl font-bold text-success">
                  {monthlyBill.breakdown?.breakfast.count + 
                   monthlyBill.breakdown?.lunch.veg.count + 
                   monthlyBill.breakdown?.lunch.nonVeg.count +
                   monthlyBill.breakdown?.dinner.veg.count + 
                   monthlyBill.breakdown?.dinner.nonVeg.count}
                </p>
              </div>
              <div className="bg-success p-3 rounded-xl text-white text-2xl">
                🍽️
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Avg Daily Cost</p>
                <p className="text-2xl font-bold text-secondary">
                  ₹{Math.round(monthlyBill.totalAmount / monthlyBill.daysInMonth)}
                </p>
              </div>
              <div className="bg-secondary p-3 rounded-xl text-white text-2xl">
                📊
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Payment Status</p>
                <p className={`text-lg font-bold ${monthlyBill.paidStatus ? 'text-success' : 'text-danger'}`}>
                  {monthlyBill.paidStatus ? 'Paid' : 'Pending'}
                </p>
              </div>
              <div className={`p-3 rounded-xl text-white text-2xl ${monthlyBill.paidStatus ? 'bg-success' : 'bg-danger'}`}>
                {monthlyBill.paidStatus ? '✅' : '⏳'}
              </div>
            </div>
          </div>
        </div>

        {/* Timetable Edit Alert */}
        {!canEditTimetable && (
          <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4 mb-8">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">⏰</span>
              <div>
                <h3 className="font-semibold text-accent">Timetable Edit Restriction</h3>
                <p className="text-slate-600">
                  You can only modify your meal timetable after the 25th of each month for the next month's schedule.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-md mb-8">
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab('timetable')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'timetable'
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-slate-600 hover:text-primary'
              }`}
            >
              Meal Timetable
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'billing'
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-slate-600 hover:text-primary'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'history'
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-slate-600 hover:text-primary'
              }`}
            >
              Meal History
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'timetable' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">Weekly Meal Schedule</h2>
                  <button
                    onClick={saveTimetable}
                    disabled={!canEditTimetable}
                    className={`px-6 py-2 rounded-xl font-medium transition-colors ${
                      canEditTimetable
                        ? 'bg-primary hover:bg-primary-dark text-white'
                        : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Save Timetable
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Breakfast Section */}
                  <div className="border border-slate-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                      <span className="mr-2">🌅</span>
                      Breakfast (₹50 per meal)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                      {[1, 2, 3, 4, 5, 6, 7].map(day => (
                        <div key={day} className="border border-slate-200 rounded-lg p-4">
                          <h4 className="font-medium text-slate-800 mb-3">{getDayName(day)}</h4>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={mealPlan.breakfast?.[day]?.selected || false}
                                onChange={(e) => updateMealPlan('breakfast', day, { selected: e.target.checked })}
                                disabled={!canEditTimetable}
                                className="mr-2"
                              />
                              <span className="text-sm">Include</span>
                            </div>
                            <input
                              type="time"
                              value={mealPlan.breakfast?.[day]?.time || '08:00'}
                              onChange={(e) => updateMealPlan('breakfast', day, { time: e.target.value })}
                              disabled={!canEditTimetable || !mealPlan.breakfast?.[day]?.selected}
                              className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lunch Section */}
                  <div className="border border-slate-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                      <span className="mr-2">🌞</span>
                      Lunch (Veg: ₹75, Non-Veg: ₹100)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                      {[1, 2, 3, 4, 5, 6, 7].map(day => (
                        <div key={day} className="border border-slate-200 rounded-lg p-4">
                          <h4 className="font-medium text-slate-800 mb-3">{getDayName(day)}</h4>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={mealPlan.lunch?.[day]?.selected || false}
                                onChange={(e) => updateMealPlan('lunch', day, { selected: e.target.checked })}
                                disabled={!canEditTimetable}
                                className="mr-2"
                              />
                              <span className="text-sm">Include</span>
                            </div>
                            <select
                              value={mealPlan.lunch?.[day]?.type || 'veg'}
                              onChange={(e) => updateMealPlan('lunch', day, { type: e.target.value })}
                              disabled={!canEditTimetable || !mealPlan.lunch?.[day]?.selected}
                              className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                              <option value="veg">Vegetarian</option>
                              <option value="non-veg">Non-Vegetarian</option>
                            </select>
                            <input
                              type="time"
                              value={mealPlan.lunch?.[day]?.time || '12:30'}
                              onChange={(e) => updateMealPlan('lunch', day, { time: e.target.value })}
                              disabled={!canEditTimetable || !mealPlan.lunch?.[day]?.selected}
                              className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dinner Section */}
                  <div className="border border-slate-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                      <span className="mr-2">🌙</span>
                      Dinner (Veg: ₹75, Non-Veg: ₹100)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                      {[1, 2, 3, 4, 5, 6, 7].map(day => (
                        <div key={day} className="border border-slate-200 rounded-lg p-4">
                          <h4 className="font-medium text-slate-800 mb-3">{getDayName(day)}</h4>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={mealPlan.dinner?.[day]?.selected || false}
                                onChange={(e) => updateMealPlan('dinner', day, { selected: e.target.checked })}
                                disabled={!canEditTimetable}
                                className="mr-2"
                              />
                              <span className="text-sm">Include</span>
                            </div>
                            <select
                              value={mealPlan.dinner?.[day]?.type || 'veg'}
                              onChange={(e) => updateMealPlan('dinner', day, { type: e.target.value })}
                              disabled={!canEditTimetable || !mealPlan.dinner?.[day]?.selected}
                              className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                              <option value="veg">Vegetarian</option>
                              <option value="non-veg">Non-Vegetarian</option>
                            </select>
                            <input
                              type="time"
                              value={mealPlan.dinner?.[day]?.time || '19:30'}
                              onChange={(e) => updateMealPlan('dinner', day, { time: e.target.value })}
                              disabled={!canEditTimetable || !mealPlan.dinner?.[day]?.selected}
                              className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">Monthly Bill - {monthlyBill.month}</h2>
                  <div className="flex space-x-2">
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                      className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={i}>
                          {new Date(2025, i).toLocaleString('default', { month: 'long' })}
                        </option>
                      ))}
                    </select>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                      className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value={2025}>2025</option>
                      <option value={2024}>2024</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Meal Breakdown</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <div className="flex items-center">
                          <span className="mr-2">🌅</span>
                          <span>Breakfast ({monthlyBill.breakdown?.breakfast.count} meals)</span>
                        </div>
                        <span className="font-semibold">₹{monthlyBill.breakdown?.breakfast.amount}</span>
                      </div>

                      <div className="bg-white rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <span className="mr-2">🌞</span>
                            <span>Lunch</span>
                          </div>
                          <span className="font-semibold">₹{monthlyBill.breakdown?.lunch.veg.amount + monthlyBill.breakdown?.lunch.nonVeg.amount}</span>
                        </div>
                        <div className="ml-6 space-y-1 text-sm text-slate-600">
                          <div className="flex justify-between">
                            <span>• Vegetarian ({monthlyBill.breakdown?.lunch.veg.count} meals)</span>
                            <span>₹{monthlyBill.breakdown?.lunch.veg.amount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>• Non-Vegetarian ({monthlyBill.breakdown?.lunch.nonVeg.count} meals)</span>
                            <span>₹{monthlyBill.breakdown?.lunch.nonVeg.amount}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <span className="mr-2">🌙</span>
                            <span>Dinner</span>
                          </div>
                          <span className="font-semibold">₹{monthlyBill.breakdown?.dinner.veg.amount + monthlyBill.breakdown?.dinner.nonVeg.amount}</span>
                        </div>
                        <div className="ml-6 space-y-1 text-sm text-slate-600">
                          <div className="flex justify-between">
                            <span>• Vegetarian ({monthlyBill.breakdown?.dinner.veg.count} meals)</span>
                            <span>₹{monthlyBill.breakdown?.dinner.veg.amount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>• Non-Vegetarian ({monthlyBill.breakdown?.dinner.nonVeg.count} meals)</span>
                            <span>₹{monthlyBill.breakdown?.dinner.nonVeg.amount}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-200 mt-4 pt-4">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Total Amount</span>
                        <span className="text-primary">₹{monthlyBill.totalAmount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4">Payment Status</h3>
                      <div className={`p-4 rounded-lg ${monthlyBill.paidStatus ? 'bg-success/10 border border-success/20' : 'bg-danger/10 border border-danger/20'}`}>
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${monthlyBill.paidStatus ? 'text-success' : 'text-danger'}`}>
                            {monthlyBill.paidStatus ? 'Payment Completed' : 'Payment Pending'}
                          </span>
                          <span className="text-2xl">
                            {monthlyBill.paidStatus ? '✅' : '⏳'}
                          </span>
                        </div>
                      </div>

                      {!monthlyBill.paidStatus && (
                        <button className="w-full bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-xl font-medium transition-colors mt-4">
                          Pay Now - ₹{monthlyBill.totalAmount}
                        </button>
                      )}
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
                      <div className="space-y-3">
                        <button className="w-full bg-secondary hover:bg-secondary-dark text-white py-2 px-4 rounded-lg transition-colors">
                          Download Bill
                        </button>
                        <button className="w-full bg-accent hover:bg-yellow-500 text-white py-2 px-4 rounded-lg transition-colors">
                          Email Bill
                        </button>
                        <button className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 px-4 rounded-lg transition-colors">
                          View Previous Bills
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Recent Meal History</h2>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold text-slate-700">Date</th>
                        <th className="text-center py-4 px-6 font-semibold text-slate-700">Breakfast</th>
                        <th className="text-center py-4 px-6 font-semibold text-slate-700">Lunch</th>
                        <th className="text-center py-4 px-6 font-semibold text-slate-700">Dinner</th>
                        <th className="text-right py-4 px-6 font-semibold text-slate-700">Daily Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mealHistory.map((day, index) => (
                        <tr key={index} className="border-t border-slate-100 hover:bg-slate-50">
                          <td className="py-4 px-6">{new Date(day.date).toLocaleDateString()}</td>
                          <td className="py-4 px-6 text-center">
                            {day.breakfast ? (
                              <span className="inline-block w-6 h-6 bg-success rounded-full text-white text-xs flex items-center justify-center">✓</span>
                            ) : (
                              <span className="inline-block w-6 h-6 bg-slate-300 rounded-full text-xs flex items-center justify-center">-</span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-center">
                            {day.lunch ? (
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMealTypeColor(day.lunch)}`}>
                                {day.lunch === 'veg' ? 'V' : 'NV'}
                              </span>
                            ) : (
                              <span className="inline-block w-6 h-6 bg-slate-300 rounded-full text-xs flex items-center justify-center">-</span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-center">
                            {day.dinner ? (
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMealTypeColor(day.dinner)}`}>
                                {day.dinner === 'veg' ? 'V' : 'NV'}
                              </span>
                            ) : (
                              <span className="inline-block w-6 h-6 bg-slate-300 rounded-full text-xs flex items-center justify-center">-</span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-right font-semibold">₹{day.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canteen;
