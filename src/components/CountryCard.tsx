import type { CountryCardProps } from "../types/components/CountryCardProps";

export const CountryCard = ({ name, flag }: CountryCardProps) => {
  return (
    <>
      <div>
        <h3>{name}</h3>
        <img src={flag} />
      </div>
    </>
  );
};
