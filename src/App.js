
import './App.css';
import './style.css';
import React, { useEffect, useState } from 'react'




function App() {
const[search,setSearch]=useState("haridwar");
const[data,setData]=useState({});
const[weatherstate,setWeatheState]=useState("");
const[cl,setCl]=useState("");

const GetWeather=async()=>{
  const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=c80f34d594fc25dbeb10114ea26dec63`);
  setSearch("");
  let fetchdata=await response.json();
  console.log(fetchdata);
const{temp,humidity,pressure}=fetchdata.main;
const{speed}=fetchdata.wind;
const{main:WeatherCondition}=fetchdata.weather[0];
const{name:cityname}=fetchdata;
const{country,sunset}=fetchdata.sys;

const obj={
  temp,
  humidity,
  pressure,
  speed,
  WeatherCondition,
  cityname,
  country,
  sunset
}

setData(obj);


}

useEffect(()=>{
  if (data.WeatherCondition) {
    switch (data.WeatherCondition) {
      case "Clouds":
        setWeatheState("wi-day-cloudy");
        setCl("Clouds");
        break;
      case "Haze":
        setWeatheState("wi-fog");
        setCl("Haze");
        break;
      case "Clear":
        setWeatheState("wi-day-sunny");
        setCl("Clear");
        break;
      case "Mist":
        setWeatheState("wi-dust");
        setCl("Mist");
        break;

      default:
        setWeatheState("wi-day-sunny");
        setCl("Clear");
        break;
    }
  }

},[data.WeatherCondition])





useEffect(()=>{
  GetWeather();
},[]);

  let sec = data.sunset;
  let date = new Date(sec * 1000);
  let timeStr = `${date.getHours()}:${date.getMinutes()}`;

  return( 
      <>
        {/* <h1>Weather App</h1> */}
        <div className='first'>
        <input id='inp' type="text" placeholder='Enter City Name...'   onChange={(e)=>setSearch(e.target.value)} ></input>
        <button id='btn' type='button'  onClick={GetWeather}>Search</button>
        </div>
        <div className='second'>
              <div id='logo'>
              <i className={`wi ${weatherstate} ${cl}`}></i>
              
              </div>
              <div className='temp'>
                <div className='temp1'>
                  <div >
                    <h1 id='displaytemp'>{data.temp}&deg;C</h1>
                  </div>
                  <div id='city'>
                    <h4 id='displycity'>{data.WeatherCondition}</h4>
                    <h5 id='displycity'>{data.cityname},{data.country}</h5>
                  </div>
                </div>
                <div className='temp2' >
                  <h3 id='displaytime'>
                    {new Date().toLocaleString()}

                  </h3>
                </div>
              </div>

              <div className='Add'>


              <div className='others'>
             
              <div className='fir'>
              <div className="two-sided-section">
              <h2 id='sunset'>
                <i className={"wi wi-sunset"}></i>
              </h2>
            </div>
            <div id='info'>
              <p className="extra-info-leftside">
                {timeStr} <br/>
                Sunset
              </p>
              </div>
            </div>


            <div className='fir'>
              <div className="two-sided-section">
              <h2 id='wind'>
              <i className={"wi wi-strong-wind"}></i>
              </h2>
            </div>
            <div id='info' >
              <p className="extra-info-leftside">
                {data.speed} <br/>
               Wind
              </p>
              </div>
            </div>
            </div>

             
            <div className='others'>
            <div className='fir'>
              <div className="two-sided-section">
              <h2 id='rain'>
              <i className={"wi wi-rain"}></i>
              </h2>
            </div>
            <div id='info'> 
              <p className="extra-info-leftside">
                {data.pressure} <br/>
              Rain
              </p>
              </div>
            </div>


            <div className='fir'>
              <div className="two-sided-section">
              <h2 id='humidity'>
              <i className={"wi wi-humidity"}></i>
              </h2>
            </div>
            <div id='info'>
              <p className="extra-info-leftside">
                {data.humidity} <br/>
               Humidity
              </p>
              </div>
            </div> 
          </div>
              </div>

        </div>
      </>
  );
}

export default App;
