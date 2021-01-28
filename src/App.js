import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineSearch, AiOutlineSend } from 'react-icons/ai';
import municipios from './json/municipios.json'

//Components
import Search from './components/search'
import style from './style.css'

function App() {

  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);
  const [municipio, setMunicipio] = useState('')
  const [inputValue, setInputValue] = useState('');

  function onChange(t){
    const { name, value} = t.target;
    setInputValue(value);
  }

  const takeInputValue = async () =>{
    
    const res = await municipios.filter( function(res){ return res.nome === inputValue } );
    // console.log(res[0].nome)
    getWeather(res[0].latitude, res[0].longitude)

  }

  let getWeather = async (lat, long) => {
    let res = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    console.log(res.data)
    setWeather(res.data);
    setMunicipio(inputValue)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      // console.log(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, []);

  if (location === false) {
    return (
      <div className="App">
        <h1>Você precisa habilitar a localização no browser</h1>
      </div>
    )
  } else {
    return (
      <div className="App">
        
        <div className="container">
          <h1><strong>Previsão do Tempo</strong></h1>
          <h1 className="previsao">{municipio} - {`${weather.main.temp}º ${weather.weather[0].description}`}
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt=""/>
          </h1>

          <div className="content-input">
            <input type="text" name="text" id="text" onChange={onChange} placeholder="Pesquise por cidade" />
            {/* <h3 className="search-icon" > <AiOutlineSearch size={25} /> </h3> */}
            <h3 className="send-icon" > <AiOutlineSend size={25} onClick={() => takeInputValue()} /> </h3>
          </div>

        </div>

      </div>
    );
  }
}

export default App;
