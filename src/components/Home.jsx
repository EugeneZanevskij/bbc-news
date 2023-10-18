import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/setup';

const Home = ({query, search}) => {
  const [news, setNews] = useState([{
    "source": {
    "id": "wired",
    "name": "Wired"
    },
    "author": "Martin Cizmar",
    "title": "6 Best Mattresses for Side Sleepers (2023): Budget, Luxe, Tested by Experts",
    "description": "The stats say most people prefer to snooze on their sides. If that’s you, then you might want to check out these WIRED-tested beds.",
    "url": "https://www.wired.com/gallery/best-mattresses-for-side-sleepers/",
    "urlToImage": "https://media.wired.com/photos/6529a2ad1a45fb957438ffbc/191:100/w_2580,c_limit/Nectar-Premier-Mattress.jpg",
    "publishedAt": "2023-10-15T11:00:00Z",
    "content": "Theres no such thing as the best mattress for everyone. Not when there are so many different sleeping positions. However, most people are side sleepers. The numbers vary by study and how rigidly you … [+1525 chars]"
    },
    {
    "source": {
    "id": "wired",
    "name": "Wired"
    },
    "author": "Nena Farrell",
    "title": "5 Best Nanoleaf Smart Lights (2023): Shapes, 4D Kit, and Installation Tips",
    "description": "Nanoleaf has some of the coolest smart lighting panels around. Here’s how to choose the right one for your home.",
    "url": "https://www.wired.com/gallery/best-nanoleaf-lights/",
    "urlToImage": "https://media.wired.com/photos/652970113841d3cd4702e7b5/191:100/w_2580,c_limit/Nanoleaf-Shapes-Kit-Gear.jpg",
    "publishedAt": "2023-10-15T13:00:00Z",
    "content": "Here are some tips and tricks we've learned from testing Nanoleaf products over the years,\r\nPrepare before you install. Decide and map out what you want to do in advance. Nanoleaf's lights attach to … [+1554 chars]"
    },
    {
    "source": {
    "id": "the-verge",
    "name": "The Verge"
    },
    "author": "David Pierce",
    "title": "Everything you need to track your movies, music, books, and more",
    "description": "Roblox comes to PlayStation, superlong extension cables, Big Vape on Netflix, Motorola’s new Razr, and much more in this week’s Installer newsletter.",
    "url": "https://www.theverge.com/23915813/sequel-sofa-media-tracking-apps-roblox-razr-big-vape-installer-newsletter",
    "urlToImage": "https://cdn.vox-cdn.com/thumbor/aDf2kyI5qstbk3y83DRm3iNgCz8=/0x0:3000x2000/1200x628/filters:focal(1500x1000:1501x1001)/cdn.vox-cdn.com/uploads/chorus_asset/file/24844606/Installer_Site_Post_002.jpg",
    "publishedAt": "2023-10-15T12:00:00Z",
    "content": "Everything you need to track your movies, music, books, and more\r\nEverything you need to track your movies, music, books, and more\r\n / Plus, in this weeks Installer: Roblox comes to PlayStation, supe… [+18559 chars]"
    },
    {
    "source": {
    "id": null,
    "name": "Android Central"
    },
    "author": "michael.hicks@futurenet.com (Michael L Hicks)",
    "title": "It's past time for fitness watches to promise proper software updates",
    "description": "If Google can promise seven years of updates for the Pixel 8, maybe it can promise *two* years of updates for the Fitbit Charge 6.",
    "url": "https://www.androidcentral.com/wearables/fitness-brands-need-to-guarantee-proper-software-updates",
    "urlToImage": "https://cdn.mos.cms.futurecdn.net/d48rhpLLvxaAKFhsSooiQc-1200-80.jpg",
    "publishedAt": "2023-10-15T15:30:28Z",
    "content": "When you buy a phone, tablet, or smartwatch today, you know exactly how many years of software updates it'll receive — such as three years for the Pixel Watch 2 or four years for the Galaxy Watch 6. … [+7190 chars]"
    },
    {
    "source": {
    "id": null,
    "name": "CNET"
    },
    "author": "Zachary McAuliffe",
    "title": "iOS 17 Lets You Turn Your Favorite Pictures Into Live Stickers - CNET",
    "description": "You can make send these stickers in Messages and other apps.",
    "url": "https://www.cnet.com/tech/mobile/ios-17-lets-you-turn-your-favorite-pictures-into-live-stickers/",
    "urlToImage": "https://www.cnet.com/a/img/resize/e733d29b2650ddd412d21609131de96f096ded41/hub/2023/09/14/addbc15f-e9df-4360-a95b-ff9687b44ba5/gettyimages-1258471667.jpg?auto=webp&fit=crop&height=675&width=1200",
    "publishedAt": "2023-10-15T11:00:04Z",
    "content": "After months of waiting, Apple released iOS 17 on Sept. 18, bringing a number of improvements to your iPhone, such as the useful StandBy mode. But one of the most impressive new features is iOS 17's … [+2005 chars]"
    },
    {
    "source": {
    "id": "business-insider",
    "name": "Business Insider"
    },
    "author": "Sarah Jackson,Grace Kay",
    "title": "A biographer spent years following Elon Musk and Steve Jobs. Here's how he says they're alike — and how they're different",
    "description": "What do two of the world's most well-known entrepreneurs have in common? It turns out a lot — at least according to their biographer, Walter Isaacson.",
    "url": "https://www.businessinsider.com/how-elon-musk-steve-jobs-similar-different-management-style-biography-walter-isaacson",
    "urlToImage": "https://i.insider.com/6526dcda68f1d46f52aede31?width=1200&format=jpeg",
    "publishedAt": "2023-10-15T08:45:01Z",
    "content": "Walter Isaacson identified some similarities between Elon Musk and Steve Jobs in his book on the Tesla CEO.Justin Sullivan/Getty Images and Tim Mosenfelder/Getty Images\r\n<ul>\n<li>Walter Isaacson trai… [+6962 chars]"
    },
    {
    "source": {
    "id": null,
    "name": "Hackaday"
    },
    "author": "Maya Posch",
    "title": "LabVIEW Abandons Mac After Four Decades",
    "description": "When National Instruments (NI) released LabVIEW in 1986 it only targeted the Macintosh, with ports to other platforms coming later on in the 1990s. Now, NI has announced that with the next version …",
    "url": "https://hackaday.com/2023/10/15/labview-abandons-mac-after-four-decades/",
    "urlToImage": "https://hackaday.com/wp-content/uploads/2020/07/hackaday-logo-with-text-opengraph-default-image.jpg",
    "publishedAt": "2023-10-15T17:00:57Z",
    "content": "When National Instruments (NI) released LabVIEW in 1986 it only targeted the Macintosh, with ports to other platforms coming later on in the 1990s. Now, NI has announced that with the next version in… [+1154 chars]"
    }]);
  const getNews = () => {
    fetch(`https://newsapi.org/v2/everything?q=${query}&from=2023-09-15&sortBy=popularity&apiKey=${import.meta.env.VITE_API_KEY}`)
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
    // getNews();
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