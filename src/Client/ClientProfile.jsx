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
    Pants_Waist: "",
    Pants_Hips: "",
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
              First_Name:
                userProfile.First_Name || user.displayName?.split(" ")[0] || "",
              Last_Name:
                userProfile.Last_Name ||
                user.displayName?.split(" ").slice(1).join(" ") ||
                "",
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
      <ClientHeader userName={userData.First_Name || ""} />

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='max-w-4xl mx-auto space-y-8'>
          <div className='bg-white rounded-lg shadow'>
            <div className='px-6 py-5 border-b border-gray-200'>
              <h1 className='text-2xl font-semibold text-gray-900'>
                My Profile
              </h1>
            </div>

            <div className='p-6 space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    First Name
                  </label>
                  <input
                    type='text'
                    name='firstName'
                    value={userData.First_Name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    name='lastName'
                    value={userData.Last_Name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                  />
                </div>
              </div>

              <div className='flex justify-end'>
                <button
                  type='button'
                  onClick={() => setIsEditing(!isEditing)}
                  className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700'
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
                {isEditing && (
                  <button
                    type='submit'
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm ml-3 px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700'
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow'>
            <div className='px-6 py-5 border-b border-gray-200'>
              <h1 className='text-2xl font-semibold text-gray-900'>
                Measurements
              </h1>
            </div>

            <div className='px-9 py-6 space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-20'>
                <div>
                  <h1 className='bg-[#e0ecf9] pl-2 py-1 text-xl font-semibold mb-4'>
                    Torso
                  </h1>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='grid grid-rows-7'>
                      <div>
                        <label className='block text-sm font-medium text-[#7f7f7f] mb-2'>
                          Shoulder
                        </label>
                        <input
                          name='shoulder'
                          value={Measurement_Profile.Shoulder}
                          onChange={handleInputChange}
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mt-1 mb-2'>
                          Circumference
                        </label>
                        <input
                          name='circumference'
                          value={Measurement_Profile.Circumference}
                          onChange={handleInputChange}
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mt-1 mb-2'>
                          Blouse Length
                        </label>
                        <input
                          name='blouseLength'
                          value={Measurement_Profile.Blouse_Length}
                          onChange={handleInputChange}
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mt-1 mb-2'>
                          Bust
                        </label>
                        <input
                          name='blouseBust'
                          value={Measurement_Profile.Blouse_Bust}
                          onChange={handleInputChange}
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mt-1 mb-2'>
                          Hips
                        </label>
                        <input
                          name='blouseHips'
                          value={Measurement_Profile.Blouse_Hips}
                          onChange={handleInputChange}
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mt-1 mb-2'>
                          Back Chest
                        </label>
                        <input
                          name='backChest'
                          value={Measurement_Profile.Back_Chest}
                          onChange={handleInputChange}
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mt-1 mb-2'>
                          Bust Distance
                        </label>
                        <input
                          name='bustDistance'
                          value={Measurement_Profile.Bust_Distance}
                          onChange={handleInputChange}
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                    </div>
                    <div className='grid grid-rows-7'>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mb-2'>
                          Sleeve
                        </label>
                        <input
                          name='sleeve'
                          value={Measurement_Profile.Sleeve}
                          onChange={handleInputChange}
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mt-1 mb-2'>
                          Figure
                        </label>
                        <input
                          name='figure'
                          value={Measurement_Profile.Figure}
                          onChange={handleInputChange}
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mt-1 mb-2'>
                          Dress Length
                        </label>
                        <input
                          name='dressLength'
                          value={Measurement_Profile.Dress_Length}
                          onChange={handleInputChange}
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mt-1 mb-2'>
                          Waist
                        </label>
                        <input
                          name='blouseWaist'
                          value={Measurement_Profile.Blouse_Waist}
                          onChange={handleInputChange}
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mt-1 mb-2'>
                          Front Chest
                        </label>
                        <input
                          name='frontChest'
                          value={Measurement_Profile.Front_Chest}
                          onChange={handleInputChange}
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mt-1 mb-2'>
                          Bust Point
                        </label>
                        <input
                          name='bustPoint'
                          value={Measurement_Profile.Bust_Point}
                          onChange={handleInputChange}
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                    </div>
                  </div>
                  <h1 className='bg-[#e0ecf9] pl-2 py-1 text-xl font-semibold mt-4 mb-4'>
                    Polo
                  </h1>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='grid grid-rows-4'>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mb-2'>
                          Shoulder
                        </label>
                        <input
                          type='email'
                          id='email'
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mt-1 mb-2'>
                          Circumeference
                        </label>
                        <input
                          type='email'
                          id='email'
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mt-1 mb-2'>
                          Waist
                        </label>
                        <input
                          name='poloWaist'
                          value={Measurement_Profile.Polo_Waist}
                          onChange={handleInputChange}
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mt-1 mb-2'>
                          Collar
                        </label>
                        <input
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                    </div>
                    <div className='grid grid-rows-4'>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mb-2'>
                          Sleeve
                        </label>
                        <input
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mb-2'>
                          Length
                        </label>
                        <input
                          name='poloLength'
                          value={Measurement_Profile.Polo_Length}
                          onChange={handleInputChange}
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-[#777777] mb-2'>
                          Hips
                        </label>
                        <input
                          name='poloHips'
                          value={Measurement_Profile.Polo_Hips}
                          onChange={handleInputChange}
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h1 className='bg-[#e0ecf9] pl-2 py-1 text-xl font-semibold mb-4'>
                    Skirt
                  </h1>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='grid grid-rows-2'>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mb-2'>
                          Length
                        </label>
                        <input
                          name='skirtLength'
                          value={Measurement_Profile.Skirt_Length}
                          onChange={handleInputChange}
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mt-1 mb-2'>
                          Hips
                        </label>
                        <input
                          name='skirtHips'
                          value={Measurement_Profile.Skirt_Hips}
                          onChange={handleInputChange}
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-[#777777] mb-2'>
                        Waist
                      </label>
                      <input
                        name='skirtWaist'
                        value={Measurement_Profile.Skirt_Waist}
                        onChange={handleInputChange}
                        className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                        placeholder='cm'
                      />
                    </div>
                  </div>

                  <h1 className='bg-[#e0ecf9] px-2 py-1 text-xl font-semibold mt-8 mb-1.5'>
                    Pants
                  </h1>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='grid grid-rows-4'>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mt-1 mb-2'>
                          Crotch
                        </label>
                        <input
                          name='crotch'
                          value={Measurement_Profile.Crotch}
                          onChange={handleInputChange}
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mt-1 mb-2'>
                          Waist
                        </label>
                        <input
                          name='pantsWaist'
                          value={Measurement_Profile.Pants_Waist}
                          onChange={handleInputChange}
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mt-1 mb-2'>
                          Thigh
                        </label>
                        <input
                          name='Thigh'
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mt-1 mb-2'>
                          Ankle Flare
                        </label>
                        <input
                          name='ankleFlare'
                          value={Measurement_Profile.Ankle_Flare}
                          onChange={handleInputChange}
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                    </div>
                    <div className='grid grid-rows-4'>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mt-1 mb-2'>
                          Length
                        </label>
                        <input
                          name='pantsLength'
                          value={Measurement_Profile.Pants_Length}
                          onChange={handleInputChange}
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mt-1 mb-2'>
                          Hips
                        </label>
                        <input
                          name='pantsHips'
                          value={Measurement_Profile.Pants_Hips}
                          onChange={handleInputChange}
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-[#777777] mt-1 mb-2'>
                          Knee
                        </label>
                        <input
                          name='knee'
                          value={Measurement_Profile.Knee}
                          onChange={handleInputChange}
                          className='text-center w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                          placeholder='cm'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex justify-end'>
                <button
                  type='submit'
                  className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700'
                >
                  Save Measurement
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
