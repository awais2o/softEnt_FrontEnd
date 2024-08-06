import React from 'react'
import { Table } from 'react-bootstrap'
import { useGetProductQuery } from '../API/RestrictedAPI'

const ProductTable = () => {
  const { data: products } = useGetProductQuery()
  return (
    <Table striped hover responsive className='transparent-table '>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {products?.length > 0 ? (
          products?.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
            </tr>
          ))
        ) : (
          <>
            <tr>
              <td>No Product</td>
            </tr>
          </>
        )}
      </tbody>
    </Table>
  )
}

export default ProductTable
