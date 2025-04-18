
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, User, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { fetchVideos, fetchCategories } from '@/utils/googleSheets';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logoutUser } from '@/utils/firebase';
import { toast } from '@/hooks/use-toast';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: videos } = useQuery({
    queryKey: ['videos'],
    queryFn: fetchVideos,
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    // Click outside to close suggestions
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    
    // Video title suggestions
    const videoSuggestions = videos
      ?.filter(video => video.title.toLowerCase().includes(query))
      .slice(0, 5)
      .map(video => ({
        id: video.id,
        text: video.title,
        type: 'video'
      })) || [];
    
    // Category suggestions
    const categorySuggestions = categories
      ?.filter(category => category.Category.toLowerCase().includes(query))
      .slice(0, 3)
      .map(category => ({
        id: category.Category_id,
        text: category.Category,
        type: 'category'
      })) || [];
    
    setSuggestions([...videoSuggestions, ...categorySuggestions]);
  }, [searchQuery, videos, categories]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.type === 'video') {
      navigate(`/video/${suggestion.id}`);
    } else if (suggestion.type === 'category') {
      navigate(`/category/${suggestion.id}`);
    }
    setSearchQuery('');
    setShowSuggestions(false);
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

        {/* Desktop Navigation Menu */}
        <div className="hidden md:flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className="px-3 py-2 text-sm font-medium">
                  Home
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {categories?.slice(0, 8).map((category) => (
                      <li key={category.Category_id}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={`/category/${category.Category_id}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{category.Category}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/premium"
                          className="block select-none space-y-1 rounded-md bg-gradient-to-r from-pink-500 to-purple-500 p-3 leading-none text-white no-underline outline-none transition-colors hover:brightness-110"
                        >
                          <div className="text-sm font-medium leading-none">Premium Content</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/popular" className="px-3 py-2 text-sm font-medium">
                  Popular
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div ref={searchRef} className="flex-1 mx-4 hidden md:block relative">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search any category or videos..."
                className="search-bar"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Search Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
              {suggestions.map((suggestion, index) => (
                <div 
                  key={`${suggestion.type}-${suggestion.id}`}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.type === 'video' ? (
                    <Search size={14} className="mr-2 text-gray-500" />
                  ) : (
                    <span className="mr-2 text-xs px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">
                      Category
                    </span>
                  )}
                  <span className="truncate">{suggestion.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

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
