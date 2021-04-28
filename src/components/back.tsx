import React from 'react'
import { Button } from "antd";
import { useHistory } from 'react-router';

export default () => {
  const history = useHistory()
  return (
    <div>
      <Button type='primary' onClick={() => {
        history.goBack()
      }}>Back</Button>
    </div>
  )
}