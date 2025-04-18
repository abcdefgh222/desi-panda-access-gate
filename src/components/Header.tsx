
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, User, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logoutUser } from '@/utils/firebase';
import { toast } from '@/hooks/use-toast';

const Header: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate('/');
    } else {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: result.error || "An unknown error occurred",
      });
    }
  };

  return (
    <header className="bg-white shadow-sm py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/c8bede74-6885-48cd-9297-fac23812641a.png" 
              alt="Desi Panda Logo" 
              className="h-10 w-10"
            />
            <span className="font-bold text-xl hidden sm:block">Desi Panda</span>
          </Link>
        </div>

        <form onSubmit={handleSearch} className="flex-1 mx-4 hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search any category or videos..."
              className="search-bar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <Search size={20} />
            </button>
          </div>
        </form>

        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User size={24} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {user ? (
                <>
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {user.email}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/favorites">My Favorites</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/register">Register</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Mobile Search */}
      <div className={`mt-2 md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search any category or videos..."
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <Search size={20} />
          </button>
        </form>
        
        <nav className="mt-4 border-t pt-2 pb-3 space-y-1">
          <Link 
            to="/" 
            className="block px-3 py-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/categories" 
            className="block px-3 py-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Categories
          </Link>
          <Link 
            to="/premium" 
            className="block px-3 py-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Premium
          </Link>
          <Link 
            to="/recent" 
            className="block px-3 py-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Recent
          </Link>
          <Link 
            to="/popular" 
            className="block px-3 py-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Popular
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
