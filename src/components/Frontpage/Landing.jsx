import React, { useState, useEffect } from "react";

import { Link, NavLink } from "react-router-dom";

import banner from "../../images/cover/banner.png";
import { FaLongArrowAltRight } from "react-icons/fa";
import CountUp from 'react-countup';
import Navbar from "./Navbar";

const Landing = () => {
 

  const [apiData, setApiData] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(null);
  const [nextDrawTime, setNextDrawTime] = useState(null);
  const [leftTime, setLeftTime] = useState(null);
  const [time, setTime] = useState(new Date());
  const fetchData = async (url, setDataCallback) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDataCallback(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

 

 

  useEffect(() => {
    fetchData("https://numbergame-ksye.onrender.com/user/api/fetchedOne", setApiData);
    fetchData("https://numbergame-ksye.onrender.com/user/api/fetchedfutureTime", setNextDrawTime);

    const interval = setInterval(() => {
      fetchData("https://numbergame-ksye.onrender.com/user/api/fetchedOne", setApiData);
      fetchData("https://numbergame-ksye.onrender.com/user/api/fetchedfutureTime", setNextDrawTime);
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
   
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(interval)
      const now = new Date();
      const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const timeOptions = { hour: '2-digit', minute: '2-digit' };
      const formattedDate = now.toLocaleDateString('en-US', dateOptions);
      const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
      setCurrentDateTime({ date: formattedDate, time: formattedTime });

      if (nextDrawTime && nextDrawTime.time) {
        
        const timeString = nextDrawTime.time; // Assuming "6:30 PM" (example)

        // Parse the time string
        const [hoursMinutes, ampm] = timeString.split(' ');
        const [hour, minutesext] = hoursMinutes.split(':');
        const minutes = time.getMinutes().toString().padStart(2, '0');

      
        const timeDiff = minutesext - minutes;
        
    
        if (timeDiff > 0) {
          const minutes = timeDiff;
          const second = timeDiff / 60;
          const seconds = second;
          setLeftTime({ minutes, seconds });

        } else {
          setLeftTime(null);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextDrawTime]);

  const formatRandomNumber = (number) => {
   
    return number.toString().padStart(2, '0');
  };

  return (
    <>
    <Navbar/>
      <div>
        <img src={banner} alt="banner" className="w-full max-h-59 object-cover" />
      </div>
      <div className="container mx-auto mt-4 mb-4 rounded-sm border border-stroke bg-biscuit px-5 py-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
        {/* Rest of your code */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl text-black font-bold">Today's Result</h1>
          </div>
          <div className="flex gap-6">
            <div>
              <h1 className="font-bold text-black">{currentDateTime && currentDateTime.date}</h1>
            </div>
            <div>
              <h1 className="font-bold text-black">{currentDateTime && currentDateTime.time}</h1>
            </div>
          </div>
        </div>
<div className="flex justify-center gap-20 font-bold text-lg">

  <div>
    <h1 className="text-black">Next Draw : {nextDrawTime && nextDrawTime.time}</h1>
  </div>

  <div>
    <h1 className="text-black">Left Time : {leftTime && `${leftTime.minutes} min `}</h1>
  </div>
</div>


        <div className="flex flex-wrap justify-between">
          {apiData &&
            apiData.map((item, index) => (
              <div
                key={index}
                className="mt-5 w-full max-w-sm bg-white border-2 border-cards rounded-lg shadow"
                style={{ flexBasis: "30%", maxWidth: "30%" }}
              >
                <div className="bg-cards">
                  <h1 className="text-white font-bold text-center p-5 text-2xl">
                    {item.marketName}
                  </h1>
                </div>
                <div className="p-4 text-center bg-cardresult">
                
                  <h1 className="text-3xl m-5 font-bold border-stroke dark:border-strokedark ">
                    {/* <CountUp delay={2} start={0}  end={formatRandomNumber(item.randomNumber)}> </CountUp> */}
                    
                    {item.randomNumber<=9 ? (  item.randomNumber
                    ) : (
                      <CountUp delay={2} start={0} end={parseInt(formatRandomNumber(item.randomNumber))} />
                    )}
                    </h1>
                 
                </div>
                <div className="bg-cards">
                  <h1 className="text-white font-bold text-center p-2 text-xl">
                    {item.time}
                  </h1>
                </div>
              </div>
            ))}
        </div>
        <div className="flex justify-center mt-9 mb-9">
          <Link to="/viewresult">
            <button
              type="submit"
              className="flex bg-cards font-medium w-30 mt-1 justify-center rounded-full  px-1 py-1 pr-2 text-white"
             
            >
              View Result<span className="mt-1"><FaLongArrowAltRight /></span>
            </button>
          </Link>
        </div>
      </div>
      </>
  );
};

export default Landing;