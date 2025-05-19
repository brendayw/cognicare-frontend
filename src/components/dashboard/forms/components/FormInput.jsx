import React from 'react';
import styles from '../../../../styles/dashboard/forms/components/FormInput.module.css';

export default function FormInput( { label,
  value,
  onChange,
  id,
  placeholder,
  required = false,
  type = "text", 
}) {
    return (
        <div className={`${styles.campo}`}>
            <label htmlFor={id} className={`${styles.form_label}`}>
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`${styles.form_input}`}
            />
        </div>
    );
}