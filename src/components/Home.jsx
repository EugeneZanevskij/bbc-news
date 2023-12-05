import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/setup';

const Home = ({query, search}) => {
  const [news, setNews] = useState([]);
  const getNews = () => {
    fetch(`https://newsapi.org/v2/everything?q=${query}&from=2023-12-04&sortBy=popularity&pageSize=20&page=1&apiKey=${import.meta.env.VITE_API_KEY}`)
      .then(res => res.json())
      .then(json => setNews(json.articles))
  }

  const addNews = async (data) => {
    const newsDoc = doc(db, 'News', data.url.substr(-10, 10))
    try {
      await setDoc(newsDoc, {
        title: data.title,
        description: data.description
      })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getNews();
    console.log(news);
  }, [news])
  return (
    <div className='pt-12 p-4 grid grid-cols-4 h-100%'>
      {news.filter(data => data.title.includes(search)).map((data, index) => 
      {
        const id = data.url.substr(-10, 10);
      return <Link key={index} onClick={() => addNews(data)} state={{data: data}} to={`/news/${id}`}>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src={data.urlToImage} alt={data.title} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{data.title}</div>
            <p className="text-gray-700 text-base">
              {data.description}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
          </div>
        </div>
      </Link>
})}
    </div>
  )
}

export default Home