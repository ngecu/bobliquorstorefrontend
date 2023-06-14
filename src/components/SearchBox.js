import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Input } from 'antd';


const { Search } = Input;

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = () => {
    
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
  <Form>

<Search
      placeholder="Input Product Here"
      
      size="large"
      onChange={(e) => setKeyword(e.target.value)}
      
      onSearch={(e)=>submitHandler(e)}
    />

</Form>
    
  )
}

export default SearchBox
