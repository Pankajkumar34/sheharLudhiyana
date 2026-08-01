import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios"
import {getCategory,deleteFileFn,getS3UploadUrl,getAllBusinesses,createBusinessFn,getMyBusinessesFn,getBusinessById} from "../lib/api/business.api.js"
export const useCategoryQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategory,
  });
};

export const useDeleteFileMutation = () => {
  return useMutation({
    mutationKey: ["deleteFile"],
    mutationFn: deleteFileFn,
  });
};
export const useS3UploadMutation = () => {
  return useMutation({
    mutationFn: async (files:any) => {
      const uploadedFiles = [];

      for (const file of files) {
        const res = await getS3UploadUrl({
          fileName: file.name,
          contentType: file.type,
        });
        const { uploadUrl } = res;

        await axios.put(uploadUrl, file, {
          headers: {
            "Content-Type": file.type,
          },
        });

        const imageUrl = uploadUrl.split("?")[0];

        uploadedFiles.push({
          originalName: file.name,
          url: imageUrl,
        });
      }

      return uploadedFiles;
    },
  });
};

export const useCreateBusinessMutation = () => {
  return useMutation({
    mutationKey: ["createBusiness"],
    mutationFn: createBusinessFn,
  });
};
export const useMyBusinessesQuery = (params = {}) => {
  return useQuery({
    queryKey: ["myBusinesses", params],
    queryFn: () => getMyBusinessesFn(params),
  });
};


export const useGetBusinessByIdQuery = (params:string) => {
  return useQuery({
    queryKey: ["getBusinessById", params],
    queryFn: () => getBusinessById(params),
  });
};


export const useGetAllBusinesses = (params:any) => {
  return useQuery({
    queryKey: ["businesses", params],
    queryFn: () => getAllBusinesses(params),
    staleTime: 1000 * 60 * 5,
  });
};