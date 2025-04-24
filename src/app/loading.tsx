import Image from "next/image";

const messages = [
  "Waking up the hamsters...",
  "Generating witty loading message...",
  "Polishing the pixels...",
  "Negotiating with the backend...",
  "Zoltraak!",
];

const gifs = ["/loading.gif", "/kuru-kuru.gif", "/warming-by-fire.gif"].map(
  (gif) => "/loading" + gif
);

// Ignore the things at top, you need "use client" and useState to use them

function randomItem<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center text-black text-center">
      <Image
        src={randomItem(gifs)}
        alt="Loading..."
        width={256}
        height={256}
        className="mb-6"
        unoptimized
      />
      <p className="text-xl animate-pulse">{randomItem(messages)}</p>
    </div>
  );
}
