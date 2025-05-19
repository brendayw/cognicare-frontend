import React from 'react';

export default function FormButton({ texto, tipo = "submit", onClick }) {
    return (
        <div className='flex justify-end mr-2'>
            <button type={tipo} className='w-[100px] bg-[#4CAF50] text-white text-montserrat rounded-md cursor-pointer p-2' onClick={onClick}>
                {texto}
            </button>
        </div>
    );
}