"use client";

import { Pokemon } from "@/types/pokemon.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../../app/styles/loading.css";

const PokemonListPage: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/pokemons");
        if (!response.ok) throw new Error("데이터 불러오기 실패");
        const data = await response.json();
        console.log(data);
        if (Array.isArray(data)) setPokemonList(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <section className="flex flex-col justify-center items-center h-screen gap-4">
        <div className="loader"></div>
        <p>포켓몬 데이터를 불러오는 중입니다...</p>
      </section>
    );
  }

  if (error) {
    console.error(error);
    return <div>에러: {error}</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-black text-center m-7">👾 포켓몬 도감 👾</h1>
      <ul className="grid grid-cols-8 gap-6 p-4 m-4">
        {pokemonList?.map((pokemon) => (
          <Link
            href={`/pokemonDetail/${pokemon.id}`}
            key={pokemon.id}
            className="border-solid border-2 rounded-md border-black p-3 flex flex-col items-center shadow-md shadow-gray-500 hover:shadow-lg hover:shadow-blue-700"
          >
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.korean_name}
              width={100}
              height={100}
            />
            <h5 className="font-semibold">{pokemon.korean_name}</h5>
            <p className="text-sm">No. {pokemon.id}</p>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default PokemonListPage;
