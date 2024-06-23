import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Marketlist = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [editedMarket, setEditedMarket] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletedMarket, setDeletedMarket] = useState(false);
  
  const editMarket = (market) => {
    setEditedMarket(market);
    setEditModal(true);
  };

  const deletesMarket = (market) => {
    setDeletedMarket(market);
    setDeleteModal(true);
  };
  

  const closeEditModal = () => {
    setEditModal(false);
  };

  const fetchDataAgain = async () => {
    try {
      const response = await axios.get('https://numbergame-ksye.onrender.com/admin/api/getMarketList ');
      setData(response.data.marketList);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`https://numbergame-ksye.onrender.com/admin/api/updateMarket?id=${editedMarket._id}&market=${editedMarket.market}`);
      console.log(response.data); 
      setEditModal(false);
     
      toast.success('Market Updated successfully!', { theme: 'colored' });
      //window.location.reload();
      fetchDataAgain();
    } catch (error) {
      console.error('Error updating market:', error);
      toast.error('Failed to update. Please try again.', { theme: 'colored' });
    }
  };

  const deleteMarketById = async () => {
    console.log("Deleting market with ID:", deletedMarket._id);
    try {
      const response = await axios.delete('https://numbergame-ksye.onrender.com/admin/api/deleteMarket?id='+deletedMarket._id);
      console.log(response.data);
      //setData(data.filter(item => item._id !== id));
      setDeletedMarket(false);
      setDeleteModal(false);
     
      toast.success('Market deleted successfully!', { theme: 'colored' });
      fetchDataAgain();
    } catch (error) {
      console.error('Error deleting market:', error);
      toast.error('Failed to delete market. Please try again.', { theme: 'colored' });
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://numbergame-ksye.onrender.com/admin/api/getMarketList ');
        setData(response.data.marketList);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Clean-up function to cancel pending requests or perform other clean-up tasks
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <DefaultLayout>
      <div>
        <div className="flex justify-between mb-4 rounded-sm border border-stroke bg-white px-5 py-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 ">
          <div>
          <h1 className="text-xl text-black font-bold">Market List</h1>
          </div>
          <div>
          <Link to="/addlist">
          <button type="submit" className="flex font-medium w-30 mt-1 text-xs justify-center rounded-full bg-danger px-1 py-1 pr-2 text-white">
              Add
            </button>
            </Link>
            </div>
            </div>
        </div>
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[100px] font-bold py-4 px-4 text-black dark:text-white xl:pl-11">
                    Market Name
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item._id}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {item.market}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button className="hover:text-primary border px-2 rounded-xl text-sm" onClick={() => editMarket(item)}>
                          Edit
                        </button>
                        <button className="hover:text-primary border px-2 rounded-xl text-sm" onClick={() => deletesMarket(item)}>
                          Delete
                        </button>
                        <Link to="/todayresult">
                        <button className="hover:text-primary border px-2 rounded-xl text-sm">
                          Manage
                        </button>
                        </Link>
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
                            placeholder="Market Name"
                            value={editedMarket.market}
                            onChange={e => setEditedMarket({ ...editedMarket, market: e.target.value })}
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
    {deleteModal && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none lg:ml-36">
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-2xl text-black font-semibold">Delete Market</h3>
                <button onClick={() => setDeleteModal(false)}>
                  <IoMdClose />
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  Are you sure you want to delete this market?
                </p>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 text-xs background-transparent font-bold uppercase px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setDeleteModal(false)}
                >
                  No
                </button>
                <input type='hidden' value={deletedMarket._id} name='marketId' />
                <button
                  className="text-white text-xs active:bg-blue-600 font-medium px-6 py-2 rounded-full bg-danger hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button" value={deletedMarket._id}
                  onClick={e => deleteMarketById({ ...deletedMarket, id: e.target.value })}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
           
        <ToastContainer />
    </DefaultLayout>
    
  );
};

export default Marketlist;
