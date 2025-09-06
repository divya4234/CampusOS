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
    <div className="min-h-screen bg-background text-text">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <img 
                src={logopic} 
                alt="CampusOS Logo" 
                className="h-[100px] w-[100px] filter brightness-110  shadow-lg rounded-full"
              />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-light to-secondary-light bg-clip-text text-transparent">
              Welcome to CampusOS
            </h1>
            <p className="text-xl md:text-2xl text-text-muted mb-8 max-w-3xl mx-auto leading-relaxed">
              Your comprehensive campus management solution - streamlining education, administration, and campus life in one powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleGetStarted}
                className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/30"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/about')}
                className="px-8 py-4 border-2 border-secondary text-secondary hover:bg-secondary hover:text-background font-semibold rounded-lg transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accent">
              Why Choose CampusOS?
            </h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Experience the future of campus management with our comprehensive suite of features designed for modern educational institutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-background-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-primary/20 hover:border-primary/40"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-primary-light">
                  {feature.title}
                </h3>
                <p className="text-text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-success">10K+</div>
              <div className="text-text-muted">Active Students</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-secondary">500+</div>
              <div className="text-text-muted">Faculty Members</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-accent">50+</div>
              <div className="text-text-muted">Departments</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">99.9%</div>
              <div className="text-text-muted">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Campus?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of educational institutions already using CampusOS to streamline their operations and enhance student experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 bg-white text-primary font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Your Journey
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary font-semibold rounded-lg transition-all duration-300"
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
                <span className="text-xl font-bold text-primary-light">CampusOS</span>
              </div>
              <p className="text-text-muted mb-4">
                Empowering educational institutions with cutting-edge technology solutions for comprehensive campus management.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-secondary">Quick Links</h4>
              <ul className="space-y-2 text-text-muted">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-secondary">Contact</h4>
              <ul className="space-y-2 text-text-muted">
                <li>Email: info@campusos.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Campus Ave</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-text-muted/20 mt-8 pt-8 text-center text-text-muted">
            <p>&copy; 2025 CampusOS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage