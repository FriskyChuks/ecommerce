import React from 'react'
import {Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Rating from './Rating'

function Product({product}) {
  return (
    <Card className='my-4 p-3 rounded'>
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image}/>
          <Card.Body>
            <Link to={`/product/${product._id}`}>
              <Card.Title as="div">
                <strong>{product.name}</strong>
              </Card.Title>
            </Link>
            
            <Card.Text>
              <div className='my-3'>
                {product.rating} from {product.numReviews} reviews
                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}></Rating>
              </div>
            </Card.Text>

            <Card.Text as='h3'>
              ${product.price}
            </Card.Text>
          </Card.Body>
        </Link>
    </Card>
  )
}

export default Product