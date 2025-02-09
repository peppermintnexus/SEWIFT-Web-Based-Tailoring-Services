import React, { useEffect, useState } from "react";
import ClientHeader from "/src/components/ClientHeader.jsx";
import SchoolBlouse from "/src/assets/images/SchoolBlouse.jpg";
import { useNavigate } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  getDocs,
  collection,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

export default function ClientOrder() {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get client user details from the "Client" collection.
        const userDoc = await getDoc(doc(db, "Client", user.uid));
        if (userDoc.exists()) {
          // Assuming the field is stored as First_Name (snake case with capital letters)
          setFirstName(userDoc.data().First_Name || "Client");
        }
        setUser(user);

        // Fetch orders from the subcollection "Orders" under the current Client document.
        const ordersRef = collection(db, "Client", user.uid, "Orders");
        const ordersSnapshot = await getDocs(ordersRef);
        const fetchedOrders = [];
        ordersSnapshot.forEach((orderDoc) => {
          fetchedOrders.push({
            id: orderDoc.id,
            ...orderDoc.data(),
          });
        });
        setOrders(fetchedOrders);
      } else {
        navigate("/ClientLogin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Cancel order: Delete the order document from the client's Orders subcollection.
  const handleCancel = async (orderId) => {
    try {
      await deleteDoc(doc(db, "Client", user.uid, "Orders", orderId));
      // Remove the cancelled order from the local state.
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Error cancelling order. Please try again.");
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className='min-h-screen mb-6 bg-[#fefefe]'>
      <ClientHeader username={firstName || "Client"} />

      <h1 className='mx-7 my-6 text-4xl font-medium'>Order Progress</h1>
      <div className='mx-7 space-y-4'>
        {orders.map((order, index) => (
          <div
            key={order.id}
            className='flex items-center justify-between p-5 border shadow'
          >
            <div className='flex items-center'>
              <img
                src={SchoolBlouse}
                className='object-cover w-40 h-40'
                alt='School Blouse'
              />
              <div className='pl-7'>
                <label className='block text-xl font-medium'>
                  {order.Product_Name || "Unnamed Product"}
                </label>
                <label className='block text-[#7f7f7f]'>
                  Job Order Number: JO{index + 1}
                </label>
                <label className='block text-[#7f7f7f]'>
                  Status: {order.Status || "Pending"}
                </label>
                <label className='block text-[#7f7f7f]'>
                  Date Ordered:{" "}
                  {order.Created_At?.toDate().toLocaleDateString() || "N/A"}
                </label>
                <label className='block text-[#7f7f7f]'>
                  Date Progress: {order.Date_Progress || "N/A"}
                </label>
              </div>
            </div>
            <div>
              <button
                onClick={() => handleCancel(order.id)}
                className='px-5 py-2 bg-red-500 text-white rounded-lg mr-5 shadow'
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
