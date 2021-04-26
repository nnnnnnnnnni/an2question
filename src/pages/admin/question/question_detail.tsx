import React from 'react'
import { useParams } from 'react-router'

export default function () {
  const params = useParams();
  return (
    <div>{JSON.stringify(params)}</div>
  )
}