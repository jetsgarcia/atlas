export default function StudentCard({
  name,
  score,
}: {
  name: string;
  score: number;
}) {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg cursor-pointer transition transform hover:shadow-lg hover:-translate-y-1 active:scale-95">
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-500">Score: {score}</p>
    </div>
  );
}
