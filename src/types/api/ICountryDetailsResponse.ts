export interface ICountryDetails {
    capital: string[],
    population: number,
    flags: {
        png: string,
        svg: string,
        alt: string,
    },
    name: {
        common: string,
        official: string,
    },
    continents: string[],
}