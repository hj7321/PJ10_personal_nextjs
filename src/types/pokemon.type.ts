export type Pokemon = {
  id: number;
  name: string;
  korean_name: string | null;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: { home: { front_default: string } };
  };
  types: TypesKorean[];
  abilities: AbilitiesKorean[];
  moves: MovesKorean[];
};

export type Names = {
  language: { name: string; url: string };
  name: string;
};

export type NamesKorean = {
  name: string;
  korean_name: string;
};

export type PokemonSpecies = {
  names: Names[];
};

export type Types = {
  names: Names[];
};

export type Abilities = {
  names: Names[];
};

export type Moves = {
  names: Names[];
};

export type TypesKorean = {
  type: NamesKorean;
};

export type AbilitiesKorean = {
  ability: NamesKorean;
};

export type MovesKorean = {
  move: NamesKorean;
};
