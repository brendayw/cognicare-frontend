import { useState } from 'react';

const useForm = ({ initialValues, onSubmit, validate }) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldName = name || e.target.id;
        
        // Manejo especial para checkboxes
        if (type === 'checkbox') {
            setValues(prev => {
                const currentArray = prev[fieldName] || [];
                const updatedArray = checked
                    ? [...currentArray, value]
                    : currentArray.filter(item => item !== value);
                
                return {
                    ...prev,
                    [fieldName]: updatedArray
                };
            });
        } else {
            setValues({
                ...values,
                [fieldName]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            onSubmit(values);
        }
    };

    const resetForm = () => setValues(initialValues);

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
        resetForm,
        setValues 
    };
};

export default useForm;