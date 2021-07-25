import React from 'react';
import { Card, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useProduct } from '../../hooks/context/ProductProvider'
// import { Container } from './styles';
// esse componete é o que renderiza os produtos em forma de um cartão
// recebe as props 'name', 'price' e 'description

function CardProduct({product}) {
  const history = useHistory()
  const { deleteProduct } = useProduct()

  const handleDelete = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Você deseja excluir esse produto?',
      text: "Caso exclua, será permanente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, quero deletar!',
      cancelButtonText: 'Não, quero cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct({id: product.id})
        swalWithBootstrapButtons.fire(
          'Deletado!',
          'Seu arquivo foi deletado!',
          'Sucesso'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Seu arquivo foi salvo',
          'Error'
        )
      }
    })
  }
  const handleEdit = () => {
    history.push(`edit-product/${product.id}`, {
      product
    })
  }
  return (
    <Card  className="mb-4" style={{ width: '15rem'}}>
      {/* <Card.Img variant="top" src={product.image} /> */}
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{product.price}</Card.Subtitle>
        <Card.Text>
        {product.description}
        </Card.Text>
        <Button variant="primary" onClick={handleDelete}>
                Excluir
        </Button>{' '}
        <Button variant="primary" onClick={handleEdit}>
                Editar
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CardProduct;