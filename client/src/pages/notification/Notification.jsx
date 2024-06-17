import NotificationItem from "./NotificationItem";
import { Flex } from "@chakra-ui/react";
import ButtonNot from "./ButtonNot";
import { apiRequest } from "../../utils/helper";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";

const fetchNotification = async (currentUserID, accessToken) => {
    const url = `http://localhost:3000/notification/${currentUserID}`;
    return await apiRequest(url, accessToken);
};

function Notification() {
    const accessToken = Cookies.get("token");
    const currentUserID = Cookies.get("userId");

    const [data, setData] = useState([]);
    const fetchedRef = useRef(false);

    const bgColor = {
        backgroundColor: "#f7e9f1",
    };

    const handleUnread = (allNotifications) => {
        const unreadNotifications = allNotifications.filter(
            (notification) => !notification.read
        );
        setData(unreadNotifications);
    };

    const handleAll = () => {
        fetchData();
    };

    const fetchData = async () => {
        try {
            const userData = await fetchNotification(
                currentUserID,
                accessToken
            );
            const notifications = userData.map((item) => ({
                avatar: item.sender_id.profilePicture,
                name: `${item.sender_id.firstName} ${item.sender_id.lastName}`,
                content: item.contentNot,
                read: item.read,
                notificationID: item.notification_id,
            }));
            console.log("Notifications: ", notifications);
            setData(notifications);
        } catch (error) {
            console.error("Error happened when fetching data: ", error);
        }
    };

    useEffect(() => {
        if (currentUserID) {
            if (!fetchedRef.current) {
                fetchedRef.current = true;
                fetchData();
            }
        }
    }, []);
    return (
        <>
            <div
                className="h-full w-full max-h-full overflow-auto overscroll-auto"
                style={bgColor}
            >
                <div
                    className="text-left text-3xl font-bold pt-5 mb-5 ml-12"
                    style={bgColor}
                >
                    Notifications
                </div>

                <Flex ml={"42px"} flexDir={"row"}>
                    <ButtonNot contentText="All" onClick={handleAll} />
                    <ButtonNot contentText="Unread" onClick={() => handleUnread(data)} />
                </Flex>

                {data.map((postData, index) => (
                    <NotificationItem key={index} data={postData} />
                ))}
            </div>
        </>
    );
}

export default Notification;
