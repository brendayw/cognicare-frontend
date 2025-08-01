import styles from '../../styles/dashboard/forms/components/FormButton.module.css';

export default function FormButton({ texto, tipo = "submit", onClick, noTop= false }) {
    return (
        <div className={`${styles.form_button}`}>
            <button type={tipo} className={`${styles.btn} ${noTop ? styles.noTop : 'top-4'}`} onClick={onClick}>
                {texto}
            </button>
        </div>
    );
}