import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = process.env.REACT_APP_API_URL

const createRequest = url => ({
  method: 'GET',
  url
})

const createPostRequest = (url, data) => ({
  method: 'POST',
  url,
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json' }
})

const createDeleteRequest = (url, data) => ({
  method: 'DELETE',
  url,
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json' }
})

const createUpdateRequest = (url, data) => ({
  method: 'PUT',
  url,
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json' }
})
const customBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const authtoken = localStorage.getItem('Authorization')

    console.log(authtoken)

    if (authtoken) {
      headers.set('Authorization', `Bearer ${authtoken}`)
    }
    return headers
  }
})
const baseQueryWithHeaders = async (args, api, extraOptions) => {
  const result = await customBaseQuery(args, api, extraOptions)
  if (result.meta && result.meta.response) {
    const headers = {}
    result.meta.response.headers.forEach((value, key) => {
      headers[key] = value
    })

    return { ...result, headers }
  }
  return result
}

export const RestrictedAPI = createApi({
  reducerPath: 'RestrictedAPI',
  baseQuery: baseQueryWithHeaders,
  endpoints: builder => ({
    getProduct: builder.query({
      query: () => createRequest('/products/'),
      providesTags: ['products']
    }),
    addProduct: builder.mutation({
      query: ({ input }) => createPostRequest('/products/', input),
      invalidatesTags: ['products']
    })
  })
})
export const { useAddProductMutation, useGetProductQuery } = RestrictedAPI
