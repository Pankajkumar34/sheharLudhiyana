import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { User, Phone, MapPin, Building, ShieldCheck, CheckCircle, ChevronDown } from "lucide-react";
import { useCategoryQuery } from "../../tanstack/business.tanstck"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/axios.config";


// Validation Schema
const profileValidationSchema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    phone: yup
        .string()
        .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
        .required("Phone number is required"),
    role: yup
        .string()
        .oneOf(["USER", "BUSINESS_OWNER", "ADMIN", "SUPER_ADMIN"])
        .required("Please select a role"),
    businessCategory: yup.string().when("role", {
        is: (role) => ["BUSINESS_OWNER", "ADMIN", "SUPER_ADMIN"].includes(role),
        then: (schema) => schema.required("Business Category is required for business/admin roles"),
        otherwise: (schema) => schema.nullable().notRequired(),
    }),
    address: yup.object().shape({
        city: yup.string().required("City is required"),
        state: yup.string().required("State is required"),
        country: yup.string().default("India").required("Country is required"),
    }),
});

const CompleteProfileForm = ({ userData, onProfileUpdated }) => {
    const queryClient = useQueryClient();

    const { data: categoryResponse, isLoading: isCategoriesLoading, isError: isCategoryError } = useCategoryQuery();
    const categories = categoryResponse || [];
    const updateProfileMutation = useMutation({
        mutationFn: async (formData) => {
            const response = await api.post("/user/complete-profile", {
                ...formData,
                isProfileCompleted: true,
            });
            return response.data;
        },
        onSuccess: (data) => {
            alert("Profile completed successfully!");

            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
            if (onProfileUpdated) onProfileUpdated(data);
           window.location.href="/profile"
        },
        onError: (error) => {
            alert(error?.response?.data?.message || "Failed to update profile");
        },
    });

    // 3. React Hook Form Setup
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(profileValidationSchema),
        defaultValues: {
            fullName: userData?.fullName || "",
            phone: userData?.phone || "",
            role: userData?.role || "USER",
            businessCategory: userData?.businessCategory || "",
            address: {
                city: userData?.address?.city || "",
                state: userData?.address?.state || "",
                country: userData?.address?.country || "India",
            },
        },
    });

    // Reset form when props userData loads asynchronously
    useEffect(() => {
        if (userData) {
            reset({
                fullName: userData.fullName || "",
                phone: userData.phone || "",
                role: userData.role || "USER",
                businessCategory: userData.businessCategory || "",
                address: {
                    city: userData.address?.city || "",
                    state: userData.address?.state || "",
                    country: userData.address?.country || "India",
                },
            });
        }
    }, [userData, reset]);

    const selectedRole = watch("role");

    const onSubmit = (formData) => {
        updateProfileMutation.mutate(formData);

    };

    return (
        <div className="max-w-2xl mx-auto my-8 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white text-center">
                <h2 className="text-2xl font-bold text-primary">Complete Your Profile</h2>
                <p className="text-orange text-sm mt-1 text-foreground">
                    Please provide the necessary details to activate all features.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">

                {/* Profile Avatar & Info */}
               

                {/* Basic Information */}
                {/* Full Name */}
                <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Full Name
                    </label>
                    <div className="relative flex items-center">
                        {/* <User className="w-5 h-5 text-gray-400 absolute left-3 pointer-events-none z-10" /> */}
                        <input
                            type="text"
                            {...register("fullName")}
                            className="w-full pl-10 pr-3 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                            placeholder="Pankaj Kumar"
                        />
                    </div>
                    {errors.fullName && (
                        <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                    )}
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Phone Number
                    </label>
                    <div className="relative flex items-center">
                        {/* <Phone className="w-5 h-5 text-gray-400 absolute left-3 pointer-events-none z-10" /> */}
                        <input
                            type="text"
                            {...register("phone")}
                            className="w-full pl-10 pr-3 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                            placeholder="9876543210"
                        />
                    </div>
                    {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                    )}
                </div>

                {/* Role Selection */}
                <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Account Type / Role
                    </label>
                    <div className="relative flex items-center">
                        {/* Left Icon */}
                        {/* <ShieldCheck className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" /> */}

                        {/* Select Input */}
                        <select
                            {...register("role")}
                            className="w-full pl-10 pr-10 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-orange-400 outline-none bg-white appearance-none cursor-pointer leading-tight"
                        >
                            <option value="USER">User (Standard)</option>
                            <option value="BUSINESS_OWNER">Business Owner</option>
                            <option value="ADMIN">Admin</option>
                        </select>

                        {/* Right Dropdown Arrow Icon (Optional but recommended) */}
                    </div>

                    {errors.role && (
                        <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
                    )}
                </div>

                {/* Dynamic Business Category (Fetched from Backend API) */}
                {["BUSINESS_OWNER", "ADMIN", "SUPER_ADMIN"].includes(selectedRole) && (
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
                        <label className="block text-xs font-semibold text-gray-700">
                            Business Category <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            {/* <Building className="w-4 h-4 text-gray-400 absolute left-3 top-3" /> */}
                            <select
                                {...register("businessCategory")}
                                disabled={isCategoriesLoading}
                                className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-orange-400 outline-none bg-white disabled:bg-gray-100"
                            >
                                <option value="">
                                    {isCategoriesLoading ? "Loading Categories..." : "-- Select Category --"}
                                </option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {isCategoryError && (
                            <p className="text-red-500 text-xs mt-1">Failed to load categories list.</p>
                        )}
                        {errors.businessCategory && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.businessCategory.message}
                            </p>
                        )}
                    </div>
                )}

                {/* Address Fields */}
                <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Address Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">City</label>
                            <input
                                type="text"
                                {...register("address.city")}
                                placeholder="Ludhiana"
                                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                            />
                            {errors.address?.city && (
                                <p className="text-red-500 text-xs mt-1">{errors.address.city.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">State</label>
                            <input
                                type="text"
                                {...register("address.state")}
                                placeholder="Punjab"
                                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                            />
                            {errors.address?.state && (
                                <p className="text-red-500 text-xs mt-1">{errors.address.state.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Country</label>
                            <input
                                type="text"
                                {...register("address.country")}
                                placeholder="India"
                                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                            />
                            {errors.address?.country && (
                                <p className="text-red-500 text-xs mt-1">{errors.address.country.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={updateProfileMutation.isPending}
                    className="w-full py-3 bg-primary hover:bg-orange-700 text-white font-semibold rounded-xl transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                    {updateProfileMutation.isPending ? (
                        <span>Saving...</span>
                    ) : (
                        <>
                            <CheckCircle className="w-5 h-5" />
                            <span>Save & Complete Profile</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default CompleteProfileForm;