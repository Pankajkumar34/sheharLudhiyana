import api from "../axios.config";


export const getCategory = async () => {
  try {
    const res = await api.get("/category/get-categories");
    return res.data;
  } catch (error) {
    throw error
  }
}



export const getS3UploadUrl = async (payload) => {
  const res = await api.post("/file/get-s3-url", payload);
  console.log(res, "==")
  return res;
};

export const deleteFileFn = async (fileUrl) => {
  console.log(fileUrl, "fileUrl")
  const res = await api.post("/file/delete-s3-file", {
    url: fileUrl,
  });

  return res;
};
export const createBusinessFn = async (payload) => {
  try {
    const { data } = await api.post("/business/create-business", payload);
    return data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const getMyBusinessesFn = async (params = {}) => {
  try {
    const res = await api.get("/business/my-businesses", {
      params,
    });

    return res;
  } catch (error) {
    throw error?.response?.data || error;
  }
};


export const getBusinessById = async (params) => {
  try {
    const res = await api.get(`/business/get-businessesByid/${params}`)
    return res;
  } catch (error) {
    throw error?.response?.data || error;
  }
};


export const getAllBusinesses = async (params) => {
  try{
const res = await api.get("/business/all", {
    params,
  });

  return res;
  }catch(error){
    throw error?.response?.data || error;

  }
};
