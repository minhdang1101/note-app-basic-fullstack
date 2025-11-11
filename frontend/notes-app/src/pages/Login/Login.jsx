import React from 'react'
import { Link , useNavigate} from 'react-router-dom'
import loginImage from "../../assets/img/login-image.png";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { emailIsValid, passwordIsValid} from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [isShowPassword, setIsShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setIsShowPassword(!isShowPassword);
    }
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailIsValid(email) || !passwordIsValid(password)) {
            setError('Please enter a valid email and password.');
            return;
        }
        setIsLoading(true);
        try {
            const response = await axiosInstance.post('/login', {
                email,
                password
            });

            if(response.data && response.data.accessToken) {
                localStorage.setItem('token', response.data.accessToken);
                navigate('/');
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <div className='grid h-screen w-screen overflow-hidden bg-gray-100 md:grid-cols-3'>
            <div className= "hidden md:block col-span-2">
            <img
            src={loginImage}
            alt="Login illustration"
            className="object-cover w-full h-full"
        />
        </div>
        <div className="flex flex-col justify-center p-8 col-span-1">
            <div className='px-7 py-10'>
            <form onSubmit={handleSubmit} className='space-y-4'>
            <h2 className="text-3xl flex justify-center font-bold mb-6 ">Login</h2>
                <div className="space-y-4">
                    <label className="block mb-1 font-medium"></label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading}
                    />
                </div>
                <div className="relative">
                    <label className="block mb-1 font-medium"></label>
                    <input
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={isShowPassword ? 'text' : 'password'}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading}
                    />
                    
                    {isShowPassword  ? (<FaRegEye
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                />) : (<FaRegEyeSlash
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                />)}
                </div>
                
                {error && <div className="mb-4 text-red-500">{error}</div>}

                <button
                    type="submit"
                    className="w-full bg-yellow-400 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging In...' : 'Login'}
                </button>
            <p className="mt-4">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-500 hover:underline">
                    Sign Up
                </Link>
            </p>
            </form>
            </div>
        </div>
        </div>
    );
}
export default Login
