import React, { useState, useEffect } from 'react'
import { Row, Col, Image,ListGroup, Button, Card, Form } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import Rating from '../components/Rating'
import { listProductDetails } from '../actions/ProductActions'
import Message from '../components/Message';
import Loader from '../components/Loader';

function ProductScreen() {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    let params = useParams();
    const history = useNavigate()

    useEffect(()=>{
        dispatch(listProductDetails(params.id))
    },[dispatch])

    const addToCartHandler = () => {
        console.log('id:', params.id)
        history(`/cart/${params.id}?qty=${qty}`)
    }

  return (
    <div>
        <Link to='/' claabtn btn-light my-3>Go back</Link>
        { loading ?
            <Loader/> 
            : error ?
            <Message variant='danger'>{error}</Message>
            : (
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid/>
                    </Col>

                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                price: ${product.price}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                description: ${product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0 ? `In Stock (${product.countInStock})` :'Out of stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col xs='auto' className='my-1'>
                                            <Form.Control
                                                as='select'
                                                value={qty}
                                                onChange={(e)=> setQty(e.target.value)}
                                            >
                                                {
                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                        <option key={x+1} value={x+1}>
                                                            {x+1}
                                                        </option>
                                                    ))
                                                }

                                            </Form.Control>    
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button 
                                onClick={addToCartHandler}
                                className='btn-block' type='button'
                                disabled={product.countInStock < 1 ? true : false }
                                >
                                    Add to cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            )
            
        }
        
    </div>
  )
}

export default ProductScreen