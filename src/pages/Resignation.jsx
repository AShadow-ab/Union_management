// src/pages/ResignationPage.jsx
import { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import { db, storage } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ResignationPage() {
  const [formData, setFormData] = useState({
    name: "",
    matricule: "",
    estate: "",
    date: "",
  });
  const [union, setUnion] = useState("FAWU");
  const letterRef = useRef(null);

  const toggleUnion = () => {
    setUnion((prev) => (prev === "FAWU" ? "CAAWOTU" : "FAWU"));
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.name || !formData.matricule || !formData.date) {
        alert("Please fill all required fields.");
        return;
      }

      const element = letterRef.current;

      const opt = {
        margin: 0.5,
        filename: `resignation_${formData.matricule}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      // Generate PDF
      const pdf = await html2pdf().set(opt).from(element).toPdf().get("pdf");

      const pdfBlob = pdf.output("blob");

      // Upload PDF to Firebase Storage
      const storageRef = ref(storage, `letters/resignation_${formData.matricule}.pdf`);
      await uploadBytes(storageRef, pdfBlob);

      const pdfURL = await getDownloadURL(storageRef);

      // Save form data in Firestore
      await addDoc(collection(db, "letters"), {
        ...formData,
        union,
        pdfURL,
        createdAt: serverTimestamp(),
      });

      alert("Letter submitted successfully!");
      // Reset form
      setFormData({
        name: "",
        matricule: "",
        estate: "",
        date: "",
      });
      setUnion("FAWU");
    } catch (error) {
      console.error("Submit error:", error);
      alert("Error submitting letter — check console.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center py-6 px-4">
      {/* PAPER SHEET */}
      <div
        ref={letterRef}
        className="bg-white w-full max-w-[800px] min-h-[1000px] p-16 shadow-xl text-[18px] leading-9"
      >
        {/* TOP RIGHT INPUTS */}
        <div className="flex justify-end mb-14">
          <div className="flex flex-col gap-2 text-right">
            <input
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="outline-none text-right bg-transparent"
            />
            <input
              placeholder="Matricule"
              value={formData.matricule}
              onChange={(e) => handleChange("matricule", e.target.value)}
              className="outline-none text-right bg-transparent"
            />
            <input
              placeholder="Estate/Section"
              value={formData.estate}
              onChange={(e) => handleChange("estate", e.target.value)}
              className="outline-none text-right bg-transparent"
            />
            <input
              placeholder="Date"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="outline-none text-right bg-transparent"
            />
          </div>
        </div>

        {/* LETTER BODY */}
        <div>
          <p>The President</p>
          <p onClick={toggleUnion} className="cursor-pointer font-semibold w-fit">{union}</p>
          <p>Sir,</p>
          <p className="text-center mt-8 mb-8 font-semibold tracking-wide">RESIGNATION</p>
          <p>
            I wish to forward my resignation letter from your Union from this date of signature. Stop deduction from my wages.
          </p>
        </div>

        {/* SIGNATURE AREA */}
        <div className="flex justify-end mt-28 text-right">
          <div className="flex flex-col gap-2">
            <p>Thanks</p>
            <p>{formData.name || "Your Name"}</p>
          </div>
        </div>
      </div>

      {/* SUBMIT BUTTON OUTSIDE PAPER */}
      <button
        onClick={handleSubmit}
        className="mt-8 bg-blue-600 hover:bg-blue-800 text-white px-8 py-3 rounded-lg transition"
      >
        Submit
      </button>
    </div>
  );
}