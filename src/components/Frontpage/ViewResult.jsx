import React, { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from "./Navbar";

const ViewResult = () => {
  const [apiData, setApiData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const [transformedData, setTransformedData] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = () => {
    if (!selectedDate) {
      setErrorMessage("Please select a date to see the result");
      return;
    }
    let datne = formatDate(selectedDate);
    fetch(`https://numbergame-ksye.onrender.com/user/api/searchAllData?createdAt=${datne}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setApiData(data.data);
        // Update transformedData here
        const transformed = {};
        data.data.forEach(item => {
          if (!transformed[item.time]) {
            transformed[item.time] = {};
          }
          transformed[item.time][item.marketName] = item.randomNumber;
        });
        setTransformedData(transformed);
        setShowTable(true); // Show the table after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleShowResult = () => {
    fetchData();
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }
  return (
    <>
   <Navbar/>
      <div className="container mx-auto mt-4 mb-4 rounded-sm border border-stroke bg-biscuit px-5 py-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5"  > 
      <h1 className="text-3xl mb-4 mt-4 text-black font-bold">Result</h1>
      {errorMessage && (
        <div className="text-red-600 m-5 text-xl">{errorMessage}</div>
      )}
      <div className="flex gap-5">
      <div className="  ">
      <DatePicker 
    placeholderText='mm/dd/yy'
    selected={selectedDate}
    onChange={(date) => {
      setSelectedDate(date);
      setErrorMessage(""); // Clear error message when a date is selected
    }}
                className="custom-input-date custom-input-date-1 w-150 rounded border-[1.5px] border-stroke bg-white py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input " required
              />
                </div>
                <div className='mt-1'>
            <button type="button" onClick={handleShowResult} className="flex font-medium w-30 mt-1 justify-center rounded-full bg-cards px-1 py-1 pr-2 text-white">show result</button>
          </div>
          
            </div>
          
            {showTable && selectedDate && (
        <div>
          <h1 className='text-sm text-black font-bold m-4'>Showing the result of Date : {selectedDate && selectedDate.toLocaleDateString()} </h1>
          <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
            <table className="text-sm w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="bg-gray-2">
                  <th scope="col" className="px-6 py-3">Time</th>
                  {Object.keys(transformedData && transformedData[Object.keys(transformedData)[0]] || {}).map((marketName, index) => (
                    <th key={index} scope="col" className="px-6 py-3">{marketName}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transformedData && Object.keys(transformedData).map((time, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{time}</td>
                    {Object.keys(transformedData[time]).map((marketName, index) => (
                      <td key={index} className="px-6 py-4">{transformedData[time][marketName]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      </div>
    </>
  );
};

export default ViewResult;
