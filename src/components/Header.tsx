import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    // Fechar o menu mobile se estiver aberto
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">
              ContratoFácil
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/como-funciona"
              className="text-gray-600 hover:text-gray-900"
            >
              Como Funciona
            </Link>
            <Link to="/modelos" className="text-gray-600 hover:text-gray-900">
              Modelos
            </Link>
            {!isAuthenticated && (
              <Link to="/#precos" className="text-gray-600 hover:text-gray-900">
                Preços
              </Link>
            )}
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-gray-900"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button variant="outline">Entrar</Button>
                </Link>
                <Link to="/registro">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Registrar
                  </Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {user?.name || "Minha Conta"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/criar-contrato">Novo Contrato</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
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
              {!isAuthenticated && (
                <Link
                  to="/#precos"
                  className="text-gray-600 hover:text-gray-900 py-2"
                  onClick={toggleMobileMenu}
                >
                  Preços
                </Link>
              )}
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-gray-900 py-2"
                  onClick={toggleMobileMenu}
                >
                  Dashboard
                </Link>
              )}
              <div className="pt-4 flex flex-col space-y-3">
                {!isAuthenticated ? (
                  <>
                    <Link to="/login" onClick={toggleMobileMenu}>
                      <Button variant="outline" className="w-full">
                        Entrar
                      </Button>
                    </Link>
                    <Link to="/registro" onClick={toggleMobileMenu}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Registrar
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard" onClick={toggleMobileMenu}>
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <User className="h-4 w-4" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2 text-red-600"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      Sair
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
