import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiUser, FiLogOut, FiDollarSign, FiShield } from "react-icons/fi";

const Navbar = () => {
  const { isAuthenticated, user, isNoteMaker, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-2">
              
              <span className="text-xl font-bold text-white">NoteNex</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex md:items-center md:gap-6">
              <Link
                to="/marketplace"
                className="text-gray-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
              >
                Marketplace
              </Link>

              {isAuthenticated && (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                </>
              )}

              {isAuthenticated && (
                <>
                  <Link
                    to="/community"
                    className="text-gray-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Forums
                  </Link>
                </>
              )}

              {isNoteMaker && (
                <Link
                  to="/notemaker"
                  className="text-gray-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                >
                  NoteMaker
                </Link>
              )}

              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-gray-400 hover:text-white px-3 py-2 text-sm font-medium flex items-center gap-1 transition-colors"
                >
                  <FiShield /> Admin
                </Link>
              )}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Wallet Balance */}
                <Link
                  to="/wallet"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20 transition-all"
                >
                  <FiDollarSign className="text-lg" />
                  <span className="font-semibold">
                    ₹{user?.walletBalance || 0}
                  </span>
                </Link>

                {/* User Profile */}
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-lg hover:bg-gray-800 border border-gray-800 transition-all"
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="text-sm font-medium text-white hidden sm:block">
                    {user?.name}
                  </span>
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg border border-red-500/20 hover:border-red-500/30 transition-all"
                >
                  <FiLogOut />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-400 hover:text-white px-4 py-2 text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 px-5 py-2 rounded-lg text-sm font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
