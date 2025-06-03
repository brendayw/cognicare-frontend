import styles from '../../../styles/dashboard/forms/components/FormButton.module.css';

export default function FormButton({ texto, tipo = "submit", onClick }) {
    return (
        <div className={`${styles.form_button}`}>
            <button type={tipo} className={`${styles.btn}`} onClick={onClick}>
                {texto}
            </button>
        </div>
    );
}