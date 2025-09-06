import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

const FeesSection = () => {
  const { user } = useAuth();
  const [feesData, setFeesData] = useState({});
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchFeesData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock fees data
      const mockFeesData = {
        studentInfo: {
          name: user?.name || 'John Doe',
          rollNo: 'CSE21001',
          semester: '6th Semester',
          branch: 'Computer Science Engineering',
          academicYear: '2024-25'
        },
        feeStructure: {
          totalFee: 150000,
          paidAmount: 105000,
          pendingAmount: 45000,
          scholarship: 20000,
          fine: 2500,
          nextDueDate: '2025-09-15'
        },
        installments: [
          {
            id: 1,
            name: 'Admission Fee',
            amount: 25000,
            dueDate: '2025-07-15',
            status: 'paid',
            paidDate: '2025-07-10',
            paidAmount: 25000,
            category: 'admission'
          },
          {
            id: 2,
            name: 'Tuition Fee - Semester 1',
            amount: 40000,
            dueDate: '2025-08-15',
            status: 'paid',
            paidDate: '2025-08-12',
            paidAmount: 40000,
            category: 'tuition'
          },
          {
            id: 3,
            name: 'Tuition Fee - Semester 2',
            amount: 40000,
            dueDate: '2025-09-15',
            status: 'pending',
            paidAmount: 0,
            category: 'tuition'
          },
          {
            id: 4,
            name: 'Lab Fee',
            amount: 15000,
            dueDate: '2025-09-15',
            status: 'pending',
            paidAmount: 0,
            category: 'lab'
          },
          {
            id: 5,
            name: 'Library Fee',
            amount: 5000,
            dueDate: '2025-09-15',
            status: 'pending',
            paidAmount: 0,
            category: 'library'
          },
          {
            id: 6,
            name: 'Hostel Fee',
            amount: 25000,
            dueDate: '2025-10-15',
            status: 'upcoming',
            paidAmount: 0,
            category: 'hostel'
          }
        ],
        breakdown: [
          { category: 'Tuition Fee', amount: 80000, paid: 40000, pending: 40000 },
          { category: 'Lab Fee', amount: 15000, paid: 0, pending: 15000 },
          { category: 'Library Fee', amount: 5000, paid: 0, pending: 5000 },
          { category: 'Hostel Fee', amount: 25000, paid: 0, pending: 25000 },
          { category: 'Admission Fee', amount: 25000, paid: 25000, pending: 0 }
        ]
      };

      // Mock payment history
      const mockPaymentHistory = [
        {
          id: 'TXN001',
          date: '2025-08-12',
          amount: 40000,
          category: 'Tuition Fee - Semester 1',
          method: 'UPI',
          status: 'success',
          transactionId: 'UPI2025081200001'
        },
        {
          id: 'TXN002',
          date: '2025-07-10',
          amount: 25000,
          category: 'Admission Fee',
          method: 'Net Banking',
          status: 'success',
          transactionId: 'NB2025071000001'
        },
        {
          id: 'TXN003',
          date: '2025-06-15',
          amount: 5000,
          category: 'Application Fee',
          method: 'Credit Card',
          status: 'success',
          transactionId: 'CC2025061500001'
        }
      ];

      setFeesData(mockFeesData);
      setPaymentHistory(mockPaymentHistory);
      setLoading(false);
    };

    fetchFeesData();
  }, [user]);

  const handlePayment = async () => {
    if (!paymentMethod || !paymentAmount || !selectedInstallment) {
      alert('Please fill all payment details');
      return;
    }

    setLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create new transaction
    const newTransaction = {
      id: `TXN${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      amount: parseInt(paymentAmount),
      category: selectedInstallment.name,
      method: paymentMethod,
      status: 'success',
      transactionId: `${paymentMethod.toUpperCase()}${Date.now()}`
    };

    // Update payment history
    setPaymentHistory(prev => [newTransaction, ...prev]);

    // Update installment status
    setFeesData(prev => ({
      ...prev,
      installments: prev.installments.map(inst =>
        inst.id === selectedInstallment.id
          ? {
              ...inst,
              status: parseInt(paymentAmount) >= inst.amount ? 'paid' : 'partial',
              paidAmount: parseInt(paymentAmount),
              paidDate: new Date().toISOString().split('T')[0]
            }
          : inst
      ),
      feeStructure: {
        ...prev.feeStructure,
        paidAmount: prev.feeStructure.paidAmount + parseInt(paymentAmount),
        pendingAmount: prev.feeStructure.pendingAmount - parseInt(paymentAmount)
      }
    }));

    // Reset form
    setShowPaymentModal(false);
    setSelectedInstallment(null);
    setPaymentMethod('');
    setPaymentAmount('');
    setLoading(false);
    
    alert('Payment successful! Transaction ID: ' + newTransaction.transactionId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-[#22C55E] text-white';
      case 'pending':
        return 'bg-[#EF4444] text-white';
      case 'partial':
        return 'bg-[#FACC15] text-white';
      case 'upcoming':
        return 'bg-slate-500 text-white';
      default:
        return 'bg-slate-500 text-white';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return '✅';
      case 'pending':
        return '⏳';
      case 'partial':
        return '⚠️';
      case 'upcoming':
        return '📅';
      default:
        return '❓';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'tuition':
        return '📚';
      case 'lab':
        return '🔬';
      case 'library':
        return '📖';
      case 'hostel':
        return '🏠';
      case 'admission':
        return '🎓';
      default:
        return '💰';
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'UPI':
        return '📱';
      case 'Net Banking':
        return '🏦';
      case 'Credit Card':
        return '💳';
      case 'Debit Card':
        return '💳';
      default:
        return '💰';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading fees information...</p>
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
            Fees Management
          </h1>
          <p className="text-slate-600">
            {feesData.studentInfo?.name} • {feesData.studentInfo?.rollNo} • {feesData.studentInfo?.academicYear}
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Fee</p>
                <p className="text-2xl font-bold text-slate-800">₹{(feesData.feeStructure?.totalFee / 1000).toFixed(0)}K</p>
              </div>
              <div className="bg-[#6366F1] p-3 rounded-xl text-white text-2xl">
                💰
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Paid Amount</p>
                <p className="text-2xl font-bold text-success">₹{(feesData.feeStructure?.paidAmount / 1000).toFixed(0)}K</p>
              </div>
              <div className="bg-[#22C55E] p-3 rounded-xl text-white text-2xl">
                ✅
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Pending Amount</p>
                <p className="text-2xl font-bold text-danger">₹{(feesData.feeStructure?.pendingAmount / 1000).toFixed(0)}K</p>
              </div>
              <div className="bg-[#EF4444] p-3 rounded-xl text-white text-2xl">
                ⏳
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Scholarship</p>
                <p className="text-2xl font-bold text-secondary">₹{(feesData.feeStructure?.scholarship / 1000).toFixed(0)}K</p>
              </div>
              <div className="bg-[#14B8A6] p-3 rounded-xl text-white text-2xl">
                🎓
              </div>
            </div>
          </div>
        </div>

        {/* Payment Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 secHeading-font">Payment Progress</h2>
          <div className="w-full bg-slate-200 rounded-full h-4 mb-4">
            <div 
              className="bg-gradient-to-r from-[#22C55E] to-[#6366F1] h-4 rounded-full transition-all" 
              style={{ width: `${(feesData.feeStructure?.paidAmount / feesData.feeStructure?.totalFee) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 roboto-font">
              Paid: ₹{feesData.feeStructure?.paidAmount?.toLocaleString()}
            </span>
            <span className="text-slate-600 roboto-font">
              {Math.round((feesData.feeStructure?.paidAmount / feesData.feeStructure?.totalFee) * 100)}% Complete
            </span>
            <span className="text-slate-600 roboto-font">
              Remaining: ₹{feesData.feeStructure?.pendingAmount?.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
          <div className="flex space-x-1 mb-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl transition-colors ${
                activeTab === 'overview' 
                  ? 'bg-[#6366F1] text-white' 
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Fee Overview
            </button>
            <button
              onClick={() => setActiveTab('installments')}
              className={`px-4 py-2 rounded-xl transition-colors ${
                activeTab === 'installments' 
                  ? 'bg-[#14B8A6] text-white' 
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Installments
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-xl transition-colors ${
                activeTab === 'history' 
                  ? 'bg-[#FACC15] text-white' 
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Payment History
            </button>
          </div>

          {/* Fee Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4 secHeading-font">Fee Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-4 px-4 font-semibold text-slate-700 roboto-font">Category</th>
                      <th className="text-right py-4 px-4 font-semibold text-slate-700 roboto-font">Total Amount</th>
                      <th className="text-right py-4 px-4 font-semibold text-slate-700 roboto-font">Paid</th>
                      <th className="text-right py-4 px-4 font-semibold text-slate-700 roboto-font">Pending</th>
                      <th className="text-center py-4 px-4 font-semibold text-slate-700 roboto-font">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feesData.breakdown?.map((item, index) => (
                      <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-4 px-4 font-medium">{item.category}</td>
                        <td className="py-4 px-4 text-right">₹{item.amount.toLocaleString()}</td>
                        <td className="py-4 px-4 text-right text-[#22C55E]">₹{item.paid.toLocaleString()}</td>
                        <td className="py-4 px-4 text-right text-[#EF4444]">₹{item.pending.toLocaleString()}</td>
                        <td className="py-4 px-4">
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-[#22C55E] h-2 rounded-full" 
                              style={{ width: `${(item.paid / item.amount) * 100}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Installments Tab */}
          {activeTab === 'installments' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Fee Installments</h3>
                <div className="text-sm text-slate-600">
                  Next Due: {feesData.feeStructure?.nextDueDate}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {feesData.installments?.map((installment) => (
                  <div key={installment.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl">{getCategoryIcon(installment.category)}</div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(installment.status)}`}>
                        <span className="mr-1">{getStatusIcon(installment.status)}</span>
                        {installment.status.charAt(0).toUpperCase() + installment.status.slice(1)}
                      </span>
                    </div>
                    
                    <h4 className="font-semibold text-slate-800 mb-2">{installment.name}</h4>
                    <p className="text-2xl font-bold text-primary mb-2">₹{installment.amount.toLocaleString()}</p>
                    
                    <div className="space-y-2 text-sm text-slate-600 mb-4">
                      <div className="flex justify-between">
                        <span>Due Date:</span>
                        <span>{installment.dueDate}</span>
                      </div>
                      {installment.paidDate && (
                        <div className="flex justify-between">
                          <span>Paid Date:</span>
                          <span className="text-success">{installment.paidDate}</span>
                        </div>
                      )}
                      {installment.paidAmount > 0 && (
                        <div className="flex justify-between">
                          <span>Paid Amount:</span>
                          <span className="text-success">₹{installment.paidAmount.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    
                    {(installment.status === 'pending' || installment.status === 'partial') && (
                      <button
                        onClick={() => {
                          setSelectedInstallment(installment);
                          setPaymentAmount(installment.amount - installment.paidAmount);
                          setShowPaymentModal(true);
                        }}
                        className="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-xl transition-colors"
                      >
                        Pay Now
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment History Tab */}
          {activeTab === 'history' && (
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Payment History</h3>
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="border border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{getPaymentMethodIcon(payment.method)}</div>
                        <div>
                          <h4 className="font-medium text-slate-800">{payment.category}</h4>
                          <p className="text-slate-600 text-sm">
                            {payment.method} • {payment.date} • ID: {payment.transactionId}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-success">₹{payment.amount.toLocaleString()}</p>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success text-white">
                          Success
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold text-slate-800 mb-6">Make Payment</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Installment</label>
                <input
                  type="text"
                  value={selectedInstallment?.name || ''}
                  disabled
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-100"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Amount (₹)</label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter amount"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select payment method</option>
                  <option value="UPI">UPI</option>
                  <option value="Net Banking">Net Banking</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                </select>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 bg-slate-500 hover:bg-slate-600 text-white py-2 px-4 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  className="flex-1 bg-success hover:bg-green-600 text-white py-2 px-4 rounded-xl transition-colors"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeesSection;
