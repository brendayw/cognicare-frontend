import React from 'react';
import styles from '../../../../styles/dashboard/forms/components/FormSelect.module.css';

export default function FormSelect( {
    label,
    id,
    value,
    onChange,
    options = [],
    required = false,
}) {
    return (
        <div className={`${styles.campo}`}>
            <label htmlFor={id} className={`${styles.form_label}`}>
                {label}
            </label>
            <select
                id={id}
                value={value}
                onChange={onChange}
                required={required}
                className={`${styles.form_select}`}
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