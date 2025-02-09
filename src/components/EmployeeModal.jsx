import React from "react";

export default function EmployeeModal({ employee }) {
  return (
    <tr className='bg-white '>
      <td className='px-6 py-4'>{employee.Name}</td>
      <td className='px-6 py-4'>{employee.Email_Address}</td>
      <td className='px-6 py-4'>{employee.Phone_Number}</td>
    </tr>
  );
}
