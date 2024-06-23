import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const apiUrl = 'https://numbergame-ksye.onrender.com/admin/api/login'; // Directly use the full API URL here
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestBody = {
      email,
      password
    };

    try {
      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = response.data;

      localStorage.setItem("email", email); // Save email to localStorage

      navigate('/ecommerce', { replace: true });

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage, { theme: 'colored' });
    }
  };

  return (
    <>
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:w-1/2 xl:border-l-2">
        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="relative">
                <input
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full text-sm rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="relative">
                <input
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Enter Your Password"
                  className="w-full text-sm rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-5">
              <input
                type="submit"
                className="w-full cursor-pointer rounded-lg border p-4 text-white transition hover:bg-opacity-90"
                style={{background:"rgb(2 89 98)"}}
                value="Sign-in"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default SignIn;
