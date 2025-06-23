import React from "react";

export default function TabTitle( { titulo = '' }) {
    return (
        <div className='w-full'>
            <h4 className='text-[#424884] font-medium font-montserrat text-xs sm:text-sm'>{titulo}</h4>
        </div>
    );
}