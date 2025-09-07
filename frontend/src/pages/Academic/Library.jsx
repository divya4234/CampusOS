import React, { useState, useEffect } from 'react';

const Library = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('all');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [reservedBooks, setReservedBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock library data
  const libraryBooks = [
    {
      id: 1,
      title: 'Data Structures and Algorithms',
      author: 'Thomas H. Cormen',
      isbn: '978-0262033848',
      category: 'Computer Science',
      publisher: 'MIT Press',
      edition: '3rd Edition',
      year: 2009,
      pages: 1292,
      location: 'CS Section - Rack A3',
      totalCopies: 5,
      availableCopies: 2,
      language: 'English',
      description: 'Comprehensive guide to fundamental algorithms and data structures.',
      rating: 4.8,
      tags: ['Algorithms', 'Data Structures', 'Computer Science', 'Programming']
    },
    {
      id: 2,
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      author: 'Robert C. Martin',
      isbn: '978-0132350884',
      category: 'Computer Science',
      publisher: 'Pearson',
      edition: '1st Edition',
      year: 2008,
      pages: 464,
      location: 'CS Section - Rack B2',
      totalCopies: 3,
      availableCopies: 0,
      language: 'English',
      description: 'Best practices for writing clean, maintainable code.',
      rating: 4.7,
      tags: ['Software Engineering', 'Programming', 'Best Practices']
    },
    {
      id: 3,
      title: 'Introduction to Algorithms',
      author: 'Charles E. Leiserson',
      isbn: '978-0262046305',
      category: 'Computer Science',
      publisher: 'MIT Press',
      edition: '4th Edition',
      year: 2022,
      pages: 1312,
      location: 'CS Section - Rack A1',
      totalCopies: 4,
      availableCopies: 3,
      language: 'English',
      description: 'Comprehensive introduction to algorithmic thinking.',
      rating: 4.9,
      tags: ['Algorithms', 'Mathematics', 'Computer Science']
    },
    {
      id: 4,
      title: 'Operating System Concepts',
      author: 'Abraham Silberschatz',
      isbn: '978-1119320913',
      category: 'Computer Science',
      publisher: 'Wiley',
      edition: '10th Edition',
      year: 2018,
      pages: 944,
      location: 'CS Section - Rack C1',
      totalCopies: 6,
      availableCopies: 4,
      language: 'English',
      description: 'Fundamental concepts of operating systems.',
      rating: 4.6,
      tags: ['Operating Systems', 'System Programming', 'Computer Science']
    },
    {
      id: 5,
      title: 'Database System Concepts',
      author: 'Henry F. Korth',
      isbn: '978-0078022159',
      category: 'Computer Science',
      publisher: 'McGraw-Hill',
      edition: '7th Edition',
      year: 2019,
      pages: 1376,
      location: 'CS Section - Rack D2',
      totalCopies: 4,
      availableCopies: 1,
      language: 'English',
      description: 'Comprehensive guide to database management systems.',
      rating: 4.5,
      tags: ['Database', 'SQL', 'Data Management']
    },
    {
      id: 6,
      title: 'Computer Networks',
      author: 'Andrew S. Tanenbaum',
      isbn: '978-0132126953',
      category: 'Computer Science',
      publisher: 'Pearson',
      edition: '5th Edition',
      year: 2010,
      pages: 960,
      location: 'CS Section - Rack E1',
      totalCopies: 3,
      availableCopies: 2,
      language: 'English',
      description: 'Comprehensive guide to computer networking.',
      rating: 4.4,
      tags: ['Networking', 'Internet', 'Protocols']
    },
    {
      id: 7,
      title: 'Mathematics for Machine Learning',
      author: 'Marc Peter Deisenroth',
      isbn: '978-1108455145',
      category: 'Mathematics',
      publisher: 'Cambridge University Press',
      edition: '1st Edition',
      year: 2020,
      pages: 398,
      location: 'Math Section - Rack M1',
      totalCopies: 5,
      availableCopies: 3,
      language: 'English',
      description: 'Mathematical foundations for machine learning.',
      rating: 4.7,
      tags: ['Mathematics', 'Machine Learning', 'Linear Algebra']
    },
    {
      id: 8,
      title: 'Digital Signal Processing',
      author: 'John G. Proakis',
      isbn: '978-0131873742',
      category: 'Electronics',
      publisher: 'Pearson',
      edition: '4th Edition',
      year: 2006,
      pages: 1004,
      location: 'ECE Section - Rack E3',
      totalCopies: 4,
      availableCopies: 2,
      language: 'English',
      description: 'Principles and applications of digital signal processing.',
      rating: 4.6,
      tags: ['Signal Processing', 'Electronics', 'Digital Systems']
    }
  ];

  const myIssuedBooks = [
    {
      id: 1,
      title: 'Data Structures and Algorithms',
      author: 'Thomas H. Cormen',
      issueDate: '2024-08-15',
      dueDate: '2024-09-15',
      renewals: 1,
      maxRenewals: 2,
      status: 'Issued',
      fine: 0
    },
    {
      id: 4,
      title: 'Operating System Concepts',
      author: 'Abraham Silberschatz',
      issueDate: '2024-08-20',
      dueDate: '2024-09-20',
      renewals: 0,
      maxRenewals: 2,
      status: 'Issued',
      fine: 0
    }
  ];

  const myReservedBooks = [
    {
      id: 2,
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      author: 'Robert C. Martin',
      reservedDate: '2024-09-05',
      expectedDate: '2024-09-12',
      position: 1,
      status: 'Reserved'
    }
  ];

  const libraryServices = [
    {
      name: 'Book Issue/Return',
      description: 'Borrow and return books',
      timing: '9:00 AM - 6:00 PM',
      location: 'Ground Floor - Issue Counter',
      icon: '📚'
    },
    {
      name: 'Reading Room',
      description: '24/7 study space with 200 seats',
      timing: '24/7',
      location: 'First Floor',
      icon: '📖'
    },
    {
      name: 'Digital Library',
      description: 'Online journals and e-books',
      timing: '24/7',
      location: 'Second Floor - Computer Lab',
      icon: '💻'
    },
    {
      name: 'Reference Section',
      description: 'Encyclopedias and reference materials',
      timing: '9:00 AM - 8:00 PM',
      location: 'Ground Floor',
      icon: '📋'
    },
    {
      name: 'Photocopy Service',
      description: 'Document copying and printing',
      timing: '9:00 AM - 6:00 PM',
      location: 'Ground Floor',
      icon: '🖨️'
    },
    {
      name: 'Group Study Rooms',
      description: 'Bookable rooms for group discussions',
      timing: '9:00 AM - 9:00 PM',
      location: 'Second Floor',
      icon: '👥'
    }
  ];

  const libraryRules = [
    'Maintain silence in reading areas',
    'No food or drinks in the library',
    'Return books on time to avoid fines',
    'Handle books with care',
    'Mobile phones on silent mode',
    'Maximum 3 books can be issued at once',
    'Book renewal allowed twice',
    'ID card mandatory for entry',
    'No sleeping in reading areas',
    'Respect other users'
  ];

  useEffect(() => {
    // Initialize with static data - using static arrays so dependencies not needed
    setFilteredBooks(libraryBooks);
    setIssuedBooks(myIssuedBooks);
    setReservedBooks(myReservedBooks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  useEffect(() => {
    // Handle search when query or filter changes
    setLoading(true);
    
    const timeoutId = setTimeout(() => {
      let filtered = libraryBooks;
      
      if (searchQuery.trim()) {
        filtered = libraryBooks.filter(book => 
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.isbn.includes(searchQuery) ||
          book.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }
      
      if (searchFilter !== 'all') {
        filtered = filtered.filter(book => 
          book.category.toLowerCase() === searchFilter.toLowerCase()
        );
      }
      
      setFilteredBooks(filtered);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, searchFilter]);

  const handleReserveBook = (bookId) => {
    // Simulate book reservation
    const book = libraryBooks.find(b => b.id === bookId);
    if (book && book.availableCopies === 0) {
      alert(`Book "${book.title}" has been reserved successfully!`);
    }
  };

  const handleRenewBook = (bookId) => {
    // Simulate book renewal
    setIssuedBooks(prev => 
      prev.map(book => 
        book.id === bookId && book.renewals < book.maxRenewals
          ? { ...book, renewals: book.renewals + 1, dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] }
          : book
      )
    );
    alert('Book renewed successfully!');
  };

  const calculateDaysLeft = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (daysLeft) => {
    if (daysLeft < 0) return 'text-red-600 bg-red-50';
    if (daysLeft <= 3) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const BookCard = ({ book, showActions = true }) => (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">{book.title}</h3>
          <p className="text-slate-600 mb-1">by {book.author}</p>
          <p className="text-slate-500 text-sm">ISBN: {book.isbn}</p>
        </div>
        <div className="text-right">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            book.availableCopies > 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
          }`}>
            {book.availableCopies > 0 ? 'Available' : 'Not Available'}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <span className="text-slate-500">Category:</span>
          <span className="ml-2 text-slate-800">{book.category}</span>
        </div>
        <div>
          <span className="text-slate-500">Edition:</span>
          <span className="ml-2 text-slate-800">{book.edition}</span>
        </div>
        <div>
          <span className="text-slate-500">Publisher:</span>
          <span className="ml-2 text-slate-800">{book.publisher}</span>
        </div>
        <div>
          <span className="text-slate-500">Year:</span>
          <span className="ml-2 text-slate-800">{book.year}</span>
        </div>
        <div>
          <span className="text-slate-500">Pages:</span>
          <span className="ml-2 text-slate-800">{book.pages}</span>
        </div>
        <div>
          <span className="text-slate-500">Location:</span>
          <span className="ml-2 text-slate-800">{book.location}</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-slate-700 text-sm">{book.description}</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-yellow-500">⭐</span>
          <span className="text-slate-700 font-medium">{book.rating}</span>
        </div>
        <div className="text-sm text-slate-600">
          {book.availableCopies} of {book.totalCopies} available
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {book.tags.map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {showActions && (
        <div className="flex space-x-2">
          {book.availableCopies > 0 ? (
            <button className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg font-medium transition-colors">
              Request Issue
            </button>
          ) : (
            <button 
              onClick={() => handleReserveBook(book.id)}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Reserve Book
            </button>
          )}
          <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
            Details
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-primary p-3 rounded-xl">
              <span className="text-white text-2xl">📚</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Digital Library</h1>
              <p className="text-slate-600">Explore our vast collection of books and resources</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 mb-6">
          <div className="flex flex-wrap border-b border-slate-200">
            {[
              { id: 'search', label: 'Search Books', icon: '🔍' },
              { id: 'mybooks', label: 'My Books', icon: '📖' },
              { id: 'reserved', label: 'Reserved', icon: '📋' },
              { id: 'services', label: 'Services', icon: '🏢' },
              { id: 'rules', label: 'Rules & Info', icon: 'ℹ️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-b-2 border-primary text-primary bg-primary/5'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search Books Tab */}
        {activeTab === 'search' && (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search by title, author, ISBN, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <select
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="all">All Categories</option>
                    <option value="computer science">Computer Science</option>
                    <option value="mathematics">Mathematics</option>
                    <option value="electronics">Electronics</option>
                    <option value="mechanical">Mechanical</option>
                    <option value="civil">Civil</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Search Results */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-800">
                  Search Results ({filteredBooks.length} books found)
                </h2>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <span>Sort by:</span>
                  <select className="border border-slate-300 rounded px-2 py-1">
                    <option>Relevance</option>
                    <option>Title</option>
                    <option>Author</option>
                    <option>Year</option>
                    <option>Rating</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="ml-3 text-slate-600">Searching...</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              )}

              {!loading && filteredBooks.length === 0 && (
                <div className="text-center py-12">
                  <span className="text-6xl mb-4 block">📚</span>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">No books found</h3>
                  <p className="text-slate-600">Try adjusting your search terms or filters</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* My Books Tab */}
        {activeTab === 'mybooks' && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center space-x-2">
              <span>📖</span>
              <span>My Issued Books</span>
            </h2>

            {issuedBooks.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">📚</span>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">No books issued</h3>
                <p className="text-slate-600">You haven't issued any books yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {issuedBooks.map((book) => {
                  const daysLeft = calculateDaysLeft(book.dueDate);
                  return (
                    <div key={book.id} className="border border-slate-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">{book.title}</h3>
                          <p className="text-slate-600">by {book.author}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(daysLeft)}`}>
                          {daysLeft < 0 ? `Overdue by ${Math.abs(daysLeft)} days` : 
                           daysLeft === 0 ? 'Due today' : 
                           `${daysLeft} days left`}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-slate-500 text-sm">Issue Date:</span>
                          <p className="font-medium">{new Date(book.issueDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-slate-500 text-sm">Due Date:</span>
                          <p className="font-medium">{new Date(book.dueDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-slate-500 text-sm">Renewals:</span>
                          <p className="font-medium">{book.renewals} of {book.maxRenewals}</p>
                        </div>
                      </div>

                      {book.fine > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                          <p className="text-red-800 font-medium">Fine: ₹{book.fine}</p>
                        </div>
                      )}

                      <div className="flex space-x-3">
                        {book.renewals < book.maxRenewals && daysLeft >= -7 && (
                          <button 
                            onClick={() => handleRenewBook(book.id)}
                            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            Renew Book
                          </button>
                        )}
                        <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Reserved Books Tab */}
        {activeTab === 'reserved' && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center space-x-2">
              <span>📋</span>
              <span>Reserved Books</span>
            </h2>

            {reservedBooks.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">📋</span>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">No reserved books</h3>
                <p className="text-slate-600">You haven't reserved any books yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reservedBooks.map((book) => (
                  <div key={book.id} className="border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800">{book.title}</h3>
                        <p className="text-slate-600">by {book.author}</p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-sm font-medium">
                        Position {book.position} in queue
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-slate-500 text-sm">Reserved Date:</span>
                        <p className="font-medium">{new Date(book.reservedDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-slate-500 text-sm">Expected Availability:</span>
                        <p className="font-medium">{new Date(book.expectedDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Cancel Reservation
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center space-x-2">
              <span>🏢</span>
              <span>Library Services</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {libraryServices.map((service, index) => (
                <div key={index} className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="text-center mb-4">
                    <span className="text-4xl">{service.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2 text-center">{service.name}</h3>
                  <p className="text-slate-600 text-sm mb-4 text-center">{service.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-500">🕒 Timing:</span>
                      <span className="text-slate-800">{service.timing}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-500">📍 Location:</span>
                      <span className="text-slate-800">{service.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h3 className="font-semibold text-primary mb-3 flex items-center space-x-2">
                <span>📞</span>
                <span>Contact Information</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="mb-2"><strong>Librarian:</strong> Dr. Sarah Johnson</p>
                  <p className="mb-2"><strong>Phone:</strong> +91 98765 43210</p>
                  <p className="mb-2"><strong>Email:</strong> library@campusos.edu</p>
                </div>
                <div>
                  <p className="mb-2"><strong>Library Timings:</strong> 9:00 AM - 9:00 PM</p>
                  <p className="mb-2"><strong>Issue Counter:</strong> 9:00 AM - 6:00 PM</p>
                  <p className="mb-2"><strong>Emergency:</strong> +91 87654 32109</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rules & Info Tab */}
        {activeTab === 'rules' && (
          <div className="space-y-6">
            {/* Library Rules */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center space-x-2">
                <span>📜</span>
                <span>Library Rules & Regulations</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {libraryRules.map((rule, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-slate-700">{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fine Structure */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                <span>💰</span>
                <span>Fine Structure</span>
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-700">Overdue (per day)</span>
                  <span className="font-medium text-slate-800">₹2</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-700">Lost book</span>
                  <span className="font-medium text-slate-800">Full cost + ₹100</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-700">Damaged book</span>
                  <span className="font-medium text-slate-800">50% of book cost</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-700">ID card replacement</span>
                  <span className="font-medium text-slate-800">₹50</span>
                </div>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                <span>ℹ️</span>
                <span>Quick Facts</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">50,000+</div>
                  <div className="text-sm text-slate-600">Total Books</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">200</div>
                  <div className="text-sm text-slate-600">Reading Seats</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">15</div>
                  <div className="text-sm text-slate-600">Study Rooms</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">30</div>
                  <div className="text-sm text-slate-600">Computers</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
