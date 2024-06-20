import NotificationItem from "./NotificationItem";
import { Flex } from "@chakra-ui/react";
import ButtonNot from "./ButtonNot";
import { apiRequest } from "../../utils/helper";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { setCurrentPage } from "../../stores/windowSlice";
import { useDispatch, } from 'react-redux';

const fetchNotification = async (currentUserID, accessToken) => {
    const url = `https://sugar-cube.onrender.com/notification/${currentUserID}`;
    return await apiRequest(url, accessToken);
};

function Notification() {
    const accessToken = Cookies.get("token");
    const currentUserID = Cookies.get("userId");

    const socket = useSelector((state) => state.window.socket);
    const dispatch = useDispatch();

    const [data, setData] = useState([]);
    const [isUnread, setIsUnread] = useState(false);

    const bgColor = {
        backgroundColor: "#f7e9f1",
    };

    const handleUnread = (allNotifications) => {
        setIsUnread(true);
        const unreadNotifications = allNotifications.filter(
            (notification) => !notification.read
        );
        setData(unreadNotifications);
    };

    const handleAll = () => {
        setIsUnread(false);
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
            setData(notifications);
        } catch (error) {
            console.error("Error happened when fetching data: ", error);
        }
    };

    useEffect(() => {
        if (!isUnread) {
            fetchData();
        }
    }, [data]);

    useEffect(() => {
        dispatch(setCurrentPage("Notification"));
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("new-notification", (data) => {
                console.log("Data: ", data);
                if (Array.isArray(data)) {

                    setData((prevData) => [...data, ...prevData]);
                } else if (data && typeof data === 'object') {
                    setData((prevData) => [data, ...prevData]);
                }
            });
    
            return () => {
                socket.off("new-notification");
            };
        }
    }, [socket]);
    
    
    
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
                    <ButtonNot
                        contentText="All"
                        onClick={handleAll}
                        isUnread={isUnread}
                    />
                    <ButtonNot
                        contentText="Unread"
                        onClick={() => handleUnread(data)}
                        isUnread={isUnread}
                    />
                </Flex>

                {data.map((postData, index) => (
                    <NotificationItem key={index} data={postData} />
                ))}
            </div>
        </>
    );
}

export default Notification;
