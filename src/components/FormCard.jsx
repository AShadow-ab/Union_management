// src/components/FormCard.jsx
export default function FormCard({ onClick, className, children, icon }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white shadow-lg rounded-lg cursor-pointer transition transform hover:scale-105 hover:shadow-xl flex items-center justify-center ${className}`}
    >
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        {icon && (
          <img
            src={icon}
            alt="icon"
            className="h-16 w-16 mb-4 object-contain"
          />
        )}
        <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          {children}
        </span>
      </div>
    </div>
  );
}