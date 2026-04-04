const Card = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="bg-[#1e293b] p-4 rounded-lg shadow">
      <p className="text-gray-400">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
};

export default Card;