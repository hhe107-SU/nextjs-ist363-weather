import styles from './Button.module.scss';


const Button = ({label, clickHandler})=>{
    return (
    <button className={styles.btn} onClick={clickHandler}>{label}</button>); //deconstrct label






};
export default Button;