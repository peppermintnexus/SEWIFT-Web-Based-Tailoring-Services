import React, { useState, useEffect } from "react";
import ClientHeader from "/src/components/ClientHeader.jsx";
import { getAuth, onAuthStateChanged, getIdToken } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function ClientProfile() {
  const [First_Name, setfirstName] = useState("");
  const [userData, setUserData] = useState({
    First_Name: "",
    Last_Name: "",
    phone: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const [Measurement_Profile, setMeasurements] = useState({
    Shoulder: "",
    Sleeve: "",
    Circumference: "",
    Figure: "",
    Blouse_Length: "",
    Dress_Length: "",
    Blouse_Bust: "",
    Blouse_Waist: "",
    Blouse_Hips: "",
    Front_Chest: "",
    Back_Chest: "",
    Bust_Point: "",
    Bust_Distance: "",
    Skirt_Length: "",
    Skirt_Waist: "",
    Skirt_Hips: "",
    Crotch: "",
    Pants_Length: "",
    Thigh: "",
    Knee: "",
    Ankle_Flare: "",
    Polo_Length: "",
    Polo_Waist: "",
    Polo_Hips: "",
  });
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Get the user's token
          const userToken = await getIdToken(user);
          setToken(userToken);

          // Fetch additional user data from Firestore
          const userDocRef = doc(db, "Client", user.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const userProfile = docSnap.data();
            setUserData({
              First_Name: user.displayName
                ? user.displayName.split(" ")[0]
                : userProfile.First_Name || "",
              Last_Name: user.displayName
                ? user.displayName.split(" ").slice(1).join(" ")
                : userProfile.Last_Name || "",
              Phone_Number: userProfile.Phone_Number || "",
              Complete_Address: userProfile.Complete_Address || "",
            });

            if (userProfile.Measurement_Profile) {
              setMeasurements(userProfile.Measurement_Profile);
            }
          }
        } else {
          console.error("User is not authenticated");
        }
      });
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name in userData) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
    } else {
      setMeasurements((prevMeasurements) => ({
        ...prevMeasurements,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(db, "Client", user.uid);
      try {
        await setDoc(
          userDocRef,
          {
            First_Name: userData.First_Name,
            Last_Name: userData.Last_Name,
            Phone_Number: userData.Phone_Number,
            Complete_Address: userData.Complete_Address,
            Measurement_Profile: Measurement_Profile,
          },
          { merge: true }
        );

        alert("User data saved successfully!");
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating user data: ", error);
      }
    } else {
      console.error("User is not authenticated");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <div className='bg-[#F3F4F6] min-h-screen'>
      <ClientHeader userName={First_Name || ""} />

      <div className='bg-white mx-72 mt-10 pb-5 rounded-t-xl shadow-lg'>
        <div className='shadow-sm'>
          <p className='px-5 py-3 text-2xl font-semibold'>My Profile</p>
        </div>

        <div>
          <div className='px-7 pt-6 grid grid-cols-3 gap-10'>
            <div className='mb-2'>
              <label className='block mb-1 font-medium'>First Name</label>
              <input
                type='text'
                name='firstName'
                value={userData.First_Name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className='text-[#6F6F6F] border border-gray-300 rounded px-2 py-1'
              />
            </div>
            <div className='mb-2'>
              <label className='block mb-1 font-medium'>Last Name</label>
              <input
                type='text'
                name='lastName'
                value={userData.Last_Name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className='text-[#6F6F6F] border border-gray-300 rounded px-2 py-1'
              />
            </div>
          </div>

          <div className='px-7 pt-5 grid grid-cols-3 gap-10'>
            <div className='mb-2'>
              <label className='block mb-1 font-medium'>Complete Address</label>
              <input
                type='text'
                name='address'
                value={userData.Complete_Address}
                onChange={handleInputChange}
                disabled={!isEditing}
                className='text-[#6F6F6F] border border-gray-300 rounded px-2 py-1'
              />
            </div>
            <div className='mb-2'>
              <label className='block mb-1 font-medium'>Phone</label>
              <input
                type='text'
                name='phone'
                value={userData.Phone_Number}
                onChange={handleInputChange}
                disabled={!isEditing}
                className='text-[#6F6F6F] border border-gray-300 rounded px-2 py-1'
              />
            </div>
          </div>

          <div className='space-x-4'>
            <button
              type='button'
              onClick={() => setIsEditing(!isEditing)}
              className='ml-7 mt-5 bg-[#171B1F] text-white w-20 py-2 rounded'
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            {isEditing && (
              <button
                type='submit'
                className='mt-4 bg-[#10aeb2] text-white w-20 py-2 rounded'
              >
                Save
              </button>
            )}
          </div>

          <div className='px-5 pt-7'>
            <p className='text-xl font-medium'>Measurement Profile</p>
            <p className='ml-2 mt-3 text-lg font-medium'>
              Upper{" "}
              <span className='text-gray-500 font-normal'>
                - Blouse/Dress/Blazer
              </span>
            </p>

            <div className='grid grid-cols-2 ml-2 mt-3'>
              <div className='grid grid-rows-7'>
                <div className='flex pb-2 pr-5 justify-between'>
                  <p>Shoulder</p>
                  <input
                    name='shoulder'
                    value={Measurement_Profile.Shoulder}
                    onChange={handleInputChange}
                    className='text-[#6F6F6F] text-center text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 pr-5 justify-between'>
                  <p>Sleeve</p>
                  <input
                    name='sleeve'
                    value={Measurement_Profile.Sleeve}
                    onChange={handleInputChange}
                    className='text-[#6F6F6F] text-center text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 pr-5 justify-between'>
                  <p>Circumference</p>
                  <input
                    name='circumference'
                    value={Measurement_Profile.Circumference}
                    onChange={handleInputChange}
                    className='text-[#6F6F6F] text-center text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 pr-5 justify-between'>
                  <p>Figure</p>
                  <input
                    name='figure'
                    value={Measurement_Profile.Figure}
                    onChange={handleInputChange}
                    className='text-[#6F6F6F] text-center text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 pr-5 justify-between'>
                  <p>Blouse Length</p>
                  <input
                    name='blouseLength'
                    value={Measurement_Profile.Blouse_Length}
                    onChange={handleInputChange}
                    className='text-[#6F6F6F] text-center text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 pr-5 justify-between'>
                  <p>Dress Length</p>
                  <input
                    name='dressLength'
                    value={Measurement_Profile.Dress_Length}
                    onChange={handleInputChange}
                    className='text-[#6F6F6F] text-center text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 pr-5 justify-between'>
                  <p>Blouse Bust</p>
                  <input
                    name='blouseBust'
                    value={Measurement_Profile.Blouse_Bust}
                    onChange={handleInputChange}
                    className='text-[#6F6F6F] text-center text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>

              <div className='grid grid-rows-7'>
                <div className='flex pb-2 pr-5 justify-between'>
                  <p>Blouse Waist</p>
                  <input
                    name='blouseWaist'
                    value={Measurement_Profile.Blouse_Waist}
                    onChange={handleInputChange}
                    className='text-[#6F6F6F] text-center text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 pr-5 justify-between'>
                  <p>Blouse Hips</p>
                  <input
                    name='blouseHips'
                    value={Measurement_Profile.Blouse_Hips}
                    onChange={handleInputChange}
                    className='text-[#6F6F6F] text-center text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 pr-5 justify-between'>
                  <p>Front Chest</p>
                  <input
                    name='frontChest'
                    value={Measurement_Profile.Front_Chest}
                    onChange={handleInputChange}
                    className='text-[#6F6F6F] text-center text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 pr-5 justify-between'>
                  <p>Back Chest</p>
                  <input
                    name='backChest'
                    value={Measurement_Profile.Back_Chest}
                    onChange={handleInputChange}
                    className='text-[#6F6F6F] text-center text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 pr-5 justify-between'>
                  <p>Bust Point</p>
                  <input
                    name='bustPoint'
                    value={Measurement_Profile.Bust_Point}
                    onChange={handleInputChange}
                    className='text-[#6F6F6F] text-center text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 pr-5 justify-between'>
                  <p>Bust Distance</p>
                  <input
                    name='bustDistance'
                    value={Measurement_Profile.Bust_Distance}
                    onChange={handleInputChange}
                    className='text-[#6F6F6F] text-center text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='px-5 pt-3'>
            <p className='ml-2 text-lg font-medium'>
              Lower{" "}
              <span className='text-gray-500 font-normal'>- Pants/Skirt</span>
            </p>

            <div className='ml-2 grid grid-cols-2 mt-3'>
              <div className='grid grid-rows-5'>
                <div className='flex pb-2 pr-5 justify-between'>
                  <p>Skirt Length</p>
                  <input
                    name='skirtLength'
                    value={Measurement_Profile.Skirt_Length}
                    onChange={handleInputChange}
                    className='text-[#6F6F6F] text-center text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 pr-5 justify-between'>
                  <p>Skirt Waist</p>
                  <input
                    name='skirtWaist'
                    value={Measurement_Profile.Skirt_Waist}
                    onChange={handleInputChange}
                    className='text-[#6F6F6F] text-center text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 pr-5 justify-between'>
                  <p>Skirt Hips</p>
                  <input
                    name='skirtHips'
                    value={Measurement_Profile.Skirt_Hips}
                    onChange={handleInputChange}
                    className='text-[#6F6F6F] text-center text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 pr-5 justify-between'>
                  <p>Crotch</p>
                  <input
                    name='crotch'
                    value={Measurement_Profile.Crotch}
                    onChange={handleInputChange}
                    className='text-[#6F6F6F] text-center text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 pr-5 justify-between'>
                  <p>Pants Length</p>
                  <input
                    name='pantsLength'
                    value={Measurement_Profile.Pants_Length}
                    onChange={handleInputChange}
                    className='text-[#6F6F6F] text-center text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>

              <div className='grid grid-rows-5'>
                <div className='flex pb-2 pr-5 justify-between'>
                  <p>Knee</p>
                  <input
                    name='knee'
                    value={Measurement_Profile.Knee}
                    onChange={handleInputChange}
                    className='text-[#6F6F6F] text-center text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 pr-5 justify-between'>
                  <p>Ankle Flare</p>
                  <input
                    name='ankleFlare'
                    value={Measurement_Profile.Ankle_Flare}
                    onChange={handleInputChange}
                    className='text-[#6F6F6F] text-center text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 pr-5 justify-between'>
                  <p>Polo Length</p>
                  <input
                    name='poloLength'
                    value={Measurement_Profile.Polo_Length}
                    onChange={handleInputChange}
                    className='text-[#6F6F6F] text-center text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 pr-5 justify-between'>
                  <p>Polo Waist</p>
                  <input
                    name='poloWaist'
                    value={Measurement_Profile.Polo_Waist}
                    onChange={handleInputChange}
                    className='text-[#6F6F6F] text-center text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 pr-5 justify-between'>
                  <p>Polo Hips</p>
                  <input
                    name='poloHips'
                    value={Measurement_Profile.Polo_Hips}
                    onChange={handleInputChange}
                    className='text-[#6F6F6F] text-center text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>
            </div>

            <div className='flex justify-end'>
              <button
                type='submit'
                className='mt-4 bg-[#10aeb2] text-white px-6 py-2 rounded'
              >
                Save Measurements
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
