import { NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";
import {
  Abilities,
  Moves,
  Pokemon,
  PokemonSpecies,
  Names,
  Types,
  MovesKorean,
  AbilitiesKorean,
  TypesKorean,
} from "@/types/pokemon.type";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const response: AxiosResponse<Pokemon, any> = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    const speciesResponse: AxiosResponse<PokemonSpecies, any> = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );

    const koreanName: Names | undefined = speciesResponse.data.names?.find(
      (name: Names) => name.language.name === "ko"
    );

    const typesWithKoreanNames: TypesKorean[] = await Promise.all(
      response.data.types.map(async (type: any) => {
        const typeResponse: AxiosResponse<Types, any> = await axios.get(
          type.type.url
        );
        const koreanTypeName: string =
          typeResponse.data.names?.find(
            (name: Names) => name.language.name === "ko"
          )?.name || type.type.name;
        return { ...type, type: { ...type.type, korean_name: koreanTypeName } };
      })
    );

    const abilitiesWithKoreanNames: AbilitiesKorean[] = await Promise.all(
      response.data.abilities.map(async (ability: any) => {
        const abilityResponse: AxiosResponse<Abilities, any> = await axios.get(
          ability.ability.url
        );
        const koreanAbilityName: string =
          abilityResponse.data.names?.find(
            (name: Names) => name.language.name === "ko"
          )?.name || ability.ability.name;
        return {
          ...ability,
          ability: { ...ability.ability, korean_name: koreanAbilityName },
        };
      })
    );

    const movesWithKoreanNames: MovesKorean[] = await Promise.all(
      response.data.moves.map(async (move: any) => {
        const moveResponse: AxiosResponse<Moves, any> = await axios.get(
          move.move.url
        );
        const koreanMoveName: string =
          moveResponse.data.names?.find(
            (name: Names) => name.language.name === "ko"
          )?.name || move.move.name;
        return { ...move, move: { ...move.move, korean_name: koreanMoveName } };
      })
    );

    const pokemonData: Pokemon = {
      ...response.data,
      korean_name: koreanName?.name || response.data.name,
      types: typesWithKoreanNames,
      abilities: abilitiesWithKoreanNames,
      moves: movesWithKoreanNames,
    };

    return NextResponse.json(pokemonData);
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};
