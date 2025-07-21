import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const TherapistApplications = () => {
  const {
    aToken,
    therapistApplications,
    getTherapistApplications,
    updateTherapistApplication,
  } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getTherapistApplications();
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium mb-3">Therapist Applications</h1>
      <div className="flex flex-col gap-4">
        {therapistApplications.map((item) => (
          <div
            key={item._id}
            className="bg-white border rounded p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">{item.email}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => updateTherapistApplication(item._id, true)}
                className="px-4 py-1 bg-green-500 text-white rounded"
              >
                Approve
              </button>
              <button
                onClick={() => updateTherapistApplication(item._id, false)}
                className="px-4 py-1 bg-red-500 text-white rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TherapistApplications;
