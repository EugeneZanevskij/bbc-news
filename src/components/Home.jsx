import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/setup';

const Home = ({query, search}) => {
  const [news, setNews] = useState(
    [
      {
          "source": {
              "id": null,
              "name": "Lifehacker.com"
          },
          "author": "Daniel Oropeza",
          "title": "These Robot Vacuums Are at All-Time Low Prices During October Prime Day",
          "description": "It’s the final day of Amazon’s Prime Big Deal Days, but there are still bargains to be had—particularly for you neat freaks out there. If cordless stick vacuums are too much work and you’d rather let a robot take over, you have many options to choose from, so…",
          "url": "https://lifehacker.com/robot-vacuum-deals-prime-day-1850919434",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/0b0c50c32b75df0ff077969ad99bbab9.jpg",
          "publishedAt": "2023-10-11T20:08:52Z",
          "content": "Its the final day of Amazons Prime Big Deal Days, but there are still bargains to be hadparticularly for you neat freaks out there. If cordless stick vacuums are too much work and youd rather let a r… [+2262 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Lifehacker.com"
          },
          "author": "Claire Lower",
          "title": "Everything You Wanted to Know About Salt but Were Too Afraid to Ask",
          "description": "I’m not being hyperbolic when I say salt is the most important seasoning of all time. It makes things taste salty, sure, but it also makes things taste like better versions the themselves, and more importantly, salt is a powerful preservative and natural anti…",
          "url": "https://lifehacker.com/everything-you-wanted-to-know-about-salt-but-were-too-a-1850851318",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/bf85fd3ef8fff3559ebddddc128a3020.png",
          "publishedAt": "2023-10-13T17:30:00Z",
          "content": "Im not being hyperbolic when I say salt is the most important seasoning of all time. It makes things taste salty, sure, but it also makes things taste like better versions the themselves, and more im… [+11029 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Lifehacker.com"
          },
          "author": "Lauren Passell",
          "title": "The Scariest Horror Podcasts to Listen This Halloween",
          "description": "Whether or not you love hearing spooky stories all year round,October is inarguably the best time of year to indulge. If you’re looking for a podcast that will scare you silly, here’s a terrifyingly good roundup of prospects—some based on true stories, some t…",
          "url": "https://lifehacker.com/the-best-horror-podcasts-for-halloween-1850930127",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/c2ef303c96ee5b614608657e739d9fb5.jpg",
          "publishedAt": "2023-10-16T18:00:00Z",
          "content": "Whether or not you love hearing spooky stories all year round,October is inarguably the best time of year to indulge. If youre looking for a podcast that will scare you silly, heres a terrifyingly go… [+8498 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Lifehacker.com"
          },
          "author": "Lindsey Ellefson",
          "title": "The Gmail Add-ons You Need (and the Ones You Don’t)",
          "description": "You can get all kinds of Chrome extensions and add-ons for Gmail that make inbox management and utility easier, but some of them are less useful than others. Before you waste space (and potentially money), let’s go over some cheap ones that are actually helpf…",
          "url": "https://lifehacker.com/the-gmail-add-ons-you-need-and-the-ones-you-don-t-1850921673",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/fba7a5af8d4dc8ec2fc00f94f159af5f.jpg",
          "publishedAt": "2023-10-12T17:00:00Z",
          "content": "You can get all kinds of Chrome extensions and add-ons for Gmail that make inbox management and utility easier, but some of them are less useful than others. Before you waste space (and potentially m… [+3209 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Lifehacker.com"
          },
          "author": "Beth Skwarecki",
          "title": "Today’s NYT Connections Hints (and Answer) for Wednesday, October 11, 2023",
          "description": "If you’re looking for the Connections answer for Wednesday, October 11, 2023, read on—I’ll share some clues, tips, and strategies, and finally the solutions to all four categories. Beware, there are spoilers below for October 11, NYT Connections #122! Read on…",
          "url": "https://lifehacker.com/nyt-connections-answer-today-october-11-2023-1850914556",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/f9fb235a92378df58dee12c173fe39da.png",
          "publishedAt": "2023-10-11T01:00:00Z",
          "content": "If youre looking for the Connections answer for Wednesday, October 11, 2023, read onIll share some clues, tips, and strategies, and finally the solutions to all four categories. Beware, there are spo… [+5759 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Lifehacker.com"
          },
          "author": "Claire Lower",
          "title": "How to Choose the Right Cooking Oil (or Butter)",
          "description": "Cooking without fat is doable, but not fun. Not only does fat equal flavor, it promotes browning, helps seasonings cling, and keeps food from sticking to the pan. There is an overwhelming number of cooking fats on the market, but the average kitchen doesn’t n…",
          "url": "https://lifehacker.com/how-to-choose-the-right-cooking-oil-or-butter-1850863098",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/acb1db8f476ad67deffe5a7f1764d331.png",
          "publishedAt": "2023-10-13T19:30:00Z",
          "content": "Cooking without fat is doable, but not fun. Not only does fat equal flavor, it promotes browning, helps seasonings cling, and keeps food from sticking to the pan. There is an overwhelming number of c… [+4319 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Lifehacker.com"
          },
          "author": "Elizabeth Yuko",
          "title": "How to Clean a Box Spring",
          "description": "Though they’re less common today than in the past, many people still use a box spring between their mattress and bed frame. Back when innerspring mattresses were the norm, box springs were used for support, and to ensure that they didn’t sag or sink over time…",
          "url": "https://lifehacker.com/how-to-clean-a-box-spring-1850921545",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/c2eca83f44d82a3893308ad328464e80.jpg",
          "publishedAt": "2023-10-15T13:00:00Z",
          "content": "Though theyre less common today than in the past, many people still use a box spring between their mattress and bed frame. Back when innerspring mattresses were the norm, box springs were used for su… [+1612 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Lifehacker.com"
          },
          "author": "Khamosh Pathak",
          "title": "Why You Keep Triggering Fireworks During Video Calls (and How to Fix It)",
          "description": "Did you just update your iPhone and Mac to the latest versions of iOS 17 and macOS Sonoma? Did you also accidentally set off fireworks during your latest work call, or somehow get it to start “raining” when on a FaceTime call with your parents? It’s not your …",
          "url": "https://lifehacker.com/why-you-keep-triggering-fireworks-during-video-calls-a-1850924117",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/cce92bfe9faba0b6b2e48da531024ca6.png",
          "publishedAt": "2023-10-13T21:30:00Z",
          "content": "Did you just update your iPhone and Mac to the latest versions of iOS 17 and macOS Sonoma? Did you also accidentally set off fireworks during your latest work call, or somehow get it to start raining… [+2190 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Lifehacker.com"
          },
          "author": "Ross Johnson",
          "title": "The 24 Best Horror Comedies Streaming Right Now",
          "description": "Author Robert Block (Psycho) described comedy and horror as “opposite sides of the same coin.” Since the silent days, movies have blended the styles, and, by 1948, Abbott and Costello Meet Frankenstein was doing bigger box office numbers than Universal’s stra…",
          "url": "https://lifehacker.com/best-horror-comedies-1850914493",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/f483d9668b10268233c3de0ee63aa38b.png",
          "publishedAt": "2023-10-11T15:00:00Z",
          "content": "Author Robert Block (Psycho) described comedy and horror as opposite sides of the same coin. Since the silent days, movies have blended the styles, and, by 1948, Abbott and Costello Meet Frankenstein… [+13174 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Lifehacker.com"
          },
          "author": "Jessica Kanzler",
          "title": "This Kodak Film and Slide Scanner Is $170 Right Now",
          "description": "The Kodak Slide N Scan makes preserving old photos incredibly easy, and it’s on sale right now for $169.97 with coupon code KODAK. It lets you view and edit both color and black and white negatives (135, 110, and 126 mm film sizes), as well as 35 and 50mm sli…",
          "url": "https://lifehacker.com/this-kodak-film-and-slide-scanner-is-170-right-now-1850892504",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/e491d8b3e3f3272688a62bc89a5a86f1.png",
          "publishedAt": "2023-10-14T14:15:00Z",
          "content": "The Kodak Slide N Scan makes preserving old photos incredibly easy, and its on sale right now for $169.97 with coupon code KODAK. It lets you view and edit both color and black and white negatives (1… [+1102 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Lifehacker.com"
          },
          "author": "Jake Peterson",
          "title": "You Can Now Chat With One of Meta’s Horrifying AI Personas",
          "description": "AI is everywhere, and it’s only going to continue taking over our lives. You don’t even need to download anything AI-specific in order to try it out for yourself. In fact, you can do it right from Instagram. Meta is now rolling out its AI chatbots to its vari…",
          "url": "https://lifehacker.com/you-can-now-chat-with-one-of-meta-s-horrifying-ai-perso-1850925959",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/64df1d11aa6505d9f0918ba02039e253.png",
          "publishedAt": "2023-10-14T00:00:00Z",
          "content": "AI is everywhere, and its only going to continue taking over our lives. You dont even need to download anything AI-specific in order to try it out for yourself. In fact, you can do it right from Inst… [+4543 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Lifehacker.com"
          },
          "author": "Lindsey Ellefson",
          "title": "These Apps Are Secretly Cluttering Up Your Camera Roll",
          "description": "If you want to declutter your phone and free up memory, start with your pictures—media takes up more space than you think. To stop your camera roll from filling up with junk, you also need to mess with your settings, because some apps are sliding memory kille…",
          "url": "https://lifehacker.com/these-apps-are-secretly-cluttering-up-your-camera-roll-1850913660",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/0c03f75097e3b239f94fca2908d6c869.jpg",
          "publishedAt": "2023-10-11T14:00:00Z",
          "content": "If you want to declutter your phone and free up memory, start with your picturesmedia takes up more space than you think. To stop your camera roll from filling up with junk, you also need to mess wit… [+2690 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Lifehacker.com"
          },
          "author": "Joel Cunningham",
          "title": "My Favorite Coffee Grinder Is $80 Right Now",
          "description": "Good coffee begins with good coffee beans, but it doesn’t end there: You’ve also got to know how to do the brew. Before you can brew your beans well, you’ve got to grind them to perfection—which means you need a good coffee grinder. And right now, you can get…",
          "url": "https://lifehacker.com/my-favorite-coffee-grinder-is-80-right-now-1850917834",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/6a8ad2a5d50c8af686eecda15e145576.png",
          "publishedAt": "2023-10-11T19:00:00Z",
          "content": "Good coffee begins with good coffee beans, but it doesnt end there: Youve also got to know how to do the brew. Before you can brew your beans well, youve got to grind them to perfectionwhich means yo… [+2000 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Lifehacker.com"
          },
          "author": "Claire Lower",
          "title": "How to Buy, Use, and Care for Stainless Steel Cookware",
          "description": "Stainless steel cookware is the journeyman of the kitchen. It quietly and competently does its job, without the need for pampering (like cast iron) or any public drama (like Teflon-coated nonstick). If cast iron is a flashy Leo who lives for praise, stainless…",
          "url": "https://lifehacker.com/how-to-buy-use-and-care-for-stainless-steel-cookware-1850907423",
          "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/9b04a6d40259ee70e8a7e3feb2c2ac7f.png",
          "publishedAt": "2023-10-13T13:00:00Z",
          "content": "Stainless steel cookware is the journeyman of the kitchen. It quietly and competently does its job, without the need for pampering (like cast iron) or any public drama (like Teflon-coated nonstick). … [+11861 chars]"
      },
      {
          "source": {
              "id": "engadget",
              "name": "Engadget"
          },
          "author": "Engadget",
          "title": "The 40+ best Prime Day deals to shop for right now — from portable tech to smart home gear",
          "description": "We're into day two of Amazon's second Prime Day sale event for 2023, and it's still a great opportunity to shop for your holiday gifts early — or get something for yourself. If you missed out on any of the deals from the company's Prime Day event in July, thi…",
          "url": "https://www.engadget.com/the-best-amazon-prime-day-deals-to-shop-for-right-now-142009528.html",
          "urlToImage": "https://s.yimg.com/ny/api/res/1.2/vjpoynfKIvfiAarIzmBiPg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02NzU-/https://s.yimg.com/os/creatr-uploaded-images/2023-09/0fb044e0-561b-11ee-bdf7-b17fac937fb3",
          "publishedAt": "2023-10-11T14:20:09Z",
          "content": "We're into day two of Amazon's second Prime Day sale event for 2023, and it's still a great opportunity to shop for your holiday gifts early or get something for yourself. If you missed out on any of… [+23972 chars]"
      },
      {
          "source": {
              "id": "engadget",
              "name": "Engadget"
          },
          "author": "Lawrence Bonk",
          "title": "Stockholm bans most combustion engine cars from its city center",
          "description": "The combustion engine is a marvel of engineering, but has also majorly contributed to air pollution. After all, there are over 1.4 billion combustion engine vehicles roaming the planet. That’s a whole lot of carbon monoxide, nitrogen oxide and hydrocarbons be…",
          "url": "https://www.engadget.com/stockholm-bans-most-combustion-engine-cars-from-its-city-center-173240306.html",
          "urlToImage": "https://s.yimg.com/ny/api/res/1.2/3mq1B3Eo5OiktkSX11vAxw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2023-10/1632e180-691f-11ee-b3bf-1c99a4f8b3ab",
          "publishedAt": "2023-10-12T17:32:40Z",
          "content": "The combustion engine is a marvel of engineering, but has also majorly contributed to air pollution. After all, there are over 1.4 billion combustion engine vehicles roaming the planet. Thats a whole… [+2550 chars]"
      },
      {
          "source": {
              "id": "engadget",
              "name": "Engadget"
          },
          "author": "Sarah Fielding",
          "title": "Best Buy may end DVD and Blu-ray sales early next year",
          "description": "The fight to keep DVD sales going is taking another big hit. Best Buy is allegedly ending all physical media sales — that means Blu-ray, DVD and 4K Ultra HD — in-store and online, The Digital Bits reported. Multiple sources claim the move will occur in early …",
          "url": "https://www.engadget.com/best-buy-may-end-dvd-and-blu-ray-sales-early-next-year-121318167.html",
          "urlToImage": "https://s.yimg.com/ny/api/res/1.2/56kxI_HJWj5kvimJMSVIoA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2023-04/bc44ecb0-d3ad-11ed-bf3d-9b63f5c288d9",
          "publishedAt": "2023-10-13T12:13:18Z",
          "content": "The fight to keep DVD sales going is taking another big hit. Best Buy is allegedly ending all physical media sales that means Blu-ray, DVD and 4K Ultra HD in-store and online, The Digital Bits report… [+1011 chars]"
      },
      {
          "source": {
              "id": "engadget",
              "name": "Engadget"
          },
          "author": "Jeff Dunn",
          "title": "The best Prime Day laptop deals: Save on MacBooks, gaming laptops and more",
          "description": "We're rounding the corner on Amazon's October Prime Day event, but if you're hoping to grab a new laptop, you can still take advantage of a few worthwhile discounts. While major Amazon sales like this week's Prime Big Deal Days aren’t quite a haven for deals …",
          "url": "https://www.engadget.com/best-laptop-deals-prime-day-october-2023-180937257.html",
          "urlToImage": "https://s.yimg.com/ny/api/res/1.2/qZDzLXAUQCKuEOm7r6G63A--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD03OTE-/https://s.yimg.com/os/creatr-uploaded-images/2023-10/1c6a5a30-66c0-11ee-bdfd-03dcb1958369",
          "publishedAt": "2023-10-11T18:09:37Z",
          "content": "We're rounding the corner on Amazon's October Prime Day event, but if you're hoping to grab a new laptop, you can still take advantage of a few worthwhile discounts. While major Amazon sales like thi… [+6688 chars]"
      },
      {
          "source": {
              "id": "engadget",
              "name": "Engadget"
          },
          "author": "Sarah Fielding",
          "title": "California’s new law makes it easier for consumers to request the deletion of their data",
          "description": "California is officially the first state to pass a law streamlining personal data removal. On October 10, Governor Gavin Newsom signed SB 362, known as the Delete Act, into law, requiring the California Privacy Protection Agency (CPPA) to create and roll out …",
          "url": "https://www.engadget.com/californias-new-law-makes-it-easier-for-consumers-to-request-the-deletion-of-their-data-095555419.html",
          "urlToImage": "https://s.yimg.com/ny/api/res/1.2/Qbm7PI1pAC2ACHeoiibrEA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2023-08/80ac9a20-4d03-11ee-bdff-374b33fed718",
          "publishedAt": "2023-10-11T09:55:55Z",
          "content": "California is officially the first state to pass a law streamlining personal data removal. On October 10, Governor Gavin Newsom signed SB 362, known as the Delete Act, into law, requiring the Califor… [+1362 chars]"
      },
      {
          "source": {
              "id": "engadget",
              "name": "Engadget"
          },
          "author": "Engadget",
          "title": "The 10 best Amazon Prime Day SSD deals we recommend for upgrading your storage",
          "description": "We're nearing the end of Amazon's October Prime Day event, but if you need a new microSD card for your camera or Nintendo Switch, a PS5 storage boost or an external drive for your travels, there are still numerous deals on offer. Yes, Black Friday is right ar…",
          "url": "https://www.engadget.com/best-ssd-storage-deals-prime-day-october-2023-201934920.html",
          "urlToImage": "https://s.yimg.com/ny/api/res/1.2/wc_6hGrbjvnNFNBL9_vx2Q--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD03MjA-/https://s.yimg.com/os/creatr-uploaded-images/2023-09/284b16a0-5bb2-11ee-aefb-657b7f0c4fbd",
          "publishedAt": "2023-10-11T20:19:34Z",
          "content": "We're nearing the end of Amazon's October Prime Day event, but if you need a new microSD card for your camera or Nintendo Switch, a PS5 storage boost or an external drive for your travels, there are … [+4490 chars]"
      }
  ]
  );
  const getNews = () => {
    fetch(`https://newsapi.org/v2/everything?q=${query}&from=2023-10-11&sortBy=popularity&pageSize=20&page=1&apiKey=${import.meta.env.VITE_API_KEY}`)
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