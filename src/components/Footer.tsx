
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ContratoFácil</h3>
            <p className="text-gray-600">
              Contratos personalizados com IA em minutos. 
              Segurança jurídica para seu negócio.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Produto</h4>
            <ul className="space-y-2">
              <li><Link to="/como-funciona" className="text-gray-600 hover:text-blue-600">Como Funciona</Link></li>
              <li><Link to="/modelos" className="text-gray-600 hover:text-blue-600">Modelos Disponíveis</Link></li>
              <li><Link to="/precos" className="text-gray-600 hover:text-blue-600">Planos e Preços</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/termos" className="text-gray-600 hover:text-blue-600">Termos de Uso</Link></li>
              <li><Link to="/privacidade" className="text-gray-600 hover:text-blue-600">Política de Privacidade</Link></li>
              <li><Link to="/lgpd" className="text-gray-600 hover:text-blue-600">LGPD</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Contato</h4>
            <ul className="space-y-2">
              <li><a href="mailto:contato@contratofacil.com" className="text-gray-600 hover:text-blue-600">Email</a></li>
              <li><a href="https://wa.me/5511999999999" className="text-gray-600 hover:text-blue-600">WhatsApp</a></li>
              <li><a href="https://linkedin.com/company/contratofacil" className="text-gray-600 hover:text-blue-600">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} ContratoFácil. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
