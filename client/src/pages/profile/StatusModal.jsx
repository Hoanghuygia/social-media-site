import { useState, useRef, useEffect } from "react";
import avatar from "./../../../public/img/avatar.png";
import { PiVideoBold } from "react-icons/pi";
import { FaRegImage } from "react-icons/fa";

const StatusModal = ({ isOpen, onClose, onSubmit }) => {
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const textareaRef = useRef(null);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ status, image, video });
    setStatus("");
    setImage(null);
    setVideo(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-pastel-pink-100 p-3 rounded-3xl w-1/3 relative">
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
          <div className="flex flex-col">
            <p className="font-inter tracking-wider font-medium text-sm text-gray-600">
              Swirl Lollipop
            </p>
            <div className="h-0.5 bg-gray-300 w-full"></div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col pl-[82px] pr-10"
        >
          <textarea
            className=" bg-transparent outline-none resize-none overflow-hidden font-inter tracking-wide text-sm "
            ref={textareaRef}
            value={status}
            onChange={handleStatusChange}
            placeholder="Share your sweet!"
            rows="2"
            style={{ minHeight: "2em" }}
          />
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
              className=" bg-pastel-purple-200 font-khumb-sans tracking-wide font-medium text- py-2 px-4 rounded-2xl hover:bg-pastel-purple-300 text-white"
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
