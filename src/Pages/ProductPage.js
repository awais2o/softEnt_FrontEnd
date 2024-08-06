import React, { useState } from 'react'
import MyNav from '../Components/MyNav'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import AddProduct from '../Components/AddProduct'
import ProductTable from '../Components/ProductTable'
import { useGetProductMutation } from '../API/RestrictedAPI'

const ProductPage = () => {
  const [display, setDisplay] = useState(false)

  return (
    <>
      <MyNav />
      <section className=' mt-3 ms-3'>
        <Row className='mb-3'>
          <Col sm={12} md={6}>
            <h3>Products</h3>
          </Col>
          <Col
            sm={12}
            md={6}
            className='d-flex justify-content-end pe-5 mt-md-0 mt-sm-3'
          >
            <Button
              variant='inherit'
              className='text-black border border-black hover'
              onClick={() => {
                setDisplay(true)
              }}
            >
              Add Product
            </Button>
          </Col>
        </Row>
        <ProductTable></ProductTable>
      </section>

      {display && (
        <AddProduct display={display} setDisplay={setDisplay}></AddProduct>
      )}
    </>
  )
}

export default ProductPage
