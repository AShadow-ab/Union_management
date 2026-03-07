// src/pages/FormPage.jsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SignaturePad from "react-signature-pad-wrapper";
import { db, storage } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import leftLogo from "../assets/Fin.jpg";
import cdcLogo from "../assets/cdc.jpg";

export default function FormPage() {
  const navigate = useNavigate();
  const sigRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    matricule: "",
    section: "",
    profession: "",
    estate: "",
    contact: "",
    place: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    if (!formData.matricule) {
      alert("Please enter your Matricule.");
      return;
    }
    if (!sigRef.current || sigRef.current.isEmpty()) {
      alert("Please sign before submitting.");
      return;
    }

    try {
      // 1️⃣ Upload signature PNG
      const sigBlob = await fetch(sigRef.current.toDataURL()).then(r => r.blob());
      const sigStorageRef = ref(storage, `signatures/sig_${formData.matricule}.png`);
      await uploadBytes(sigStorageRef, sigBlob);
      const signatureURL = await getDownloadURL(sigStorageRef);

      // 2️⃣ Save form + signature to Firestore
      await addDoc(collection(db, "forms"), {
        ...formData,
        signatureURL,
        createdAt: serverTimestamp(),
      });

      alert("Form submitted successfully!");

      // Reset form
      setFormData({
        name: "",
        matricule: "",
        section: "",
        profession: "",
        estate: "",
        contact: "",
        place: "",
        date: new Date().toISOString().slice(0, 10),
      });
      sigRef.current.clear();
      navigate("/dashboard");

    } catch (err) {
      console.error("Submit error:", err);
      alert("Error submitting form — check console.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center py-6 px-4">
      {/* FORM SHEET */}
      <div className="bg-white w-full max-w-[800px] border-4 border-gray-800 p-8 shadow-xl">
        {/* HEADER */}
        <div className="border-b pb-4 mb-4 flex justify-between items-center">
          <div className="w-24 h-24 flex items-center justify-center">
            <img src={leftLogo} alt="Left Logo" className="max-h-full object-contain" />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-widest">FINAAWU</h1>
            <p className="text-sm mt-2">REG: SD/14/2018 of 22/02/2018</p>
            <p className="text-sm">EMAIL: finaawu@gmail.com P.O BOX 115 TIKO</p>
          </div>
          <div className="w-24 h-24 flex items-center justify-center">
            <img src={cdcLogo} alt="CDC Logo" className="max-h-full object-contain" />
          </div>
        </div>

        {/* FORM FIELDS */}
        <h2 className="text-lg font-bold text-center mb-4 underline">
          ADHERENCE (CHECK-OFF) DEDUCTION FORM
        </h2>

        <p className="mb-4">In conformity with provision of section 21 of the labour code:</p>

        <div className="mb-3">
          I <input value={formData.name} onChange={(e) => handleChange("name", e.target.value)} className="border-b border-black outline-none w-96 mx-2" />
        </div>

        <div className="mb-3 flex flex-wrap gap-4">
          <div>Mat. No <input value={formData.matricule} onChange={(e) => handleChange("matricule", e.target.value)} className="border-b border-black outline-none w-32" /></div>
          <div>Section <input value={formData.section} onChange={(e) => handleChange("section", e.target.value)} className="border-b border-black outline-none w-20" /></div>
          <div>Profession <input value={formData.profession} onChange={(e) => handleChange("profession", e.target.value)} className="border-b border-black outline-none w-24" /></div>
        </div>

        <div className="mb-3 flex flex-wrap gap-4">
          <div>Estate/Service <input value={formData.estate} onChange={(e) => handleChange("estate", e.target.value)} className="border-b border-black outline-none w-48" /></div>
          <div>Contact <input value={formData.contact} onChange={(e) => handleChange("contact", e.target.value)} className="border-b border-black outline-none w-40" /></div>
        </div>

        <p className="mb-4">Here by authorize my employer to deduct from my salary/wages</p>
        <p className="mb-4">At source 1% of my basic salary/wages representing Trade Union Check-Off contribution each month to be paid to the account of</p>
        <p className="font-bold underline mb-8">FINAAWU.</p>

        <div className="flex justify-between items-end mb-12">
          <div>Done at <input value={formData.place} onChange={(e) => handleChange("place", e.target.value)} className="border-b border-black outline-none w-40" /> on the <input type="date" value={formData.date} onChange={(e) => handleChange("date", e.target.value)} className="border-b border-black outline-none w-40" /></div>
        </div>

        {/* SIGNATURE */}
        <div className="flex justify-between items-end mt-16">
          <div>
            <p className="text-sm italic">Secretary General</p>
            <div className="border border-blue-600 rounded-full w-32 h-32 flex items-center justify-center text-blue-600 text-sm mt-2">FINAAWU</div>
          </div>
          <div className="text-right">
            <div className="border border-black w-64 h-40 bg-white">
              <SignaturePad ref={sigRef} />
            </div>
            <p className="mt-2">Signature of Member</p>
          </div>
        </div>

        <p className="mt-6 text-sm">Endorsed by: T. Union Leader</p>
      </div>

      {/* SUBMIT BUTTON OUTSIDE FORM */}
      <div className="mt-8">
        <button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition">
          Submit
        </button>
      </div>
    </div>
  );
}