import React, { useEffect, useState } from 'react';
import ClientHeader from '/src/components/ClientHeader.jsx';
import SchoolBlouse from '/src/assets/images/SchoolBlouse.jpg';
import { useNavigate } from 'react-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function ClientOrder() {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Get client user details
                const userDoc = await getDoc(doc(db, 'clientUsers', user.uid));
                if (userDoc.exists()) {
                    setFirstName(userDoc.data().firstName);
                }

                setUser(user);

                // Fetch all admin users
                const adminUsersSnapshot = await getDocs(collection(db, 'adminUsers'));
                const userOrders = [];

                // Check orders subcollection in each adminUser
                for (const adminUserDoc of adminUsersSnapshot.docs) {
                    const ordersRef = collection(db, 'adminUsers', adminUserDoc.id, 'orders');
                    const ordersSnapshot = await getDocs(ordersRef);

                    ordersSnapshot.forEach((orderDoc) => {
                        const orderData = orderDoc.data();
                        if (orderData.client?.uid === user.uid) {
                            userOrders.push({
                                id: orderDoc.id,
                                ...orderData,
                                adminUserId: adminUserDoc.id,
                            });
                        }
                    });
                }

                setOrders(userOrders);
            } else {
                navigate('/ClientLogin');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    if (!user) {
        return <p>Loading...</p>;
    }
    return (
        <div className='min-h-screen bg-[#fefefe]'>
            <ClientHeader username={firstName || 'Client'} />

            <h1 className='mx-7 my-6 text-4xl font-medium'>Order Progress</h1>
            {orders.map((order, index) => (
                    <div key={order.id} className='flex items-center justify-between p-5 border shadow'>
                        <div className='flex items-center'>
                            <img src={SchoolBlouse} className='object-cover w-40 h-40' alt="School Blouse" />
                            <div className='pl-7'>
                                <label className='block text-xl font-medium'>{order.product?.name || 'Unnamed Product'}</label>
                                <label className='block text-[#7f7f7f]'>Job Order Number: JO{index + 1}</label>
                                <label className='block text-[#7f7f7f]'>Status: {order.status || 'Pending'}</label>
                                <label className='block text-[#7f7f7f]'>
                                    Date Ordered: {order.createdAt?.toDate().toLocaleDateString() || 'N/A'}
                                </label>
                                <label className='block text-[#7f7f7f]'>Date Progress: {order.dateProgress || 'N/A'}</label>
                            </div>
                        </div>
                        <div>
                            <button className='px-5 py-2 bg-[#10aeb2] text-white rounded-lg mr-5 shadow'>
                                {order.status || 'Update Status'}
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    )
}