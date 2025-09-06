import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import coverImg from './../../assets/collegeCovers.png';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log('Submitted Data:', data); // Debugging log
      console.log('Selected Role:', data.role); // Debugging log
      
      // Mock login logic - replace with actual authentication
      const loginResult = await login(data.username, data.password, data.role);

      if (loginResult.success) {
        // Navigate based on user role
        const role = data.role; // Get the selected role
        switch (role) {
          case 'student':
            navigate('/student/dashboard');
            break;
          case 'faculty':
            navigate('/faculty/dashboard');
            break;
          case 'management':
            navigate('/management/dashboard');
            break;
          case 'admin':
            navigate('/admin/panel');
            break;
          default:
            navigate('/');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error (show message to user)
    }
  };

  const handleAdminLogin = async () => {
    try {
      // Mock admin login - you can customize this
      const adminCredentials = {
        adminId: 'admin001', 
        password: 'admin123'
      };
      
      const loginResult = await login(adminCredentials.adminId, adminCredentials.password, 'admin');
      
      if (loginResult.success) {
        navigate('/admin/panel');
      } else {
        console.error('Admin login failed');
        // You can add error handling here
      }
    } catch (error) {
      console.error('Admin login error:', error);
    }
  };

  return (
    <div className="flex min-h-screen w-screen justify-center items-center bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef]">
      <main className="w-full max-w-6xl">
        <section className="flex flex-col lg:flex-row rounded-lg shadow-lg transition-shadow duration-300 overflow-hidden hover:shadow-xl">
          {/* Image column */}
          <div className="w-full lg:w-1/2 h-52 lg:h-[80vh] relative">
            <img
              src={coverImg}
              alt="College cover"
              className="w-full h-full object-cover"
            />
            {/* subtle gradient overlay for better text contrast on mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Form column */}
          <aside className="w-full lg:w-1/2 bg-[#F8FAFC] flex flex-col items-center p-6 lg:px-12 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 heading-font">
              Welcome Back 😎
            </h1> 
            <h3 className="secHeading-font m-3 font-bold">Login</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col m-5 justify-center items-center">
                <input type="text" placeholder="Enter your ID" className="border-black w-[300px] h-10 mb-4" {...register('username', { required: true , minLength:{value:6 , message:"min length is 6" }})} />
                {errors.username && <span className="text-[#EF4444] roboto-font">{errors.username.message || "Username is required"}</span>}

                <input type="password" placeholder="Password" className="border-black w-[300px] h-10 mb-4" {...register('password', { required: true, minLength:{value:6 , message:"min length is 6" } })} />
                {errors.password && <span className="text-[#EF4444] roboto-font">{errors.password.message || "Password is required"}</span>}

                <select
                  className="border-black w-[300px] h-10 mb-4"
                  {...register('role', { required: true })}
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="management">Management</option>
                </select>
                {errors.role && <span className="text-[#EF4444] roboto-font">Role is required</span>}

                <button type="submit" className="w-[200px] bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-300">
                  Login
                </button>
                <p className="mt-4 text-sm text-gray-600">
                  Don't have an account?{' '}
                  <NavLink to="/register" className="text-blue-700 hover:underline">
                    Register
                  </NavLink>
                </p>
              </div>
            </form >
            <br/>
                <button className="w-[250px] bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors duration-300" onClick={handleAdminLogin}>
                  Login As Admin
                </button>
          </aside>  
        </section>
      </main>
    </div>
  );
};

export default Login;