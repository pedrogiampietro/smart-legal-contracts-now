
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">ContratoFácil</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/como-funciona" className="text-gray-600 hover:text-gray-900">Como Funciona</Link>
            <Link to="/modelos" className="text-gray-600 hover:text-gray-900">Modelos</Link>
            <Link to="/#precos" className="text-gray-600 hover:text-gray-900">Preços</Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline">Entrar</Button>
            </Link>
            <Link to="/registro">
              <Button className="bg-blue-600 hover:bg-blue-700">Registrar</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/como-funciona" 
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={toggleMobileMenu}
              >
                Como Funciona
              </Link>
              <Link 
                to="/modelos" 
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={toggleMobileMenu}
              >
                Modelos
              </Link>
              <Link 
                to="/#precos" 
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={toggleMobileMenu}
              >
                Preços
              </Link>
              <div className="pt-4 flex flex-col space-y-3">
                <Link to="/login" onClick={toggleMobileMenu}>
                  <Button variant="outline" className="w-full">Entrar</Button>
                </Link>
                <Link to="/registro" onClick={toggleMobileMenu}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Registrar</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
