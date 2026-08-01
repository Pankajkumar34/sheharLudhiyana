import { useCategoryQuery, useCreateBusinessMutation, useDeleteFileMutation, useFileUploadMutation, useS3UploadMutation } from "@/tanstack/business.tanstck";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



const AREAS = [
  // Model Town & Civil Lines
  "Model Town",
  "Civil Lines",
  "Sarabha Nagar",
  "BRS Nagar",
  "Gurdev Nagar",
  "Shastri Nagar",
  // South Ludhiana
  "Dugri",
  "Pakhowal Road",
  "Ferozepur Road",
  "South City",
  "Sundar Nagar",
  "Rajguru Nagar",
  // East Ludhiana
  "GT Road",
  "Jawahar Nagar",
  "Haibowal",
  "Mundian",
  "Dhandari",
  "Sherpur",
  // West Ludhiana
  "Focal Point",
  "Shimlapuri",
  "Vishwakarma Nagar",
  "Basti Jodhewal",
  "Barewal",
  // North Ludhiana
  "Khanna Road",
  "Giaspura",
  "Tibba Road",
  "Tajpur Road",
  "Wariana",
  // Central Ludhiana
  "Chaura Bazar",
  "Ghumar Mandi",
  "Gulabi Bagh",
  "Clock Tower",
  "Aamloh Road",
  // Industrial & Outskirts
  "Sahnewal",
  "Doraha",
  "Raikot Road",
  "Ludhiana Cantt",
  "Samrala Road",
  "Malerkotla Road",
];






// --- Types & Interfaces ---

export interface WorkingHour {
  day: string;
  open: boolean;
  from: string;
  to: string;
}

export interface PhotoUrl {
  url: string;
}

export interface BusinessFormData {
  businessName: string;
  category: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  area: string;
  hours: WorkingHour[];
  photoUrls: PhotoUrl[];
  latitude: number | null;
  longitude: number | null;
}

export interface Category {
  _id: string;
  name: string;
}

export interface CreateBusinessPayload extends BusinessFormData {}

export interface ApiResponse {
  message: string;
  success?: boolean;
}

// Initial state constant
const initialFormData: BusinessFormData = {
  businessName: "",
  category: "",
  description: "",
  phone: "",
  whatsapp: "",
  email: "",
  address: "",
  area: "",
  hours: [
    { day: "Monday", open: true, from: "09:00", to: "18:00" },
    { day: "Tuesday", open: true, from: "09:00", to: "18:00" },
    { day: "Wednesday", open: true, from: "09:00", to: "18:00" },
    { day: "Thursday", open: true, from: "09:00", to: "18:00" },
    { day: "Friday", open: true, from: "09:00", to: "18:00" },
    { day: "Saturday", open: true, from: "09:00", to: "18:00" },
    { day: "Sunday", open: false, from: "09:00", to: "18:00" },
  ],
  photoUrls: [],
  latitude: null,
  longitude: null,
};

export default function ListYourBusiness() {
  const { mutate: uploadImages, isPending } = useS3UploadMutation();
  const { mutate: deleteFile, isPending: isDeleting } = useDeleteFileMutation();
  const { data: categoryResponse, isLoading: isCategoriesLoading, isError: isCategoryError } = useCategoryQuery();
  const { mutate: createBusiness, isPending: isBusinessLoading } = useCreateBusinessMutation();
const navigate = useNavigate();
  const categories: Category[] = categoryResponse || [];

  const [formData, setFormData] = useState<BusinessFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const cleanVal = value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, [name]: cleanVal }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const toggleDay = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      hours: prev.hours.map((h, i) => (i === idx ? { ...h, open: !h.open } : h)),
    }));
  };

  const updateHour = (idx: number, field: keyof WorkingHour, value: string) => {
    setFormData((prev) => ({
      ...prev,
      hours: prev.hours.map((h, i) => (i === idx ? { ...h, [field]: value } : h)),
    }));
  };

  const handleFetchLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;

        setFormData((prev) => ({
          ...prev,
          latitude,
          longitude,
        }));

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          if (data && data.display_name) {
            setFormData((prev) => ({
              ...prev,
              address: data.display_name,
            }));
            if (errors.address) {
              setErrors((prev) => ({ ...prev, address: "" }));
            }
          }
        } catch (err) {
          console.error("Failed to fetch address name:", err);
        } finally {
          setIsLocating(false);
        }
      },
      (error: GeolocationPositionError) => {
        setIsLocating(false);
        toast.error("Unable to retrieve your location");
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const availableSlots = 5 - formData.photoUrls.length;
    const newFiles = Array.from(files).slice(0, availableSlots);

    uploadImages(newFiles, {
      onSuccess: (images: PhotoUrl[]) => {
        setFormData((prev) => ({
          ...prev,
          photoUrls: [...prev.photoUrls, ...images],
        }));
        e.target.value = "";
      },
      onError: (err: Error) => console.error(err),
    });
  };

  const handleRemovePhoto = (index: number) => {
    const file = formData.photoUrls[index];
    deleteFile(file.url, {
      onSuccess: () => {
        setFormData((prev) => ({
          ...prev,
          photoUrls: prev.photoUrls.filter((_, i) => i !== index),
        }));
      },
      onError: (err: Error) => console.error(err),
    });
  };

  const validate = (): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!formData.businessName.trim()) errs.businessName = "Business name is required";
    if (!formData.category) errs.category = "Please select a category";
    if (formData.description.length < 50) errs.description = "Description must be at least 50 characters";
    if (!formData.phone || formData.phone.length !== 10) errs.phone = "Enter a valid 10-digit phone number";
    if (!formData.address.trim()) errs.address = "Address is required";
    if (!formData.area) errs.area = "Please select an area";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const payload: CreateBusinessPayload = {
      businessName: formData.businessName,
      category: formData.category,
      description: formData.description,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      email: formData.email,
      address: formData.address,
      area: formData.area,
      hours: formData.hours,
      photoUrls: formData.photoUrls,
      latitude: formData.latitude,
      longitude: formData.longitude,
    };

    createBusiness(payload, {
      onSuccess: (res: ApiResponse) => {
        toast.success("created Successfully");
        navigate("/profile");
        setFormData(initialFormData);
        setErrors({});
        setSubmitted(true);
      },
      onError: (err: Error) => {
        toast.error(err?.message || "Something went wrong");
      },
    });
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-md p-12 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <span className="text-4xl text-green-500">✓</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Listing Submitted!</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-7">
            Our team will review your listing within 24 hours. Once approved, your business will be live on Shehar Ludhiana.
          </p>
          <button
            onClick={handleReset}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors"
          >
            Submit Another Business
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="bg-white rounded-2xl shadow-md p-10 max-w-3xl w-full">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-3xl">
            🏪
          </div>
        </div>
        <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-2">List Your Business</h1>
        <p className="text-center text-gray-500 text-sm mb-7">
          Join thousands of businesses on Shehar Ludhiana and reach more customers
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-blue-500 font-bold text-base">ℹ</span>
            <span className="text-blue-800 font-bold text-sm">How it works</span>
          </div>
          <ul className="list-disc list-inside text-blue-700 text-sm space-y-1 pl-1">
            <li>Fill out the business form below</li>
            <li>Our team will review your listing within 24 hours</li>
            <li>Once approved, your business will be live on our platform</li>
            <li>Start receiving customer reviews and inquiries</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Business Name <span className="text-red-500">*</span>
            </label>
            <input
              name="businessName"
              className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-orange-300 ${
                errors.businessName ? "border-red-400" : "border-gray-300"
              }`}
              placeholder="Enter your business name"
              value={formData.businessName}
              onChange={handleChange}
            />
            {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-gray-900 bg-white outline-none focus:ring-2 focus:ring-orange-300 ${
                errors.category ? "border-red-400" : "border-gray-300"
              }`}
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Description <span className="text-red-500">*</span>{" "}
            <span className="text-gray-400 font-normal">(minimum 50 characters)</span>
          </label>
          <textarea
            name="description"
            className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none resize-y min-h-28 focus:ring-2 focus:ring-orange-300 ${
              errors.description ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="Describe your business, services, and what makes you unique..."
            value={formData.description}
            onChange={handleChange}
          />
          <p className="text-gray-400 text-xs mt-1">{formData.description.length}/50</p>
          {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div
              className={`flex items-center border rounded-lg overflow-hidden ${
                errors.phone ? "border-red-400" : "border-gray-300"
              }`}
            >
              <span className="bg-gray-50 border-r border-gray-300 px-3 py-2.5 text-sm font-semibold text-gray-600">
                +91
              </span>
              <input
                name="phone"
                className="flex-1 px-3 py-2.5 text-sm text-gray-900 outline-none"
                placeholder="10-digit mobile number"
                maxLength={10}
                value={formData.phone}
                onChange={handleNumericChange}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">WhatsApp Number</label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="bg-gray-50 border-r border-gray-300 px-3 py-2.5 text-sm font-semibold text-gray-600">
                +91
              </span>
              <input
                name="whatsapp"
                className="flex-1 px-3 py-2.5 text-sm text-gray-900 outline-none"
                placeholder="WhatsApp number (optional)"
                maxLength={10}
                value={formData.whatsapp}
                onChange={handleNumericChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
          <input
            name="email"
            className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-orange-300"
            placeholder="business@example.com (optional)"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-semibold text-gray-700">
                Address <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={handleFetchLocation}
                disabled={isLocating}
                className="text-xs text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1 disabled:opacity-50"
              >
                {isLocating ? "Locating..." : "📍 Get Location"}
              </button>
            </div>

            <textarea
              name="address"
              className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none resize-y h-24 focus:ring-2 focus:ring-orange-300 ${
                errors.address ? "border-red-400" : "border-gray-300"
              }`}
              placeholder="Complete business address"
              value={formData.address}
              onChange={handleChange}
            />

            {(formData.latitude !== null || formData.longitude !== null) && (
              <p className="text-xs text-green-600 mt-1 font-medium">
                Lat: {formData.latitude}, Long: {formData.longitude}
              </p>
            )}

            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Area <span className="text-red-500">*</span>
            </label>
            <select
              name="area"
              className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-gray-900 bg-white outline-none focus:ring-2 focus:ring-orange-300 ${
                errors.area ? "border-red-400" : "border-gray-300"
              }`}
              value={formData.area}
              onChange={handleChange}
            >
              <option value="">Select Area</option>
              {AREAS.map((a: string) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
            {errors.area && <p className="text-red-500 text-xs mt-1">{errors.area}</p>}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Opening Hours</label>
          <div className="space-y-2.5">
            {formData.hours.map((h, idx) => (
              <div key={h.day} className="flex items-center gap-3 flex-wrap">
                <span className="w-24 text-sm font-medium text-gray-700">{h.day}</span>
                <label className="flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer min-w-16">
                  <input
                    type="checkbox"
                    checked={h.open}
                    onChange={() => toggleDay(idx)}
                    className="w-4 h-4 accent-blue-500"
                  />
                  Open
                </label>
                {h.open ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={h.from}
                      onChange={(e) => updateHour(idx, "from", e.target.value)}
                      className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-orange-300"
                    />
                    <span className="text-gray-500 text-xs">to</span>
                    <input
                      type="time"
                      value={h.to}
                      onChange={(e) => updateHour(idx, "to", e.target.value)}
                      className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-orange-300"
                    />
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm italic">Closed</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-7">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Business Photos (Maximum 5)
          </label>

          {formData.photoUrls.length < 5 && (
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl py-8 px-5 cursor-pointer hover:border-orange-400">
              {isPending ? (
                <>
                  <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm mt-3">Uploading...</p>
                </>
              ) : (
                <>
                  <span className="text-3xl">🖼</span>
                  <span className="bg-orange-500 text-white px-5 py-2 rounded-lg">
                    Choose Photos
                  </span>
                  <p className="text-xs mt-2">
                    {5 - formData.photoUrls.length} remaining
                  </p>
                </>
              )}

              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handlePhotos}
                disabled={isPending}
              />
            </label>
          )}

          {formData.photoUrls.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
              {formData.photoUrls.map((item, index) => (
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden border aspect-square"
                >
                  <img
                    src={`${item.url}`}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6"
                    disabled={isDeleting}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isBusinessLoading}
          className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-3.5 rounded-xl text-base transition-colors tracking-wide disabled:opacity-50"
        >
          {isBusinessLoading ? "Submitting..." : "Submit Business Listing"}
        </button>
      </div>
    </div>
  );
}