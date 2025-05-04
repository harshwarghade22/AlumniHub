import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails, logoutProject } from '../actions/projectActions';
import { 
  Home,
  LayoutDashboard,
  Calendar,
  Briefcase,
  Users,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

const Navbar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, userInfo } = useSelector((state) => state.userLogin);
  const { user } = useSelector((state) => state.userDetails);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (userInfo) {
      try {
        const token = userInfo.access;
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedPayload = JSON.parse(atob(base64));
        const userId = decodedPayload.user_id;
        dispatch(getUserDetails(userInfo.access, userId));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [dispatch, userInfo]);

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100';
  };

  const handleLogout = () => {
    dispatch(logoutProject());
    navigate('/');
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // This function ensures the toggle works correctly
  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="fixed top-0 right-0 left-0 bg-white shadow-sm z-20 h-16">
        <div className="flex items-center justify-between h-full px-4">
          {/* Left side - Toggle button */}
          <button 
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none lg:hidden"
            onClick={handleToggleSidebar}
            aria-label="Toggle sidebar"
          >
            {isOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>

          {/* Logo for mobile view */}
          <div className="flex items-center lg:hidden">
            <Link to="/" className="flex items-center">
              <div className="bg-blue-600 text-white p-1 rounded-md">
                <Users size={20} />
              </div>
              <span className="ml-2 font-semibold text-lg text-gray-800">Alumni Connect</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center rounded-lg px-3 py-2 w-64 ml-4">
            <Search size={18} className="text-gray-500" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent ml-2 outline-none w-full text-sm"
            />
          </div>

          {/* Right side - Notifications and User Profile */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <div className="relative cursor-pointer">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </div>

            {/* User Authentication */}
            {isAuthenticated ? (
              <div className="relative">
                <div 
                  className="flex items-center space-x-2 cursor-pointer p-1 rounded-lg hover:bg-gray-100"
                  onClick={toggleDropdown}
                >
                  <img 
                    src={user?.avatar || "https://via.placeholder.com/40"} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {user?.name || "User"}
                  </span>
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                    <Link 
                      to="/profile" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User size={16} className="mr-2" />
                      Profile
                    </Link>
                    <Link 
                      to="/settings" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Settings size={16} className="mr-2" />
                      Settings
                    </Link>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button 
                      onClick={handleLogout} 
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/login" 
                  className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed top-0 left-0 h-full bg-white shadow-lg z-30 transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} pt-16`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Logo */}
          <div className={`px-4 py-5 flex items-center ${isOpen ? 'justify-start' : 'justify-center'}`}>
            <div className="bg-blue-600 text-white p-1.5 rounded-md">
              <Users size={isOpen ? 22 : 20} />
            </div>
            {isOpen && (
              <span className="ml-2 font-bold text-xl text-gray-800">Alumni Connect</span>
            )}
          </div>

          {/* Sidebar Links */}
          <nav className="mt-4 flex-1 px-2">
            <Link 
              to="/" 
              className={`flex items-center px-3 py-3 mb-1 rounded-lg ${isActive('/')}`}
            >
              <Home size={20} className={isOpen ? 'mr-3' : 'mx-auto'} />
              {isOpen && <span className="font-medium">Home</span>}
            </Link>
            
            <Link 
              to="/dashboard" 
              className={`flex items-center px-3 py-3 mb-1 rounded-lg ${isActive('/dashboard')}`}
            >
              <LayoutDashboard size={20} className={isOpen ? 'mr-3' : 'mx-auto'} />
              {isOpen && <span className="font-medium">Dashboard</span>}
            </Link>
            
            <Link 
              to="/events" 
              className={`flex items-center px-3 py-3 mb-1 rounded-lg ${isActive('/events')}`}
            >
              <Calendar size={20} className={isOpen ? 'mr-3' : 'mx-auto'} />
              {isOpen && <span className="font-medium">Events</span>}
            </Link>
            
            <Link 
              to="/jobs" 
              className={`flex items-center px-3 py-3 mb-1 rounded-lg ${isActive('/jobs')}`}
            >
              <Briefcase size={20} className={isOpen ? 'mr-3' : 'mx-auto'} />
              {isOpen && <span className="font-medium">Jobs</span>}
            </Link>
            
            <Link 
              to="/network" 
              className={`flex items-center px-3 py-3 mb-1 rounded-lg ${isActive('/network')}`}
            >
              <Users size={20} className={isOpen ? 'mr-3' : 'mx-auto'} />
              {isOpen && <span className="font-medium">Network</span>}
            </Link>
            
            {isAuthenticated && (
              <>
                {isOpen && (
                  <div className="mt-6 mb-2 px-3">
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Personal</p>
                  </div>
                )}
                
                <Link 
                  to="/messages" 
                  className={`flex items-center px-3 py-3 mb-1 rounded-lg ${isActive('/messages')}`}
                >
                  <MessageSquare size={20} className={isOpen ? 'mr-3' : 'mx-auto'} />
                  {isOpen && <span className="font-medium">Messages</span>}
                </Link>
                
                <Link 
                  to="/connections" 
                  className={`flex items-center px-3 py-3 mb-1 rounded-lg ${isActive('/connections')}`}
                >
                  <User size={20} className={isOpen ? 'mr-3' : 'mx-auto'} />
                  {isOpen && <span className="font-medium">Connections</span>}
                </Link>
              </>
            )}
          </nav>

          {/* Sidebar Footer - User Info */}
          {isAuthenticated && isOpen && (
            <div className="mt-auto border-t border-gray-200 p-4">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="ml-2 text-xs text-gray-600">Online</span>
              </div>
              
              <div className="flex items-center">
                <img 
                  src={user?.avatar || "https://via.placeholder.com/40"} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full"
                />
                <div className="ml-2">
                  <p className="text-sm font-medium text-gray-800">{user?.name || "User"}</p>
                  <p className="text-xs text-gray-500">{user?.role || "Alumni"}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      
      {/* Main content spacer - Removed from Navbar as this should be in the App component */}
    </>
  );
};

export default Navbar;