import type { Country } from "../Country";

export interface CountryDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    country: Country;
}