import React from 'react'
import { Table } from 'react-bootstrap'
import { useGetProductMutation, useGetProductQuery } from '../API/RestrictedAPI'

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
              {/* <td> <div style={{ display: 'flex', gap: '10px' }}>
                            <div
                              onClick={() => {
                                setDisplay(true)
                               
                                setOperate(item)
                              }}
                            >
                              <OverlayTrigger
                                placement='top'
                                overlay={<Tooltip id='tooltip'>View</Tooltip>}
                              >
                                <img src='/eye.svg' alt='Eye' />
                              </OverlayTrigger>
                            </div>
                         
                          
                            
                          </div></td> */}
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
