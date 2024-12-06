import { useState } from 'react';
import { navLinks } from '../constants';

const NavItems = ({ onClick = () => {}, className = '' }) => (
  <ul className={`flex flex-col sm:flex-row gap-6 ${className}`}>
    {navLinks.map((item) => (
      <li key={item.id}>
        <a
          href={item.href}
          onClick={onClick}
          className=" hover:text-gray-600 transition-colors duration-300 text-lg font-medium"
        >
          {item.name}
        </a>
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-md ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a 
            href="/" 
            className="transition-colors duration-300"
          >
            <img src="assets/infraFinal.png" alt="infrasnap" className='"absolute mt-4 w-[150px] h-full object-cover ' />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden sm:block">
            <NavItems />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="sm:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-white`}
      >
        <nav className="px-4 pt-2 pb-4 space-y-1">
          <NavItems onClick={closeMenu} className="items-center" />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;