import React from 'react'
import { Link } from 'react-router-dom'
import loginImage from "../../assets/img/login-image.png";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { emailIsValid, passwordIsValid, confirmPasswordIsValid} from '../../utils/helper';

const SignUp = () => {
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [isShowPassword, setIsShowPassword] = React.useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setIsShowPassword(!isShowPassword);
    }
    
    const toggleConfirmPasswordVisibility = () => {
        setIsShowConfirmPassword(!isShowConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!emailIsValid(email)) {
            setError('Please enter a valid email.');
            return;
        }
        if (!name.trim()) {
            setError('Please enter your name.');
            return;
        }
        if (!passwordIsValid(password)) {
            setError('Password is not strong enough.');
            return;
        }
        if (confirmPasswordIsValid(password, confirmPassword) === false) {
            setError('Passwords do not match.');
            return;
        }
    };
    return (
        <div className='grid h-screen w-screen overflow-hidden bg-gray-100 md:grid-cols-3'>
            <div className= "hidden md:block col-span-2">
            <img
            src={loginImage}
            alt="Login illustration"
            className="object-cover w-full"
        /></div>
        <div className="flex flex-col justify-center p-8 col-span-1">
            <div className='w-full px-7 py-10'>
            <form onSubmit={handleSubmit}  className="space-y-4">
            <h2 className="text-3xl flex justify-center font-bold mb-6 ">Sign Up</h2>
                <div>
                    <label className="block mb-1 font-medium"></label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium"></label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name'
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    />
                    
                    {isShowPassword  ? (<FaRegEye
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                />) : (<FaRegEyeSlash
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                />)}
                </div>
                
                <div className="relative">
                    <label className="block mb-1 font-medium"></label>
                    <input
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type={isShowConfirmPassword ? 'text' : 'password'}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    
                    {isShowPassword  ? (<FaRegEye
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={toggleConfirmPasswordVisibility}
                />) : (<FaRegEyeSlash
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={toggleConfirmPasswordVisibility}
                />)}
                </div>
                
                {error && <div className="mb-4 text-red-500">{error}</div>}

                <button
                    type="submit"
                    className="w-full bg-yellow-400 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Sign Up
                </button>
            <p className="mt-4">
                Already have account?{' '}
                <Link to="/login" className="text-blue-500 hover:underline">
                    Login
                </Link>
            </p>
            </form>
            </div>
        </div>
        </div>
    );
}

export default SignUp
