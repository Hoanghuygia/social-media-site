import ProfileHeader from "./ProfileHeader";
import StatusBar from "./StaturBar";
function Profile() {
  return (
    <div className="min-h-screen w-full">
      <div className="">
        <ProfileHeader />
      </div>
      <div className=" pt-48 ">
        <StatusBar />
      </div>
    </div>
  );
}

export default Profile;
