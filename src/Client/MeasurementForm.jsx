import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, getIdToken } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Header from "/src/components/Header.jsx";
import { db } from "../firebase";

export default function ClientLogin() {
  const [measurements, setMeasurements] = useState({
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
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userToken = await getIdToken(user);
          setToken(userToken);

          const userDocRef = doc(db, "Client", user.uid); // Updated to 'Client' collection
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const userProfile = docSnap.data();
            if (userProfile.Measurement_Profile) {
              setMeasurements(userProfile.Measurement_Profile); // Updated to match Firestore structure
            }
          }
        } else {
          console.log("User is not signed in");
        }
      });
    };

    fetchUserData();
  }, [auth]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMeasurements((prevMeasurements) => ({
      ...prevMeasurements,
      [name]: value,
    }));
  };

  const handleAddLater = () => {
    navigate("/ClientHomepage");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = auth.currentUser.uid;
      const userDocRef = doc(db, "Client", userId); // Updated to 'Client' collection
      await setDoc(
        userDocRef,
        { Measurement_Profile: measurements }, // Updated to nest under 'Measurement_Profile'
        { merge: true }
      );
      alert("Measurement profile updated successfully");
      navigate("/ClientHomepage");
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Failed to save measurements. Please try again.");
    }

    console.log("Measurements submitted:", measurements);
  };

  return (
    <div className='bg-[#10aeb2] min-h-screen'>
      <div className='pt-20'>
        <div className='bg-[#fefefe] rounded-lg mx-40 '>
          <h1 className='text-3xl font-semibold pt-4 pb-5 text-[#171B1F] text-center'>
            Measurement Profile
          </h1>

          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-3 mx-12 gap-14'>
              {/* First Column */}
              <div className='grid grid-rows-9'>
                <div className='flex pb-2 justify-between'>
                  <p>Shoulder</p>
                  <input
                    name='Shoulder'
                    value={measurements.Shoulder}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 justify-between'>
                  <p>Sleeve</p>
                  <input
                    name='Sleeve'
                    value={measurements.Sleeve}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 justify-between'>
                  <p>Circumference</p>
                  <input
                    name='Circumference'
                    value={measurements.Circumference}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 justify-between'>
                  <p>Figure</p>
                  <input
                    name='Figure'
                    value={measurements.Figure}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 justify-between'>
                  <p>Blouse Length</p>
                  <input
                    name='Blouse_Length'
                    value={measurements.Blouse_Length}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 justify-between'>
                  <p>Dress Length</p>
                  <input
                    name='Dress_Length'
                    value={measurements.Dress_Length}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 justify-between'>
                  <p>Blouse Bust</p>
                  <input
                    name='Blouse_Bust'
                    value={measurements.Blouse_Bust}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 justify-between'>
                  <p>Blouse Waist</p>
                  <input
                    name='Blouse_Waist'
                    value={measurements.Blouse_Waist}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 justify-between'>
                  <p>Blouse Hips</p>
                  <input
                    name='Blouse_Hips'
                    value={measurements.Blouse_Hips}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>

              {/* Second Column */}
              <div className='grid grid-rows-9'>
                <div className='flex pb-2 justify-between'>
                  <p>Front Chest</p>
                  <input
                    name='Front_Chest'
                    value={measurements.Front_Chest}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 justify-between'>
                  <p>Back Chest</p>
                  <input
                    name='Back_Chest'
                    value={measurements.Back_Chest}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 justify-between'>
                  <p>Bust Point</p>
                  <input
                    name='Bust_Point'
                    value={measurements.Bust_Point}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 justify-between'>
                  <p>Bust Distance</p>
                  <input
                    name='Bust_Distance'
                    value={measurements.Bust_Distance}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 justify-between'>
                  <p>Skirt Length</p>
                  <input
                    name='Skirt_Length'
                    value={measurements.Skirt_Length}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 justify-between'>
                  <p>Skirt Waist</p>
                  <input
                    name='Skirt_Waist'
                    value={measurements.Skirt_Waist}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 justify-between'>
                  <p>Skirt Hips</p>
                  <input
                    name='Skirt_Hips'
                    value={measurements.Skirt_Hips}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 justify-between'>
                  <p>Crotch</p>
                  <input
                    name='Crotch'
                    value={measurements.Crotch}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 justify-between'>
                  <p>Pants Length</p>
                  <input
                    name='Pants_Length'
                    value={measurements.Pants_Length}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>

              {/* Third Column */}
              <div className='grid grid-rows-9'>
                <div className='flex pb-2 justify-between'>
                  <p>Pants Waist</p>
                  <input
                    name='Pants_Waist'
                    value={measurements.Pants_Waist}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 justify-between'>
                  <p>Pants Hips</p>
                  <input
                    name='Pants_Hips'
                    value={measurements.Pants_Hips}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 justify-between'>
                  <p>Thigh</p>
                  <input
                    name='Thigh'
                    value={measurements.Thigh}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 justify-between'>
                  <p>Knee</p>
                  <input
                    name='Knee'
                    value={measurements.Knee}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 justify-between'>
                  <p>Ankle Flare</p>
                  <input
                    name='Ankle_Flare'
                    value={measurements.Ankle_Flare}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 justify-between'>
                  <p>Polo Length</p>
                  <input
                    name='Polo_Length'
                    value={measurements.Polo_Length}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 justify-between'>
                  <p>Polo Waist</p>
                  <input
                    name='Polo_Waist'
                    value={measurements.Polo_Waist}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex pb-2 justify-between'>
                  <p>Polo Hips</p>
                  <input
                    name='Polo_Hips'
                    value={measurements.Polo_Hips}
                    onChange={handleChange}
                    className='w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>
            </div>
            <div>
              <div className='mt-7 pb-4 flex justify-center items-center'>
                <button
                  type='submit'
                  className='mx-3 text-center font-semibold rounded-lg px-3 py-1 text-[#fefefe] bg-[#171B1F] hover:text-[#fefefe]'
                >
                  Submit
                </button>
                <button
                  type='button'
                  onClick={handleAddLater}
                  className='mx-3 text-center font-semibold rounded-lg px-3 py-1 text-[#fefefe] bg-[#171B1F] hover:text-[#fefefe]'
                >
                  Add Later
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
