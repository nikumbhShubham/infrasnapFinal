import { useState } from 'react';
import { navLinks } from '../constants'; // Ensure this file exports 'navLinks'

const NavItems = ({ onClick = () => {} }) => (
    <ul className="nav-ul">
        {navLinks.map((item) => (
            <li key={item.id} className="nav-li">
                <a href={item.href} className="nav-li_a text-white" onClick={onClick}>
                    {item.name}
                </a>
            </li>
        ))}
    </ul>
);

const Navbar2 = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 mt-4"> {/* Added margin top here */}
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center py-4 px-6 mx-auto bg-ultramarine-blue rounded-full shadow-lg">
                    <a
                        href="/"
                        className="font-bold text-xl text-white hover:text-gray-200 transition-colors"
                    >
                        <img
                            src="/assets/infrasnaplogo.png" // Updated to logo image path
                            alt="InfraSnap Logo"
                            className="h-12"
                        />
                    </a>

                    <button
                        onClick={toggleMenu}
                        className="hover:text-gray-200 focus:outline-none sm:hidden flex"
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    >
                        <img
                            src={isOpen ? '/assets/close.svg' : '/assets/menu.svg'}
                            alt={isOpen ? 'Close menu' : 'Open menu'}
                            className="w-6 h-6"
                        />
                    </button>

                    <nav className="sm:flex hidden">
                        <NavItems />
                    </nav>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden transition-all duration-300 rounded-b-lg bg-ultramarine-blue text-white shadow-md`}
            >
                <nav className="p-5">
                    <NavItems onClick={closeMenu} />
                </nav>
            </div>
        </header>
    );
};

export default Navbar2;
