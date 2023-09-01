
import axios from "axios";


axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

export const login = async (email: string, password: string) => {
    const response = await axios.post("/login", { email, password });
    return response.data;   
}