import { Pokemon } from "@/types/pokemon.type";
import Image from "next/image";
import Link from "next/link";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;

  const response = await fetch(`http://localhost:3000/api/pokemons/${id}`);
  if (!response.ok) throw new Error("데이터 불러오기 실패");
  const pokemon: Pokemon = await response.json();

  return {
    title: `${pokemon.korean_name}`,
    description: `${pokemon.korean_name}의 프로필`,
  };
};

const PokemonDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const response = await fetch(`http://localhost:3000/api/pokemons/${id}`);
  if (!response.ok) throw new Error("데이터 불러오기 실패");
  const pokemon: Pokemon = await response.json();

  return (
    <>
      <div className="mt-3 ml-2">
        <Link
          href="/pokemonList"
          className="border-2 rounded-md border-red-300 bg-red-300 text-white p-2 hover:border-red-500 hover:bg-red-500 hover:font-bold"
        >
          뒤로가기
        </Link>
      </div>

      <h1 className="text-3xl text-center mt-0 mb-7">
        💛<b>{pokemon.korean_name}</b>의 프로필💙
      </h1>
      <div className="flex border-solid border-2 rounded-md border-black p-4 mx-10 my-5">
        <section className="flex flex-col">
          <h3>
            No. {pokemon.id} {pokemon.korean_name}
          </h3>
          <Image
            src={pokemon.sprites.other.home.front_default}
            alt={pokemon.name}
            width={600}
            height={600}
          />
        </section>
        <section className="border-l-2 border-black w-2/3 pl-4 py-1 leading-relaxed">
          <div className="flex gap-2">
            🏷️ 이름:
            <p>
              {pokemon.korean_name}({pokemon.name})
            </p>
          </div>
          <div className="flex gap-2">
            🏷️ 키:
            <p>{pokemon.height}m</p>
          </div>
          <div className="flex gap-2">
            🏷️ 몸무게:
            <p> {pokemon.weight}kg</p>
          </div>
          <ul className="flex gap-2">
            🏷️ 타입:
            {pokemon.types.map((type, index) => (
              <li key={type.type.name}>
                {type.type.korean_name}({type.type.name})
                {pokemon.types.length - 1 === index ? "" : ", "}
              </li>
            ))}
          </ul>
          <ul className="flex gap-2">
            🏷️ 특성:
            {pokemon.abilities.map((ability, index) => (
              <li key={ability.ability.name}>
                {ability.ability.korean_name}({ability.ability.name})
                {pokemon.abilities.length - 1 === index ? "" : ", "}
              </li>
            ))}
          </ul>
          <p>🏷️ 기술</p>
          <ul className="flex flex-wrap">
            {pokemon.moves.map((move) => (
              <li
                key={move.move.name}
                className="border rounded-md w-fit p-2 mx-2 my-1 bg-blue-500 text-yellow-300 font-bold text-sm"
              >
                {move.move.korean_name}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default PokemonDetailPage;
