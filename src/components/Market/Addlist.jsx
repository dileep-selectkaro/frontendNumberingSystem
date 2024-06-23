import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DefaultLayout from '../../layout/DefaultLayout';


const Addlist = () => {


  const apiUrl = 'https://numbergame-ksye.onrender.com/admin/api/create ';
  const [market, setMarket] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(apiUrl, { market });
      if (response.status === 201) {
        setMarket('');
        toast.success('Market added successfully!', { theme: 'colored' });
        
      } else {
        toast.error('Failed to add market. Please try again.', { theme: 'colored' });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add market. Please try again.', { theme: 'colored' });
    }
 
  };

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit}>
        <div className='mb-4 rounded-sm border border-stroke bg-white px-5 py-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5'>
          <h1 className="text-xl text-black font-bold">Add Market</h1>
        </div>
        <div className='flex justify-between mb-4 rounded-sm border border-stroke bg-white px-5 py-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5'>
          <div>
            <input
              type="text"
              placeholder="Market"
              value={market}
              onChange={(e) => setMarket(e.target.value)}
              className="w-150 rounded-lg border-[1.5px] border-stroke bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required  />
          </div>
          <div>
      
            <button type="submit" className="flex font-medium w-30 mt-1 text-xs justify-center rounded-full bg-danger px-1 py-1 pr-2 text-white">
              Add
            </button>
          
          </div>
        </div>
      </form>
  
      <ToastContainer />
    </DefaultLayout>
  );
}

export default Addlist;
