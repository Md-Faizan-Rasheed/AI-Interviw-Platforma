import axios from "axios";

axios.defaults.withCredentials = true;

export const refreshToken = async () => {
    try {
        const res = await axios.get("http://localhost:8080/jobs/refresh-token");
        return res.data.user;
    } catch (error) {
        return null;
    }
};

export const logout = async () => {
    await axios.post("/logout");
};
