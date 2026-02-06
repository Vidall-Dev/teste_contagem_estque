import { Sun, Moon, Bell, Menu, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
}

export default function Header({ title, subtitle, showBack }: HeaderProps) {
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white dark:bg-[#1a0c0e] border-b border-gray-100 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500">
            <Menu className="w-6 h-6" />
          </button>

          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs sm:text-sm text-text-muted dark:text-gray-400 font-medium">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
          >
            <Sun className="w-5 h-5 dark:hidden" />
            <Moon className="w-5 h-5 hidden dark:block" />
          </button>

          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-white dark:ring-[#1a0c0e]"></span>
          </button>

          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-2 border-primary/20">
            <img
              alt="Avatar"
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOIDCJ7btox8e3HRf8jCjmG6x1Op5wLlANImlRnEav8ZFzulZ_h7_TUZs-aYdldp_X2hkMbnlm7uiwPWpxmPt9DYJ-yTz9H7tvF31NS6dTcDyCI7SVceLQ6IAnVXyhxFTWiz_Sg0HZu4PufyZXOfp7BLd1RwjI4OrJKQm8o9mLE5kbenzWs-sVlG3SWlsxCABm6QEJY90as6dn1BikP9KxUGIspy3epVxZrBVvZmtrwFvBeM_pdjZxFh6JPLRg0Mt5uQFjIuMrSGg"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
