import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'

import { useFormik } from 'formik'

import Container from '../../components/Container'
import { useAuth } from '../../hooks/context/AuthProvider';
import { validationSchema } from "./validation"
import { Styled } from './styles';

//com o Formik [e] possivel, dentro dela, fazer funcoes de validacoes com o yup 

function Login() {
    const { signIn, error } = useAuth();
    const history = useHistory()

    //useFormik() - submete-se o valor inicial (como objeto) do formulario
    //por ser um login o estado inical deve ser em branco
    //os valores login e password sao buscados nas props passadas no Form.Control de cada elemento
    
    const formik = useFormik({
        initialValues: {
          login: '',
          password: '',
        },
        validationSchema,
        //o onSubmit vai ser a funcao que enviara os dados
        onSubmit: async values => {
          await signIn(values) //como [e] uma funcao assincrona ele ira esperar pela submissao do Form para poder enviar os valores (values) de signIn que no caso sao o login e senha
          history.push("/home") //o history.push ira 'redirecionar' para a pagina Home apos o signIn
        },
    });

    const AppError = useMemo(() => <Styled.Error>{error}</Styled.Error>, [error])
    const ValidationLoginError = useMemo(() => <Styled.Error>{formik.errors.login}</Styled.Error>, [formik.errors.login])
    const ValidationPasswordError = useMemo(() => <Styled.Error>{formik.errors.password}</Styled.Error>, [formik.errors.password])

    return (
        // as props 'title' e 'size' [e] utilizadas pelo componente 'Container' para definir quais sao os
        // atributos que essa pagina vai receber que no caso [e] title="Login" e size="sm"

        <Container title="Login" size="sm">
            {/* handleSubmit [e uma funcao que automaticamente ja envia a submissao do Form para o useFormik() setado acima*/}
            <Form  onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Login</Form.Label>
                {/* //form.control se comportam como 'inputs' */}
                <Form.Control 
                    id="login" //o id e o name ajudam o Formik a idenficadar os valores corretos para o submit
                    name="login"
                    placeholder="Coloque o seu login" 
                    onChange={formik.handleChange} //handleChange pega as informacoes que foram alteradas no input
                    isValid={formik.touched.login && !formik.errors.login}
                    isInvalid={formik.errors.login}
                />
            </Form.Group>
            {ValidationLoginError}        
            <Form.Group className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control 
                    id="password"
                    name="password"
                    type="password" //identifica que é uma senha
                    placeholder="Coloque a sua senha" 
                    onChange={formik.handleChange}
                    isValid={formik.touched.password && !formik.errors.password}
                    isInvalid={formik.errors.password}
                />
            </Form.Group>
            {ValidationPasswordError}
            <Button variant="primary" type="submit">
                Entrar
            </Button>
        </Form>
            {AppError}
        </Container>
    )
}

export default Login;