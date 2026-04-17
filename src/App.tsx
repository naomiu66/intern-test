import { useEffect, useState } from "react";
import "./App.css";
import type { Country } from "./types/Country";
import { countryApi } from "./api/countryApi";
import { CountryCard } from "./components/CountryCard";

function App() {
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

  return (
    <>
      <div className="head-bar">
        <input placeholder="Search by name" onChange={onSearchChange}></input>
        <select onChange={onRegionChange}>
          <option value="">All</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div className="country-list">
        {filteredCountries.map((country) => (
          <CountryCard name={country.name} flag={country.flag} />
        ))}
      </div>
    </>
  );
}

export default App;
