import React from 'react'
import { useNavigate } from 'react-router-dom'
import logopic from './../../assets/erp-logo.png'

const HomePage = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/login')
  }

  const features = [
    {
      icon: "📚",
      title: "Academic Management",
      description: "Complete academic lifecycle management with attendance, grades, and course scheduling."
    },
    {
      icon: "💰",
      title: "Fee Management",
      description: "Streamlined fee collection and payment tracking with automated notifications."
    },
    {
      icon: "🏠",
      title: "Hostel & Facilities",
      description: "Comprehensive hostel management with room allocation and canteen services."
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      description: "Real-time insights and analytics for students, faculty, and management."
    },
    {
      icon: "👥",
      title: "Role-Based Access",
      description: "Secure access control with dedicated dashboards for different user roles."
    },
    {
      icon: "📱",
      title: "Mobile Responsive",
      description: "Access your campus portal anywhere, anytime with our responsive design."
    }
  ]

  return (
  <div className="min-h-screen" style={{ backgroundColor: '#1E293B', color: '#F8FAFC' }}>
      {/* Hero Section */}
  <section className="relative" style={{ backgroundColor: '#1E293B' }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <img 
                src={logopic} 
                alt="CampusOS Logo" 
                className="h-[100px] w-[100px] filter brightness-110 shadow-lg rounded-full hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6" style={{ color: '#F8FAFC' }}>
              Welcome to CampusOS
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed roboto-font" style={{ color: '#94A3B8' }}>
              Your comprehensive campus management solution - streamlining education, administration, and campus life in one powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleGetStarted}
                className="px-8 py-4 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl heading-font border"
                style={{ backgroundColor: '#4F46E5', color: '#F8FAFC', borderColor: '#6366F1' }}
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/about')}
                className="px-8 py-4 border-2 font-semibold rounded-lg transition-all duration-300 heading-font"
                style={{ borderColor: '#0D9488', color: '#2DD4BF', backgroundColor: 'transparent' }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
  <section className="py-20 bg-background-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accent secHeading-font">
              Why Choose CampusOS?
            </h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto roboto-font">
              Experience the future of campus management with our comprehensive suite of features designed for modern educational institutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-background p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-primary-dark hover:border-primary"
              >
                <div className="text-4xl mb-4 text-accent">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-primary-light heading-font">
                  {feature.title}
                </h3>
                <p className="text-text-muted leading-relaxed roboto-font">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
  <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-success heading-font">10K+</div>
              <div className="text-text-muted roboto-font">Active Students</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-secondary heading-font">500+</div>
              <div className="text-text-muted roboto-font">Faculty Members</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-accent heading-font">50+</div>
              <div className="text-text-muted roboto-font">Departments</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary heading-font">99.9%</div>
              <div className="text-text-muted roboto-font">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white secHeading-font">
            Ready to Transform Your Campus?
          </h2>
          <p className="text-xl text-text-muted mb-8 leading-relaxed roboto-font">
            Join thousands of educational institutions already using CampusOS to streamline their operations and enhance student experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 bg-[#4F46E5] text-primary-light font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl heading-font border border-primary"
            >
              Start Your Journey
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 border-2 border-background-card text-background-card hover:bg-background-card hover:text-primary-light font-semibold rounded-lg transition-all duration-300 heading-font"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
  <footer className="bg-background-card py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-4">
                <img 
                  src={logopic} 
                  alt="CampusOS" 
                  className="h-10 w-10 mr-3 rounded-full"
                />
                <span className="text-xl font-bold text-primary-light heading-font">CampusOS</span>
              </div>
              <p className="text-gray-300 mb-4 roboto-font">
                Empowering educational institutions with cutting-edge technology solutions for comprehensive campus management.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-secondary-light heading-font">Quick Links</h4>
              <ul className="space-y-2 text-gray-300 roboto-font">
                <li><a href="#" className="hover:text-primary-light transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-secondary-light heading-font">Contact</h4>
              <ul className="space-y-2 text-gray-300 roboto-font">
                <li>Email: info@campusos.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Campus Ave</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400 roboto-font">
            <p>&copy; 2025 CampusOS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage