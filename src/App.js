//App deixa de ser uma pagina para gerenciar as rotas, paginas e estilos

import Routes from './routes';
import GlobalStyle from './styles/global';
import { BrowserRouter } from 'react-router-dom'; //contexto vindo da biblioteca para gerenciar o comportamento das rotas com os componentes

function App() {
  return (
    <BrowserRouter>
      <Routes />
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
