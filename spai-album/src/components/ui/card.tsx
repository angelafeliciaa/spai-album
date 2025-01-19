export default function Card({
    image,
    title,
    description,
    onClick,
  }: {
    image?: string; // Optional image URL
    title: string; // Card title
    description: string; // Card description
    onClick?: () => void; // Optional click handler
  }) {
    return (
      <div
        className="max-w-sm rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow cursor-pointer"
        onClick={onClick}
      >
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <p className="text-gray-600 text-sm mt-2">{description}</p>
        </div>
      </div>
    );
  }
  