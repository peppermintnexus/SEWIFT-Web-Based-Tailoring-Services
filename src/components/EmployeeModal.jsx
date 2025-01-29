import React from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeModal({ employee, index }) {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`/EditEmployee/${index}`);
    };

    return (
        <tr
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
            onClick={handleEditClick}
        >
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {employee.name}
            </th>
            <td className="px-6 py-4">
                {employee.email}
            </td>
            <td className="px-6 py-4">
                {employee.phoneNumber}
            </td>
        </tr>
    );
}