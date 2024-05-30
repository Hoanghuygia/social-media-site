import NotificationItem from "./NotificationItem";


function Notification() {
    const bgColor = {
        backgroundColor: "#f7e9f1"
    }
    return ( 
    <>
        <div className="h-full w-full max-h-full overflow-auto overscroll-auto" style={bgColor}>
            <div className="text-center	text-3xl font-bold pt-5">
                Notifications
            </div>
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
        </div>
    </>
);
}

export default Notification;