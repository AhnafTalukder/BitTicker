import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CoinInfo from './components/CoinInfo';

import {useEffect} from 'react';

function App() {
  const [list, setList] = useState(null)
  const[filteredResults, setFilteredResults] = useState([]);
  const[searchInput, setSearchInput] = useState("");

  const API_KEY = import.meta.env.VITE_APP_API_KEY;
  

  useEffect(()=>{
    const fetchAllCoinData = async () =>{
      const response = await fetch(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=${API_KEY}`)
      const json = await response.json();
  
      setList(json)
      console.log(json)
  
    }

    fetchAllCoinData().catch(console.error);
  
  },[]);

 
  const searchItems = (searchValue) =>{
    setSearchInput(searchValue);

    if(searchValue !== ""){
      const filteredCoins = list.Data.filter((item)=>
        Object.values(item.CoinInfo).join("").toLowerCase().includes(searchValue.toLowerCase())
      )

      console.log(filteredCoins)
      setFilteredResults(filteredCoins);
      
    }else{
      setFilteredResults(Object.keys(list.Data));
    }
  }



  console.log("list")

  return (
    <>

    <div className="whole-page">

      <h1>Top 10 most traded cryptos</h1>
      <input
      type="text"
      placeholder="Search..."
      onChange={(inputString) => searchItems(inputString.target.value)}
      />

  
      {searchInput.length > 0
  ? filteredResults.map((coin) => 
      <CoinInfo
        image={coin.CoinInfo.ImageUrl}
        name={coin.CoinInfo.FullName}
        symbol={coin.CoinInfo.Name}

      />
      
    )


  : list && Object.entries(list.Data).map(([coin]) => 

 

      <CoinInfo
        image={list.Data[coin].CoinInfo.ImageUrl}
        name={list.Data[coin].CoinInfo.FullName}
        symbol={list.Data[coin].CoinInfo.Name}
   
      />
 
)}

    </div>
    
    </>
  )
}

export default App
