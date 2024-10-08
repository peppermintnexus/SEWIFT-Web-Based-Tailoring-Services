import React, { useState, useEffect } from "react";

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
                    <div className="modal-content relative bg-gray-200 p-4 rounded-md max-w-xl min-w-[300px]">
                        <h2>Measurement Profile</h2>
                        <p className="line-height">
                            Wowowow
                        </p>
                        <button className="close-modal absolute top-2.5 right-2.5 px-2 py-1" onClick={toggleModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
