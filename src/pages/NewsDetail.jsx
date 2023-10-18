import React from 'react'
import { useLocation } from 'react-router-dom';
import Comments from '../components/Comments';

const NewsDetail = () => {
  const location = useLocation();
  const data = location.state.data;
  console.log(data);
  return (
    <div className='grid grid-cols-2 p-4'>
      <div>
        <h1 className='text-3xl font-bold'>{data.title}</h1>
        <h4>{data.description}</h4>
        <img src={data.urlToImage} alt={data.title} />
      </div>
      <div>
        <Comments id={data.url.substr(-10, 10)} />
      </div>
    </div>
  )
}

export default NewsDetail