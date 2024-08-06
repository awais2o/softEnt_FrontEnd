import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { useAddProductMutation } from '../API/RestrictedAPI'
import { useUser } from '../Providers/UserProvider'
import toast from 'react-hot-toast'

const AddProduct = ({ display, setDisplay }) => {
  const [addProduct, addedResults] = useAddProductMutation()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    pictures: []
  })
  const [validated, setValidated] = useState(false)
  const [uploading, setUploading] = useState(false)
  const { user } = useUser()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleFileChange = async e => {
    const files = Array.from(e.target.files)

    if (formData.pictures.length + files.length > 6) {
      alert('You can only upload up to 6 images.')
      return
    }

    setUploading(true)

    const uploadedPictures = await Promise.all(
      files.map(async file => {
        const formData = new FormData()
        formData.append('file', file)

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/products/upload`,
          formData
        )
        return response.data.url
      })
    )

    setFormData(prevData => ({
      ...prevData,
      pictures: [...prevData.pictures, ...uploadedPictures]
    }))

    setUploading(false)
  }

  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    if (form.checkValidity() === false) {
    } else {
      addProduct({ input: { ...formData, user: user.id } })
    }
    setValidated(true)
  }

  useEffect(() => {
    if (addedResults.isSuccess) {
      toast.success('Product Added Successfull', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff'
        }
      })
      setDisplay(false)
    }
    if (addedResults.isError) {
      toast.success('Failed to Add Product', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff'
        }
      })
    }
  }, [addedResults])

  return (
    <Modal show={display} onHide={() => setDisplay(false)}>
      <Modal.Header closeButton>Add Product</Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId='formName'>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              required
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              minLength={3}
              placeholder='Enter product name'
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a product name (min length 3 ).
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId='formPrice'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              required
              type='number'
              name='price'
              value={formData.price}
              onChange={handleChange}
              max={100000}
              placeholder='Enter price'
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a price (less than 100000).
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId='formQuantity'>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              required
              type='number'
              name='quantity'
              max={100000}
              value={formData.quantity}
              onChange={handleChange}
              placeholder='Enter quantity'
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a quantity( less than 100000).
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId='formPictures'>
            <Form.Label>Pictures</Form.Label>
            <Form.Control
              required
              type='file'
              multiple
              onChange={handleFileChange}
              disabled={uploading}
              accept='image/*'
            />
            <Form.Control.Feedback type='invalid'>
              Please upload up to 6 images.
            </Form.Control.Feedback>
            {uploading && <p>Uploading...</p>}
          </Form.Group>

          <Button
            variant='primary'
            type='submit'
            className='mt-3'
            disabled={uploading}
          >
            Add Product
          </Button>
        </Form>
        {formData.pictures.length > 0 && (
          <div className='image-container mt-3'>
            {formData.pictures.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Uploaded ${index}`}
                className='uploaded-image ms-2'
              />
            ))}
          </div>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default AddProduct
