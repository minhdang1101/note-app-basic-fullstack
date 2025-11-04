import React, { useEffect } from 'react';
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from 'react-icons/md';

const Toast = ({ isShown, message, type, onClose }) => {

    useEffect(() => {
        if (isShown) {
            const timeoutId = setTimeout(() => {
                onClose();
            }, 3000);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [isShown, onClose]);

    return (
        <div 
            className={`
                absolute top-20 right-6 transition-all duration-300 z-50 
                ${isShown ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}
            `}
        >
            <div 
                className={`
                    min-w-64 bg-yellow-300 shadow-lg rounded-lg flex items-center
                `}
            >
                <div 
                    className={`w-2 h-full rounded-l-lg
                        ${type === 'delete' ? 'bg-red-500' : 'bg-green-500'}
                    `}
                />
                
                <div className='flex items-center gap-5 px-2 py-3'>
                    <div 
                        className={`w-10 h-10 flex items-center justify-center rounded-full 
                            ${type === 'delete' ? 'bg-red-100' : 'bg-green-100'}
                        `}
                    >
                        {type === 'delete'
                            ? <MdDeleteOutline className='text-xl text-red-600' /> 
                            : <LuCheck className='text-xl text-green-600' />
                        }
                    </div>
                    <p className='text-sm text-black font-medium'>{message}</p>
                </div>
            </div>
        </div>
    );
};

export default Toast;