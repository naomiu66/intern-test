export interface ICountry {
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  region: string;
  capital: string[];
  population: number;
}
