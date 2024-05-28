import { useState } from "react";
import avatar from "./../../../public/img/avatar.png";
import { PiVideoBold } from "react-icons/pi";
import { FaRegImage } from "react-icons/fa";

const StatusModal = ({ isOpen, onClose, onSubmit }) => {
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

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
      <div className="bg-pastel-pink-100 p-4 rounded-lg w-1/3 relative">
        <button
          type="button"
          className="bg-gray-500 text-white text-2xl px-[10px] pb-1 rounded-full hover:bg-gray-600 absolute top-3 right-3"
          onClick={onClose}
        >
          &times;
        </button>
         <div className="relative h-0.5 bg-gray-300 w-full"></div>
        <div className="flex justify-start items-center gap-3 pt-3 px-5">
          <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden">
            <img
              src={avatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <p className="font-inter tracking-wide font-medium text-lg text-gray-600">
              Swirl Lollipop
            </p>
            <div className="h-0.5 bg-gray-300 w-full"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pl-20 pr-10">
          <textarea
            className="p-2 bg-transparent rounded-md"
            value={status}
            onChange={handleStatusChange}
            placeholder="Share your sweet!"
            rows="2"
          />
          <div className="flex gap-4">
            <div className="flex items-center">
              <FaRegImage
                className="w-10 h-10 text-pastel-purple-300 cursor-pointer"
                onClick={() => document.getElementById('imageInput').click()}
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
                className="w-10 h-10 text-pastel-purple-300  cursor-pointer"
                onClick={() => document.getElementById('videoInput').click()}
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
              className="bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600"
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
