import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useMyBusinessesQuery} from "../../tanstack/business.tanstck"
interface Props {
  status: "All" | "Active" | "Pending";
}

export default function BusinessList({ status }: Props) {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const { data, isLoading } = useMyBusinessesQuery({
    page,
    limit: 6,
    status: status === "All" ? "" : status.toLowerCase(),
  });

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-56 rounded-xl bg-gray-100 animate-pulse"
          />
        ))}
      </div>
    );
  }
  console.log(data,"=====")

  const businesses = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  if (!businesses.length) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🏪</div>

        <h2 className="text-xl font-semibold">
          No Business Found
        </h2>

        <p className="text-gray-500 mt-2">
          Create your first business listing.
        </p>

        <button
          onClick={() => navigate("/list-your-business")}
          className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl"
        >
          Add Business
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 gap-5">
        {businesses.map((business: any) => (
          <div
            key={business._id}
            className="rounded-2xl overflow-hidden border hover:shadow-xl transition"
          >
            <div className="relative h-48">
              <img
                src={
                  business.photos?.[0]?.url ||
                  "/no-image.png"
                }
                className="w-full h-full object-cover"
              />

              <span
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold
                ${
                  business.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : business.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {business.status}
              </span>
            </div>

            <div className="p-5">

              <h3 className="font-bold text-lg">
                {business.businessName}
              </h3>

              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {business.description}
              </p>

              <div className="mt-4 space-y-2 text-sm">

                <div>
                  📞 {business.phone}
                </div>

                <div>
                  📍 {business.area}
                </div>

                <div>
                  📅{" "}
                  {new Date(
                    business.createdAt
                  ).toLocaleDateString()}
                </div>

              </div>

              <div className="flex gap-3 mt-5">

                <button
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg"
                  onClick={() =>
                    navigate(`/business/${business._id}`)
                  }
                >
                  View
                </button>

                <button
                  className="flex-1 border border-orange-500 text-orange-500 hover:bg-orange-50 py-2 rounded-lg"
                  onClick={() =>
                    navigate(`/edit-business/${business._id}`)
                  }
                >
                  Edit
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8">

          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-40"
          >
            Previous
          </button>

          <span className="font-semibold">
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-40"
          >
            Next
          </button>

        </div>
      )}
    </>
  );
}