export type Pokemon = {
  id: number;
  names: TypeKoreanName[];
  name: string;
  korean_name: string | null;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: { home: { front_default: string } };
  };
  types: { type: { name: string; korean_name: string } }[];
  abilities: { ability: { name: string; korean_name: string } }[];
  moves: { move: { name: string; korean_name: string } }[];
};

export type TypeKoreanName = {
  language: { name: string; url: string };
  name: string;
};
