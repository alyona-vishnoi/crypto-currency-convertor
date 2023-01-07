import { useState, useEffect } from 'react';

import axios from "axios";
const NewsFeed= () => {
  const [articles, setArticles] = useState(null)
  
  useEffect(()=>{
    const options = {
      method: 'GET',
      url: 'https://crypto-update-live.p.rapidapi.com/news',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'crypto-update-live.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
      setArticles(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }, [])
  

  const first7articles = articles?.slice(0,7)
  console.log(first7articles?.map(article => article.Title))
  return (
      <div className = "news-feed">
        <h2>News Feed</h2>
        {first7articles?.map((article,_index) => (
        <div key={_index}>
          <a href={article.URL} target="_blank" rel="noreferrer noopener"><p>{article.Title}</p></a>
          </div>))}
      </div>
    );
  };

export default NewsFeed