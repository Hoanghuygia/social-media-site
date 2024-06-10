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

const apiRequestPost = async (url, accessToken, data) => {
    try {
        await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log("Successfully saving data");
    } catch (error) {
        console.error("Error in saving data in database: ", error);
    }
};

export {apiRequest, apiRequestPost}