import { useParams } from "react-router-dom";
import ProfileUserHeader from "./ProfileUserHeader";
function ProfileUser() {
    const { username } = useParams();
    console.log(username);
    return (
    <div className="min-h-screen w-full">
        <div className="">
        <ProfileUserHeader username={username}/>
        </div>
    </div>
    );
}

export default ProfileUser;