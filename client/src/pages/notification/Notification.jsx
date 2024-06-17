import NotificationItem from "./NotificationItem";
import { Box, Flex } from "@chakra-ui/react";
import ButtonNot from "./ButtonNot";

const data = [
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know",
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know",
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know",
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know",
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know",
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know",
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know",
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know",
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know",
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know",
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know",
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know",
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know",
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know",
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know",
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know",
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know",
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know",
    },
];

function Notification() {
    const bgColor = {
        backgroundColor: "#f7e9f1",
    };
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
                    <ButtonNot contentText="All"/>
                    <ButtonNot contentText="Unread"/>
                </Flex>

                {data.map((postData, index) => (
                    <NotificationItem key={index} data={postData} />
                ))}
            </div>
        </>
    );
}

export default Notification;
