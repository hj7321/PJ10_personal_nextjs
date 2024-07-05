import { NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";
import { Pokemon, PokemonSpecies, Names } from "@/types/pokemon.type";

const TOTAL_POKEMON: number = 151;

export const GET = async (request: Request) => {
  try {
    const allPokemonPromises: Promise<
      [AxiosResponse<Pokemon, any>, AxiosResponse<PokemonSpecies, any>]
    >[] = Array.from({ length: TOTAL_POKEMON }, (_, index) => {
      const id: number = index + 1;
      return Promise.all([
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
      ]);
    });

    const allPokemonResponses: [
      AxiosResponse<Pokemon, any>,
      AxiosResponse<PokemonSpecies, any>
    ][] = await Promise.all(allPokemonPromises);

    const allPokemonData: Pokemon[] = allPokemonResponses.map(
      ([response, speciesResponse], index) => {
        const koreanName: Names | undefined = speciesResponse.data.names.find(
          (name: Names) => name.language.name === "ko"
        );
        return { ...response.data, korean_name: koreanName?.name || null };
      }
    );
    return NextResponse.json(allPokemonData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};
