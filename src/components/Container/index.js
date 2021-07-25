/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Styled } from './styles';

//dentro dos containers lg e sm define-se o tamanho dos elementos e de sua distribuição em cada pagina
//podemos tbm definir o titulo utilizando das props que sao definidas nas paginas em questao
//exemplo ver login
//o children e utilizaado para que os todos os elementos filhos  dentro do container tbm recebam o mesmo estilo 

function Container({children, title, size}) {
  switch (size) {
    case "lg":
        return (
            <Styled.ContainerLG>
                <Styled.Title>{title}</Styled.Title>
                {children}
            </Styled.ContainerLG>
        )
    case "sm":
        return (
            <Styled.ContainerSM>
                <Styled.Title>{title}</Styled.Title>
                    {children}
            </Styled.ContainerSM>
        )
      default:
          return null;
  }
}

export default Container;