import axios from "axios";

const apiRequest = async (url, accessToken) => {
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${url}: `, error);
        throw error;
    }
};

export {apiRequest}