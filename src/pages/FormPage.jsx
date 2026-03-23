// src/pages/FormPage.jsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import { db, storage } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";


import leftLogo from "../assets/Fin.jpg";
import cdcLogo from "../assets/cdc.jpg";

export default function FormPage() {
  const navigate = useNavigate();
  const sigRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    idCard: "",
    matricule: "",
    section: "",
    profession: "",
    estate: "",
    contact: "",
    place: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const [signature, setSignature] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const clearSignature = () => {
    sigRef.current.clear();
    setSignature(null);
  };

  const saveSignature = () => {
    if (!sigRef.current.isEmpty()) {
      const dataURL = sigRef.current.getTrimmedCanvas().toDataURL("image/png");
      setSignature(dataURL);
      console.log("signature", dataURL);
      alert("Signature saved!");
    } else {
      alert("Please sign before saving.");
    }
  };

  // 🔥 Only this function changes for Firebase integration
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!signature) {
    alert("Please provide your signature before submitting.");
    return;
  }

  setLoading(true);
  try {
    // 1️⃣ Upload signature to Firebase Storage
    const fileName = `signatures/${formData.matricule}_${Date.now()}.png`;
    const sigRefStorage = ref(storage, fileName);

    // upload the dataURL
    await uploadString(sigRefStorage, signature, "data_url");

    // get the download URL
    const sigURL = await getDownloadURL(sigRefStorage);

    // 2️⃣ Save form + signature URL in Firestore
    await addDoc(collection(db, "forms"), {
      ...formData,
      signatureURL: sigURL,
      createdAt: serverTimestamp(),
    });

    alert("Form submitted successfully!");
    clearSignature();
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
  } catch (err) {
    console.error("Error submitting form:", err);
    alert("Submission failed. Check console for details.");
  } finally {
    setLoading(false);
  }
};

  // 🟢 Everything else below is EXACTLY your original code
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center py-6 px-4">

      {/* SHEET */}
      <div className="bg-white w-full max-w-[800px] border-4 border-gray-800 p-8 shadow-xl">

        {/* HEADER */}
        <div className="border-b pb-4 mb-4">
          <div className="flex justify-between items-center">

            {/* LEFT LOGO */}
            <div className="w-24 h-24 flex items-center justify-center">
              <img
                src={leftLogo}
                alt="Left Logo"
                className="max-h-full object-contain"
              />
            </div>

            {/* CENTER TITLE */}
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-widest">
                FINAAWU
              </h1>
              <p className="text-sm mt-2">
                REG: SD/14/2018 of 22/02/2018
              </p>
              <p className="text-sm">
                EMAIL: finaawu@gmail.com P.O BOX 115 TIKO
              </p>
            </div>

            {/* RIGHT LOGO */}
            <div className="w-24 h-24 flex items-center justify-center">
              <img
                src={cdcLogo}
                alt="CDC Logo"
                className="max-h-full object-contain"
              />
            </div>

          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-lg font-bold text-center mb-4 underline">
          ADHERENCE (CHECK-OFF) DEDUCTION FORM
        </h2>

        <p className="mb-4">
          In conformity with provision of section 21 of the labour code:
        </p>

       {/* NAME */}
<div className="mb-3">
  I,{" "}
  <input
    value={formData.name}
    onChange={(e) => handleChange("name", e.target.value)}
    className="border-b border-black outline-none w-96 mx-2"
  />
</div>

{/* ID CARD */}
<div className="mb-3">
  ID Card No:{" "}
  <input
    value={formData.idCard}
    onChange={(e) => handleChange("idCard", e.target.value)}
    className="border-b border-black outline-none w-60"
  />
</div>

        {/* MATRICULE ROW */}
        <div className="mb-3 flex flex-wrap gap-4">
          <div>
            Mat. No:{" "}
            <input
              value={formData.matricule}
              onChange={(e) => handleChange("matricule", e.target.value)}
              className="border-b border-black outline-none w-32"
            />
          </div>

          <div>
            Section{" "}
            <input
              value={formData.section}
              onChange={(e) => handleChange("section", e.target.value)}
              className="border-b border-black outline-none w-20"
            />
          </div>

          <div>
            Profession{" "}
            <input
              value={formData.profession}
              onChange={(e) => handleChange("profession", e.target.value)}
              className="border-b border-black outline-none w-24"
            />
          </div>
        </div>

        {/* ESTATE + CONTACT */}
        <div className="mb-3 flex flex-wrap gap-4">
          <div>
            Estate/Service{" "}
            <input
              value={formData.estate}
              onChange={(e) => handleChange("estate", e.target.value)}
              className="border-b border-black outline-none w-48"
            />
          </div>

          <div>
            Contact:{" "}
            <input
              value={formData.contact}
              onChange={(e) => handleChange("contact", e.target.value)}
              className="border-b border-black outline-none w-40"
            />
          </div>
        </div>

        <p className="mb-4">
          Here by authorize my employer to deduct from my salary/wages
        </p>

        <p className="mb-4">
          At source 1% of my basic salary/wages representing Trade Union
          Check-Off contribution each month to be paid to the account of
        </p>

        <p className="font-bold underline mb-8">FINAAWU.</p>

        {/* DONE AT */}
        <div className="flex justify-between items-end mb-12">
          <div>
            Done at{" "}
            <input
              value={formData.place}
              onChange={(e) => handleChange("place", e.target.value)}
              className="border-b border-black outline-none w-40"
            />{" "}
            on the{" "}
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="border-b border-black outline-none w-40"
            />
          </div>
        </div>

        {/* SIGNATURE AREA */}
        <div className="flex justify-end items-end mt-16">

          

          {/* SIGNATURE PAD */}
          <div className="text-right">
            <div className="border border-black w-64 h-40 bg-white">
              <SignatureCanvas
                ref={sigRef}
                penColor="black"
                canvasProps={{
                  className: "w-full h-full signature-canvas",
                }}
              />
            </div>

            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={clearSignature}
                className="bg-blue-600 text-white px-3 py-1 text-sm rounded"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={saveSignature}
                className="bg-blue-600 text-white px-3 py-1 text-sm rounded"
              >
                Save
              </button>
            </div>

            <p className="mt-2">Signature of Member</p>
          </div>
        </div>

        <p className="mt-6 text-sm">
          Endorsed by: T. Union Leader
        </p>

      </div>

      {/* SUBMIT BUTTON */}
      <form onSubmit={handleSubmit} className="mt-8">
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition"
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

    </div>
  );
}