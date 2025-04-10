
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-blue-600">ContratoFácil</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/como-funciona" className="text-gray-600 hover:text-gray-900">Como Funciona</Link>
          <Link to="/modelos" className="text-gray-600 hover:text-gray-900">Modelos</Link>
          <Link to="/precos" className="text-gray-600 hover:text-gray-900">Preços</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline">Entrar</Button>
          </Link>
          <Link to="/registro">
            <Button className="bg-blue-600 hover:bg-blue-700">Registrar</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
