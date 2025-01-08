import React, {useState} from 'react'
import StickerClose from '/src/assets/images/StickerClose.png'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router'
import { auth, db } from '../../firebase'
import { doc, getDoc } from 'firebase/firestore'

export default function MainLogin() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            const clientRef = doc(db, "clientUsers", user.uid);
            const employeeRef = doc(db, "employeeUsers", user.uid);
            const adminRef = doc(db, "adminUsers", user.uid);

            const clientDoc = await getDoc(clientRef);
            const employeeDoc = await getDoc(employeeRef);
            const adminDoc = await getDoc(adminRef);

            if (clientDoc.exists()) {
                navigate("/ClientHomepage");
            } else if (employeeDoc.exists()) {
                navigate("/EmployeeHomepage");
            } else if (adminDoc.exists()) {
                navigate("/AdminHomepage");
            } else {
                setError("Invalid email or password");
            }
        } catch (err) {
            if (err.code === 'auth/user-not-found') {
                setError('User not found.');
            } else if (err.code === 'auth/wrong-password') {
                setError('Incorrect email or password.');
            } else {
                setError('Error logging in.');
            }
        }
    };

    return (
        <div className='min-h-screen place-items-center flex justify-center bg-[#20262B]'>
        <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className='grid grid-cols-2 flex justify-between'>
                                    <div className='justify-self-start mb-5 py-2 text-xl font-medium text-gray-900 dark:text-white'>Login to Sewift</div>
                                    <a href='/'>
                                    <button className='flex justify-self-end bg-[#fefefe] rounded-full'>
                                        <img src={StickerClose} className='w-10 p-2 rounded-full hover:bg-[#f6f6f6]' alt="Close" />
                                    </button>
                                    </a>
                                </div>
                    <form class="space-y-5" action="#" onSubmit={handleLogin}>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div class="flex items-start">
                        <a href="#" class="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                    </div>
                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
                        Not registered? <a href="/Signup" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                    </div>
                    </form>
            </div>
        </div>
    )
}