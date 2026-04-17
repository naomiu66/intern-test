import type { ICountryDetails } from "../types/api/ICountryDetailsResponse";
import type { ICountry } from "../types/api/ICountryResponse";
import type { Country } from "../types/Country";
import type { CountryDetails } from "../types/CountryDetails";
import { API_URL } from "./constants";

function mapICountryToCountry(data: ICountry): Country {
  return {
    name: data.name.common,
    flag: data.flags.png,
    region: data.region,
    capital: data.capital[0],
    population: data.population,
  };
}

function mapICountryDetailsToDetails(data: ICountryDetails): CountryDetails {
  return {
    flag: data.flags.png,
    name: data.name.common,
    capital: data.capital[0],
    region: data.continents[0],
    population: data.population,
  };
}

export const countryApi = {
  async getAll(): Promise<Country[]> {
    console.log(`[API] Get all countries`);
    const response = await fetch(
      `${API_URL}/all?fields=name,flags,region,population,capital`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    );

    const data: ICountry[] = await response.json();
    return data.map((res) => mapICountryToCountry(res));
  },

  async getByName(name: string): Promise<CountryDetails> {
    console.log(`[API DEBUG] GET country by name`);
    const response = await fetch(`${API_URL}/name/${name}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();

    return mapICountryDetailsToDetails(data);
  },
};
