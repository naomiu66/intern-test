import { useEffect, useState } from "react";
import type { Country } from "./types/Country";
import { countryApi } from "./api/countryApi";
import styles from "./App.module.scss"
import { CountryCard } from "./components/CountryCard";
import { CountryDetailsModal } from "./components/CountryDetailsModal";

function App() {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState<string>("");
  const [region, setRegion] = useState<string>("");

  const filteredCountries = countries
    .filter((c) => c.region.includes(region))
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    let ignore = false;

    const fetchCountries = async () => {
      try {
        const data = await countryApi.getAll();
        if (!ignore) setCountries(data);
      } catch (err) {
        console.error("Error fetching countries", err);
      }
    };

    fetchCountries();

    return () => {
      ignore = true;
    };
  }, []);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
  };

  const onCountryClick = (country: Country) => {
    setSelectedCountry(country);
    setModalVisible(true);
  }

  const onModalClose = () => {
    setModalVisible(false);
    setSelectedCountry(null);
  }

  return (
    <>
      <div className={styles.headbar}>
        <input className={styles.search} placeholder="Search by name" onChange={onSearchChange}></input>
        <select className={styles.select} onChange={onRegionChange}>
          <option value="">All</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <hr></hr>
      <div className={styles.countrylist}>
        {filteredCountries.map((country) => (
          <CountryCard name={country.name} flag={country.flag} onClick={() => onCountryClick(country)}/>
        ))}
      </div>

      <CountryDetailsModal isOpen={isModalVisible} onClose={onModalClose} country={selectedCountry!}/>
    </>
  );
}

export default App;
