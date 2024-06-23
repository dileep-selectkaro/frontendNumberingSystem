import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Todayresult = () => {
  const [markets, setMarkets] = useState([]);
  const [resultData, setResultData] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editedMarket, setEditedMarket] = useState({ market: '', result: '', _id: '' });
  const [currentDate, setCurrentDate] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const editMarket = (randomNumber) => {
    console.log(randomNumber);
    setEditedMarket(randomNumber);
    setEditModal(true);
  };
  const closeEditModal = () => {
    setEditModal(false);
  };

  const updateChange = async (marketvl) => {
    try {
      const response = await axios.get('https://numbergame-ksye.onrender.com/admin/api/search?marketName=' + marketvl);
      setResultData(response.data.data);
    } catch (error) {
      console.error('Error fetching markets:', error);
      // Optionally, you can handle errors here
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(` https://numbergame-ksye.onrender.com/admin/api/updateMarketDetails?id=${editedMarket._id}&randomNumber=${editedMarket.randomNumber}`);
      console.log(response.data); 
      setEditModal(false);
      toast.success('Result Updated successfully!', { theme: 'colored' });
      // window.location.reload();
      updateChange(editedMarket.marketName);
    } catch (error) {
      console.error('Error updating market:', error);
      toast.error('Failed to update. Enter only 2 digits.', { theme: 'colored' });
    }
  };
  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const response = await axios.get('https://numbergame-ksye.onrender.com/admin/api/getMarketList');
        setMarkets(response.data.marketList);
      } catch (error) {
        console.error('Error fetching markets:', error);
        // Optionally, you can handle errors here
      }
    };

    fetchMarkets();

    const currentDate = new Date().toLocaleDateString();
    setCurrentDate(currentDate);
  }, []);

  const fetchDataAgain = async (marketvl) => {
    try {
      const response = await axios.get('https://numbergame-ksye.onrender.com/admin/api/search?marketName=' + marketvl);
      setResultData(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  return (
    <>
      <DefaultLayout>
        <div className="flex justify-between mb-4 rounded-sm border border-stroke bg-white px-5 py-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 ">
          <div className=''>
            <h1 className="text-xl text-black font-bold">Today's Result</h1>
          </div>
          <div>
            <h1 className='font-bold py-1 px-6 rounded-sm border'>{currentDate}</h1>
          </div>
        </div>
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Select Market
          </label>
          <div className="relative z-20 bg-white dark:bg-form-input">
            <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input" onChange={(e) => updateChange(e.target.value)}>
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
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[100px] font-bold py-4 px-4 text-black dark:text-white xl:pl-11">
                    Draw Time
                  </th>
                  <th className="min-w-[100px] font-bold py-4 px-4 text-black dark:text-white ">
                    Result
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {resultData.map(item => (
                  <tr key={item._id}>
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
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button className="hover:text-primary border px-2 rounded-xl text-sm" onClick={() => editMarket(item)}>
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {editModal && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none lg:ml-36">
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <div>
                  <h3 className="text-2xl text-black font-bold">Edit Market List</h3>
                </div>
                <div>
                  <button onClick={closeEditModal}><IoMdClose /></button>
                </div>
              </div>
              <div className="relative p-6 flex-auto">
               
                <div className="flex flex-col justify-between">
                  <div>
                    <form>
                      <div className="p-2 flex justify-between flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                          <input
                            type="text"
                            placeholder=""
                            value={editedMarket.randomNumber}
                            onChange={e => setEditedMarket({ ...editedMarket, randomNumber: e.target.value })}
                            className="w-full text-sm rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                        </div>
                        <div>
                          <button type="button" className="flex mt-2 text-xs w-30 justify-center rounded-full bg-primary p-2 font-medium text-white" onClick={handleUpdate}>
                            Update
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
        <ToastContainer />
      </DefaultLayout>
    </>
  );
}

export default Todayresult;
