import React, { useState } from "react";
import SchoolBlouse from '/src/assets/images/SchoolBlouse.jpg'


export default function OrderForm() {
    return ( 
        <div className="bg-[#20262B] min-h-screen">
        <div className="grid grid-cols-2">
            <div className="bg-white">
                <img src={SchoolBlouse} className="w-96" />
                <label>Product Name</label>
            </div>
            <div>

            </div>
        </div>
        </div>
    );
}
