import { useState } from "react";
import avatar from "./../../../public/img/avatar.png";
import { PiVideoBold } from "react-icons/pi";
import { FaRegImage } from "react-icons/fa";

import StatusModal from "./StatusModal";


export default function StatusBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statuses, setStatuses] = useState([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitStatus = (newStatus) => {
    setStatuses([newStatus, ...statuses]);
  };

  return (
    <div className="flex flex-col items-center px-20">
      <div className="bg-[#F3E9FF] py-4 px-2 rounded-full w-full flex flex-row justify-center items-center gap-7">
        <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center">
          <img
            src={avatar}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="bg-white py-2 w-5/6 rounded-full pr-10 pl-5 flex justify-between hover:bg-gray-100 cursor-pointer"
          onClick={handleOpenModal}
        >
          <p className="font-inter text-gray-400 tracking-wide py-2">
            Share your sweet...
          </p>
          <div className="text-pastel-purple-300 flex justify-center gap-6">
            <PiVideoBold className="w-10 h-10" />
            <FaRegImage className="w-10 h-10" />
          </div>
        </div>
      </div>

      <StatusModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitStatus}
      />

      <div className="mt-4 w-full max-w-lg">
        {statuses.map((status, index) => (
          <div key={index} className="bg-white p-4 mb-2 border border-gray-200 rounded-md shadow-sm">
            <p>{status.status}</p>
            {status.image && <img src={URL.createObjectURL(status.image)} alt="status" className="mt-2" />}
            {status.video && <video controls src={URL.createObjectURL(status.video)} className="mt-2" />}
          </div>
        ))}
      </div>
    </div>
  );
}
