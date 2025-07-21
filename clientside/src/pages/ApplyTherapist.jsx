import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const ApplyTherapist = () => {
  const { backendUrl } = useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + "/api/apply-therapist", {
        name,
        email,
        phone,
        speciality,
        degree,
        experience,
        about,
        fees: Number(fees),
        address: { line1: address1, line2: address2 },
      });
      if (data.success) {
        toast.success(data.message);
        setName("");
        setEmail("");
        setPhone("");
        setDegree("");
        setExperience("1 Year");
        setFees("");
        setAbout("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 flex justify-center">
      <div className="bg-white px-8 py-8 border rounded w-full max-w-xl flex flex-col gap-4 text-sm text-gray-600">
        <h1 className="text-lg font-medium">Therapist Application</h1>
        <input
          className="border rounded px-3 py-2"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border rounded px-3 py-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border rounded px-3 py-2"
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2"
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
        >
          <option value="General physician">General physician</option>
          <option value="Gynecologist">Gynecologist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Pediatricians">Pediatricians</option>
          <option value="Neurologist">Neurologist</option>
          <option value="Gastroenterologist">Gastroenterologist</option>
        </select>
        <input
          className="border rounded px-3 py-2"
          type="text"
          placeholder="Education"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          required
        />
        <select
          className="border rounded px-3 py-2"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        >
          <option value="1 Year">1 Year</option>
          <option value="2 Year">2 Year</option>
          <option value="3 Year">3 Year</option>
          <option value="4 Year">4 Year</option>
          <option value="5 Year">5 Year</option>
          <option value="6 Year">6 Year</option>
          <option value="7 Year">7 Year</option>
          <option value="8 Year">8 Year</option>
          <option value="9 Year">9 Year</option>
          <option value="10 Year">10 Year</option>
        </select>
        <input
          className="border rounded px-3 py-2"
          type="number"
          placeholder="Consultation Fees"
          value={fees}
          onChange={(e) => setFees(e.target.value)}
        />
        <textarea
          className="border rounded px-3 py-2"
          placeholder="About"
          rows={4}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <input
          className="border rounded px-3 py-2"
          type="text"
          placeholder="Address line 1"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
        />
        <input
          className="border rounded px-3 py-2"
          type="text"
          placeholder="Address line 2"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
        />
        <button type="submit" className="bg-primary text-white px-6 py-2 rounded">
          Submit Application
        </button>
      </div>
    </form>
  );
};

export default ApplyTherapist;
