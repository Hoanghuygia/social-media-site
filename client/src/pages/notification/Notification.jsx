import NotificationItem from "./NotificationItem";

const data = [
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
    {
        ava: "/img/Sugarcube.png",
        name: "stupid",
        descri: "being stupid is a talent you know"
    },
];

function Notification() {
    const bgColor = {
        backgroundColor: "#f7e9f1"
    }
    return ( 
    <>
        <div className="h-full w-full max-h-full overflow-auto overscroll-auto" style={bgColor}>
            <div className="text-center	text-3xl font-bold pt-5 mb-3" style={bgColor}>
                Notifications
            </div>
            {data.map((postData, index) => ( 
                <NotificationItem key={index} data={postData}/> 
            ))}
        </div>
    </>
    );
}

export default Notification;