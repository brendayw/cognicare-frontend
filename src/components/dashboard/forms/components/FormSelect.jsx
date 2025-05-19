import React from 'react';

export default function FormSelect( {
    label,
    id,
    value,
    onChange,
    options = [],
    required = false,
}) {
    return (
        <div className=''>
            <label htmlFor={id} className='text-sm text-[#94a3b8] mb-[5px] p-2'>
                {label}
            </label>
            <select
                id={id}
                value={value}
                onChange={onChange}
                required={required}
                className='w-full p-1.5 border border-[#94A3B8] rounded-lg text-[#94A3B8] text-sm font-sans focus:outline-none focus:border-[#00a396] focus:ring-1 focus:ring-[#94A3B8] transition-all'
            >
                {options.map((opcion) => (
                    <option key={opcion.value} value={opcion.value}>
                        {opcion.label}
                    </option>
                ))}
            </select>
        </div>
    )
}