import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import { IoMdClose } from "react-icons/io";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Resulthistory = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMarket, setSelectedMarket] = useState('');
  const [markets, setMarkets] = useState([]);
  const [resultData, setResultData] = useState([]);

  const updateChange = async () => {
    
    try {
      let frdate=formatDate(selectedDate);
      const response = await axios.get(`https://numbergame-ksye.onrender.com/admin/api/search?marketName=${selectedMarket}&createdAt=${frdate}`);
      setResultData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const response = await axios.get('https://numbergame-ksye.onrender.com/admin/api/getMarketList');
        setMarkets(response.data.marketList);
      } catch (error) {
        console.error('Error fetching markets:', error);
      }
    };

    fetchMarkets();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }

  return (
    <>
      <DefaultLayout>
        <div className="flex justify-between mb-4 rounded-sm border border-stroke bg-white px-5 py-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 ">
          <div className=''>
            <h1 className="text-xl text-black font-bold">Result History</h1>
          </div>
        </div>
        <div className='flex gap-4'>
          <div className='w-full'>
            <label className="mb-3 block text-black dark:text-white">
              Select Market
            </label>
            <div className="w-full relative z-20 bg-white dark:bg-form-input">
              <select
                value={selectedMarket}
                onChange={(e) => setSelectedMarket(e.target.value)}
                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
              >
                <option value="">Select</option>
                {markets.map(market => (
                  <option key={market._id} value={market.market}>{market.market}</option>
                ))}
              </select>
              <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                      fill="#637381"
                    ></path>
                  </g>
                </svg>
              </span>
            </div>
          </div>
          <div className='w-full'>
            <label className="mb-3 block text-black dark:text-white">
              Date 
            </label>
            <div className="relative w-full ">
              <DatePicker 
                placeholderText='mm/dd/yy'
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="custom-input-date custom-input-date-1 w-100 rounded border-[1.5px] border-stroke bg-white py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input " required
              />
            </div>
          </div>
          <div className='mt-9'>
            <button
              type="button"
              className="flex mt-2 text-xs w-30 justify-center rounded-full bg-primary p-2 font-medium text-white"
              onClick={updateChange}
            >
              Update
            </button>
          </div>
        </div>
        <div className="mt-4 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[100px] font-bold py-4 px-4  text-black dark:text-white xl:pl-11">
                    Draw Time
                  </th>
                  <th className="min-w-[100px] font-bold py-4 px-4  text-black dark:text-white ">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody>
                {resultData.map(item => (
                  <tr key={item.id}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {item.time}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <p>{item.randomNumber}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Resulthistory;
