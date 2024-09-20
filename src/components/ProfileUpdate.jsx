import React, { useState, useEffect } from 'react';

// Profile Update Component
const ProfileUpdate = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [language, setLanguage] = useState('');
  const [gender, setGender] = useState('');
  const [profileImg, setProfileImg] = useState(null);

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const savedProfileData = JSON.parse(localStorage.getItem('profileData'));
    if (savedProfileData) {
      setFirstName(savedProfileData.firstName || '');
      setLastName(savedProfileData.lastName || '');
      setLanguage(savedProfileData.language || '');
      setGender(savedProfileData.gender || '');
      setProfileImg(savedProfileData.profileImg || null);
    }
  }, []);

  const handleSaveProfile = () => {
    const profileData = { firstName, lastName, language, gender};
    localStorage.setItem('profileData', JSON.stringify(profileData));
    alert('Profile data saved to localStorage');
  };

  // // Handle profile image upload
  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     setProfileImg(reader.result); // Store image as Base64
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">First (optional)</p>
          <input
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] h-14 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">Last</p>
          <input
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] h-14 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">Language</p>
          <select
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] h-14 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="">Select Language</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
          </select>
        </label>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">Gender</p>
          <select
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] h-14 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
      </div>
      {/* <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#F9FAFA] text-base font-medium leading-normal pb-2">Profile Image</p>
          <input
            type="file"
            accept="image/*"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border border-[#505362] bg-[#22232A] focus:border-[#505362] h-14 placeholder:text-[#D5D6DD] p-[15px] text-base font-normal leading-normal"
            onChange={handleImageUpload}
          />
        </label>
      </div> */}
      {/* {profileImg && (
        <div className="flex justify-center px-4 py-3">
          <img src={profileImg} alt="Profile" className="rounded-full w-24 h-24" />
        </div>
      )} */}
      <div className="flex px-4 py-3">
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#607AFB] text-[#F9FAFA] text-sm font-bold leading-normal tracking-[0.015em]"
          onClick={handleSaveProfile}
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileUpdate;
