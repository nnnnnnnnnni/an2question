import React from 'react'
import { useParams } from 'react-router'

export default function () {
  const params = useParams<{id: string}>();
  const questionId = params.id;
  return (
    <div className='admin-content'></div>
  )
}