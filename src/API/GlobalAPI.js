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
  baseUrl
})
const baseQueryWithHeaders = async (args, api, extraOptions) => {
  const result = await customBaseQuery(args, api, extraOptions)
  if (result.meta && result.meta.response) {
    const headers = {}
    result.meta.response.headers.forEach((value, key) => {
      headers[key] = value
    })

    console.log({ headers })
    return { ...result, headers }
  }
  return result
}

export const GlobalAPI = createApi({
  reducerPath: 'GlobalAPI',
  baseQuery: baseQueryWithHeaders,
  endpoints: builder => ({
    register: builder.mutation({
      query: ({ input }) => createPostRequest('/auth/register/', input),
      invalidatesTags: ['user']
    }),
    login: builder.mutation({
      query: ({ input }) => createPostRequest('/auth/login/', input),
      invalidatesTags: ['user']
    })
  })
})
export const { useLoginMutation, useRegisterMutation } = GlobalAPI
