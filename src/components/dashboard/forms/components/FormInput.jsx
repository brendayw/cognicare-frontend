import React from 'react';

export default function FormInput( { label,
  value,
  onChange,
  id,
  placeholder,
  required = false,
  type = "text", 
}) {
    return (
        <div className=''>
            <label htmlFor={id} className='text-sm text-[#94a3b8] mb-[5px]'>
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className='w-full p-1.5 border border-[#94A3B8] rounded-lg text-[#94A3B8] text-sm font-sans focus:outline-none focus:border-[#00a396] focus:ring-1 focus:ring-[#94A3B8] transition-all'
            />
        </div>
    );
}