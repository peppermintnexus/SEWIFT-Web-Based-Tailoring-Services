import React, { useState, useEffect } from "react";
import Textbox from '/src/components/Textbox.jsx'
import DropdownQuantity from '/src/components/DropdownQuantity.jsx'

export default function OrderModal() {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    useEffect(() => {
        if (modal) {
            document.body.classList.add('active-modal');
        } else {
            document.body.classList.remove('active-modal');
        }
    }, [modal]);

    return (
        <div>
            <button
                onClick={toggleModal}
                className="btn-modal block mx-auto mt-24">
                Create Order
            </button>

            {modal && (
                <div className="modal fixed inset-0 flex items-center justify-center">
                    {/* Overlay */}
                    <div onClick={toggleModal} className="overlay fixed inset-0 w-full h-full bg-[rgba(49,49,49,0.8)]"></div>

                    {/* Modal Content */}
                    <div className="modal-content relative bg-gray-200 p-3 rounded-md max-w-xl min-w-[300px]">
                            <div className="grid grid-cols-2">
                                <div className="place-self-center">
                                    Image Guide
                                </div>
                                <div className="grid grid-rows-4">
                                    <h1 className="text-2xl font-semibold">Name sa Product</h1>
                                    <div>
                                        <p>Apparel: Blouse</p>
                                        <p>Dropdown quantity</p>
                                    </div>
                                    <div>
                                        <h1 className="font-semibold">Measurement</h1>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <p>Shoulder</p>
                                                <Textbox />
                                                <p>Circumference</p>
                                                <Textbox />
                                            </div>
                                            <div>
                                                <p>Sleeve</p>
                                                <Textbox />
                                                <p>Figure</p>
                                                <Textbox />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <DropdownQuantity />
                                        <p>diri tung remarks</p>
                                    </div>
                                </div>
                            </div>
                            <button className="close-modal absolute top-2.5 right-2.5 px-2 py-1" onClick={toggleModal}>
                            Cancel
                        </button> 
                    </div>
                </div>
            )}
        </div>
    );
}
