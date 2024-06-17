import { useState, useRef, useEffect } from "react";
import avatar from "./../../../public/img/avatar.png";
import { PiVideoBold } from "react-icons/pi";
import { FaRegImage } from "react-icons/fa";
import uploadImage from "../../utils/uploadImage"; // Import the uploadImage utility function

const StatusModal = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [privacyLevel, setPrivacyLevel] = useState("Public"); // State for privacy level
  const textareaRef = useRef(null);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage({ file, preview: URL.createObjectURL(file) });
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo({ file, preview: URL.createObjectURL(file) });
    }
  };

  const handlePrivacyLevelChange = (e) => {
    setPrivacyLevel(e.target.value);
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      adjustTextareaHeight();
    }
  }, [status]);

  const postStatus = async (statusData) => {
    const userId = localStorage.getItem('userId'); // Fetch userId from localStorage
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    let mediaURL = null;

    if (statusData.image) {
      try {
        mediaURL = await uploadImage(statusData.image.file);
      } catch (error) {
        console.error("Image upload failed: ", error);
        return;
      }
    }

    if (statusData.video) {
      try {
        mediaURL = await uploadImage(statusData.video.file);
      } catch (error) {
        console.error("Video upload failed: ", error);
        return;
      }
    }

    const data = {
      Object_id: userId,
      posts: [
        {
          content: statusData.status,
          mediaURL: mediaURL || '',
          privacyLevel: statusData.privacyLevel,
        }
      ]
    };

    try {
      const token = localStorage.token;
      const response = await fetch('https://sugar-cube.onrender.com/post/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Ensure Content-Type is set to application/json
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to post status');
      }

      const result = await response.json();
      console.log('Post successful:', result);
    } catch (error) {
      console.error('Error posting status:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postStatus({ status, image, video, privacyLevel }); // Include privacy level in the status data
    setStatus("");
    setImage(null);
    setVideo(null);
    onClose();
  };

  const removeImage = () => {
    setImage(null);
  };

  const removeVideo = () => {
    setVideo(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center overflow-y-auto">
      <div className="bg-pastel-pink-100 p-3 rounded-3xl w-1/3 relative max-h-screen overflow-y-auto top-10 z-60">
        <button
          type="button"
          className="bg-gray-300 text-white text-lg px-[9px] pb-[0.1rem] rounded-full hover:bg-gray-400 absolute right-3"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-row pt-10">
          <div className="h-0.5 bg-gray-300 w-full" />
        </div>
        <div className="flex justify-start items-center gap-3 pt-3 px-5">
          <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              src={avatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-4">
              <p className="font-inter tracking-wider font-medium text-xl mt-1 text-gray-600">
                {localStorage.name}
              </p>
              <select
                value={privacyLevel}
                onChange={handlePrivacyLevelChange}
                className="bg-gray-200 text-gray-600 rounded-md p-1"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="Following">Following</option>
              </select>
            </div>
            <div className="h-0.5 bg-gray-300 w-full"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col pl-[82px] pr-10">
          <textarea
            className="bg-transparent outline-none resize-none overflow-hidden font-inter tracking-wide text-sm"
            ref={textareaRef}
            value={status}
            onChange={handleStatusChange}
            placeholder="Share your sweet!"
            rows="2"
            style={{ minHeight: "2em" }}
          />
          {image && (
            <div className="relative mt-4">
              <img src={image.preview} alt="preview" className="w-full h-auto rounded-md" />
              <button
                type="button"
                className="absolute top-0 right-0 bg-transparent text-black rounded-full p-1 text-xl"
                onClick={removeImage}
              >
                &times;
              </button>
            </div>
          )}
          {video && (
            <div className="relative mt-4">
              <video src={video.preview} controls className="w-full h-auto rounded-md" />
              <button
                type="button"
                className="absolute top-0 right-0 bg-transparent text-white rounded-full p-1 text-xl"
                onClick={removeVideo}
              >
                &times;
              </button>
            </div>
          )}
          <div className="flex gap-10 pt-4">
            <div className="flex items-center">
              <FaRegImage
                className="w-6 h-6 text-pastel-purple-300 cursor-pointer hover:scale-150 hover:text-pastel-purple-200 transition-transform ease-in"
                onClick={() => document.getElementById("imageInput").click()}
              />
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <div className="flex items-center">
              <PiVideoBold
                className="w-6 h-6 text-pastel-purple-300 cursor-pointer hover:scale-150 hover:text-pastel-purple-200 transition-transform ease-in"
                onClick={() => document.getElementById("videoInput").click()}
              />
              <input
                type="file"
                id="videoInput"
                accept="video/*"
                onChange={handleVideoChange}
                className="hidden"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-pastel-purple-200 font-khumb-sans tracking-wide font-medium text- py-2 px-4 rounded-2xl hover:bg-pastel-purple-300 text-white"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatusModal;
