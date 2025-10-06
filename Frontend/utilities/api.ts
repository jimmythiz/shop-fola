import axios from "axios";
const api = axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL,
    withCredentials:true,
})
export default api;

let accessToken:string | null = null
export const setAccessToken = (token: string | null)=>{
    accessToken = token
}


api.interceptors.request.use(
    (config)=>{
        if (accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    (error)=>Promise.reject(error)
);

interface FailedRequest {
  resolve: (token?: string | null) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error:unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};
export const logout = async (): Promise<void> =>{
    await api.post('/auth/logout');
    setAccessToken(null)
    window.location.href = '/login'
}

api.interceptors.response.use(
    (response)=>response,
    async (error)=>{
        const originalRequest = error.config;


        if (!error.response) {
            return Promise.reject(error);
        }
        if (originalRequest.url.includes("/auth/refresh-token")) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry){
                if (isRefreshing){
                    return new Promise((resolve, reject)=>{
                        failedQueue.push({resolve,reject})
                    })
                    .then((token)=>{
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest)
                    })
                    .catch((error)=>Promise.reject(error))
                }
            originalRequest._retry = true;
            isRefreshing = true
            try{
                const {data} = await api.post<{ accessToken: string }>(`/auth/refresh-token`, {}, {withCredentials:true})
                setAccessToken(data.accessToken)
                processQueue(null, data.accessToken);
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
                return api(originalRequest)
            }catch(refreshError){
                processQueue(refreshError,null)
                logout()
                return Promise.reject(refreshError)
            }finally{
                isRefreshing = false
            }
        }
        return Promise.reject(error)
    }
)