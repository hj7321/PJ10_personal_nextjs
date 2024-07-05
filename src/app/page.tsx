import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white text-5xl font-black">
      <Link href="/pokemonList">포켓몬 도감 보러가기</Link>
    </main>
  );
}
