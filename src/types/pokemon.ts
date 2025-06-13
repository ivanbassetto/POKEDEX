export type Pokemon = {
  number: string;
  name: string;
  image: string;
  types: string[];
  weight: number;
  height: number;
  moves: string[];
  abilities: string[];
  description: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
};
