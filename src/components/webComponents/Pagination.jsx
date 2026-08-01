import React from "react";

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 rounded-lg border disabled:opacity-40"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`w-10 h-10 rounded-lg transition ${
            page === i + 1
              ? "bg-orange-500 text-white"
              : "border hover:bg-gray-100"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 rounded-lg border disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}