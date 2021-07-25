//local que determina as minhas rotas

import React from 'react';
//imports para setar as rotas
import { Switch, Route, Redirect } from 'react-router-dom'
//switch: troca o componente que será renderizado dependendo da rota setada
//router: definir a rota e qual o componente sera renderizado
//redirect: redireciona para 'x' componente

//estilos
import { Styled } from './styles';
//paginas
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import CreateProduct from '../pages/CreateProduct';
import EditProduct from '../pages/EditProduct';
//componentes
import Navbar from '../components/Navbar';
//contexto
import { useAuth } from '../hooks/context/AuthProvider';

// import { Container } from './styles';

function Routes() {
  const { auth } = useAuth();
  return (
    // applayout servem como container para definir o tamanho da aplicacao e das paginas dentro dela
    <Styled.AppLayout>
      {/* //a navbar fica fora pois divide a tela com as paginas das rotas */}
        {auth && <Navbar />}
        <Styled.PageLayout>
            <Switch>
                {/* { a palavra exact define que se tiver so essa barra(/), somente o (Login) sera renderizado} */}
                <Route path="/" exact component={Login} />
                {auth && <Route path="/home" component={Home} />}
                {auth && <Route path="/create-product" component={CreateProduct} />}
                {auth && <Route path="/edit-product/:id" component={EditProduct} />}
                {/* //se tiver alguma rota diferente das setadas redirecione para NotFound */}
                <Redirect from="*" to={NotFound} />
            </Switch>
        </Styled.PageLayout>
    </Styled.AppLayout>
  );
}

export default Routes;