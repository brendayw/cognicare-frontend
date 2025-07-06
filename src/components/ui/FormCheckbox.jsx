import styles from '../../styles/dashboard/forms/components/FormCheckbox.module.css';

export default function FormCheckbox( {
    label,
    id,
    value = [],
    onChange,
    options = [],
    required = false,
}) {
    const handleChange = (e) => {
        const { value: optionValue, checked } = e.target;
        let newValue = [...value];

        if (checked) {
            newValue.push(optionValue);
        } else {
            newValue = newValue.filter(item => item !== optionValue);
        }

        onChange({
            target: {
                name: id,
                value: newValue
            }
        });
    };

    return (
        <div className={`${styles.campo}`}>
            <label htmlFor={id} className={`${styles.form_label}`}>
                {label}
            </label>
            <div className={`${styles.dias_container}`}>
                <div className={`${styles.dias_check}`}>
                    {options.map((option) => (
                        <div className={`${styles.dia_opcion}`} key={option.value}>
                            <div className={`${styles.dia_semana}`}>
                                <label htmlFor={`${id}-${option.value}`}>
                                    {option.label}
                                </label>
                            </div>
                            <div className={`${styles.seleccion}`}>
                                <input
                                    type="checkbox"
                                    id={`${id}-${option.value}`}
                                    name={id}
                                    value={option.value}
                                    checked={value.includes(option.value)}
                                    onChange={handleChange}
                                    required={required && value.length === 0}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}