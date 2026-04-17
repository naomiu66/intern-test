import type { FC } from "react";
import type { CountryDetailsModalProps } from "../types/components/ICountryDetailsModalProps";
import styles from "./CountryDetailsModal.module.scss"
import { motion, AnimatePresence } from "framer-motion";

export const CountryDetailsModal: FC<CountryDetailsModalProps> = ({
  isOpen,
  onClose,
  country,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{duration: 0.2}}
          onClick={onClose}
        >
            <motion.div
             className={styles.modal}
             initial={{ scale: 0.95, opacity: 0, y: 10 }}
             animate={{ scale: 1, opacity: 1, y: 0 }}
             exit={{ scale: 0.95, opacity: 0, y: 10 }}
             transition={{ duration: 0.25, ease: "easeOut"}}
             onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.title}>{country.name}</h2>
                <img src={country.flag}></img>
                <h3>Capital: {country.capital}</h3>
                <h3>Region: {country.region}</h3>
                <h3>Population: {country.population}</h3>
            </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
