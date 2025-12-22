type StatCardProps = {
  title: string;
  value: string | number;
  color?: "blue" | "green" | "yellow" | "red" | "gray";
};

export default function StatCard({
  title,
  value,
  color = "gray",
}: StatCardProps) {
  const colorMap = {
    blue: "border-blue-400",
    green: "border-green-400",
    yellow: "border-yellow-400",
    red: "border-red-400",
    gray: "border-gray-300",
  };

  return (
    <div className={`bg-white border-l-4 ${colorMap[color]} rounded-xl p-4`}>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold text-gray-800 mt-1">
        {value}
      </p>
    </div>
  );
}
