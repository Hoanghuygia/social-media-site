import React from 'react';
import BannerImage from './../../assets/img/Banner.png';
import avatar from './../../../public/img/avatar.png'

const ProfileHeader = () => {
  return (
    <div className='container min-h-screen w-full'>
      <div className='bg-white h-72'>
        <img src={BannerImage} alt='Profile Banner' className="w-full h-full object-cover"/>
        <img src={avatar} alt='avater' className='absolute '/>
      </div>
    </div>
  );
}

export default ProfileHeader;
