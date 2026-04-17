import type { CountryCardProps } from "../types/components/ICountryCardProps";
import styles from "./CountryCard.module.scss";

export const CountryCard = ({ name, flag, onClick }: CountryCardProps) => {
  return (
    <>
      <div className={styles.container} onClick={onClick}>
        <img src={flag} className={styles.img} />
        <h3 className={styles.name}>{name}</h3>
      </div>
    </>
  );
};
