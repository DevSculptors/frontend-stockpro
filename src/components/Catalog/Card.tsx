"use client";
import { MdOutlineLocalShipping, MdOutlineLocalOffer } from "react-icons/md";
import styles from './styles.module.scss';

interface CardProps {
    index: string
    name: string
    description: string
    units: string
    price: number
    category: string
    brand: string
    isActive: boolean
    handleClick: (id: string) => void;
}
export function Card({ name, description, units, price, category, brand, index, handleClick}:CardProps ) {
    return (
        <div className={styles.productCard} key={index} >
            <a onClick={() => handleClick(index)}>
            <h2 className={styles.nameCard}>{name}</h2>
            <p className={styles.descriptionCard}>{description}</p>
            <p className={styles.infoCard}>{units}</p>
            <p className={styles.infoCard}>{price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0,
                maximumFractionDigits: 0})}</p>
            <div className={styles.divider} />
            <div className={styles.categoryInfo}>
                <div className={styles.categoryIcon}>
                    <MdOutlineLocalShipping className={styles.icons}/>
                    {category}
                </div>
                <div className={styles.categoryIcon}>
                    <MdOutlineLocalOffer className={styles.icons}/>
                    {brand}
                </div>
            </div>
            </a>
        </div>
    );
};