import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Layout, User2, Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearch } from '@/context/useSearch';

const navItems = [
  { name: 'Home', href: '/', icon: Layout },
  { name: 'Grievances', href: '/grievences', icon: BarChart3 },
  { name: 'Citizens', href: '/users', icon: User2 },
];

export default function Navbar() {
  const location = useLocation();
  const { searchQuery, handleSearch } = useSearch(); 
  const [query, setquery] = useState(searchQuery);

  const handleSearchSubmit = () => {
    handleSearch(query); 
  };

  return (
    <nav className="border-b bg-[#E2F1E7] text-gray-800">
      <div className="flex h-16 items-center px-4">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <BarChart3 className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">Dashboard</span>
        </Link>
        <div className="hidden items-center space-x-4 lg:flex lg:space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.href ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <div className="relative lg:flex">
            <Input
              type="search"
              placeholder="Location,Grievence Type,user name"
              value={query}
              onChange={(e) => setquery(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()} // Trigger search on Enter key
              className="w-[200px] lg:w-[300px] focus:ring focus:ring-primary focus:ring-opacity-50 border-gray-300 rounded-md"
            />
            <Search
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4"
              onClick={handleSearchSubmit} 
            />
          </div>
          <Button variant="ghost" size="icon">
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
