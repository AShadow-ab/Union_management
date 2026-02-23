// src/pages/ResignationPage.jsx
import { useState } from "react";

export default function ResignationPage() {
  const [formData, setFormData] = useState({
    name: "",
    matricule: "",
    estate: "",
    date: "",
  });

  const [union, setUnion] = useState("FAWU");

  const toggleUnion = () => {
    setUnion((prev) => (prev === "FAWU" ? "CAWOTU" : "FAWU"));
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Letter ready for PDF generation");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center py-10">

      {/* PAPER SHEET */}
      <div className="bg-white w-[800px] min-h-[1000px] p-16 shadow-xl text-[18px] leading-9">

        {/* TOP RIGHT INPUT SECTION (NO UNDERLINES) */}
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

          <p
            onClick={toggleUnion}
            className="cursor-pointer font-semibold w-fit"
          >
            {union}
          </p>

          <p>Sir,</p>

          <p className="text-center mt-8 mb-8 font-semibold tracking-wide">
            RESIGNATION
          </p>

          <p>
            I wish to forward my resignation letter from your Union from this
            date of signature. Stop deduction from my wages.
          </p>

        </div>

        {/* BOTTOM RIGHT SIGNATURE AREA */}
        <div className="flex justify-end mt-28 text-right">

          <div className="flex flex-col gap-2">

            <p>Thanks</p>

            <p>{formData.name || "Your Name"}</p>

            

          </div>

        </div>

      </div>

      {/* SUBMIT BUTTON OUTSIDE PAPER */}
      <form onSubmit={handleSubmit} className="mt-8">
        <button className="bg-blue-600 hover:bg-blue-800 text-white px-8 py-3 rounded-lg transition">
          Submit
        </button>
      </form>

    </div>
  );
}