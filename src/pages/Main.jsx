import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Home from '../components/Home'

const Main = () => {
  const [query, setQuery] = useState('All');
  const [search, setSearch] = useState('');
  return (
    <div>
      <Navbar setQuery={setQuery} setSearch={setSearch}/>
      <Home query={query} search={search}/>
    </div>
  )
}

export default Main