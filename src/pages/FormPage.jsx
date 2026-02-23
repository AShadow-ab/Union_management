// src/pages/FormPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    matricule: "",
    section: "",
    profession: "",
    estate: "",
    contact: "",
    place: "",
    date: "",
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form Ready for PDF Generation");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center py-10">

      {/* SHEET */}
      <div className="bg-white w-[800px] border-4 border-gray-800 p-8 shadow-xl">

        {/* HEADER */}
        <div className="border-b pb-4 mb-4">

  <div className="flex justify-between items-center">

    {/* LEFT LOGO PLACEHOLDER */}
    <div className="w-24 h-24 border border-gray-400 flex items-center justify-center text-xs text-gray-500">
      LEFT LOGO
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
        EMAIL: finaawu@gamil.com P.O BOX 115 TIKO
      </p>
    </div>

    {/* RIGHT LOGO PLACEHOLDER */}
    <div className="w-24 h-24 border border-gray-400 flex items-center justify-center text-xs text-gray-500">
      CDC LOGO
    </div>

  </div>

</div>

        {/* TITLE */}
        <h2 className="text-lg font-bold text-center mb-4 underline">
          ADHERENCE (CHECK-OFF) DEDUCTION FORM
        </h2>

        {/* BODY TEXT */}
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

        {/* AUTHORIZATION TEXT */}
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
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="border-b border-black outline-none w-32"
            />
          </div>
        </div>

        {/* SIGNATURE AREA */}
        <div className="flex justify-between items-end mt-16">
          <div>
            <p className="text-sm italic">Secretary General</p>
            <div className="border border-blue-600 rounded-full w-32 h-32 flex items-center justify-center text-blue-600 text-sm mt-2">
              FINAAWU
            </div>
          </div>

          <div className="text-right">
            <div className="border-b border-black w-48 mb-2"></div>
            <p>Signature of Member</p>
          </div>
        </div>

        <p className="mt-6 text-sm">
          Endorsed by: T. Union Leader
        </p>

      </div>

      {/* SUBMIT BUTTON (OUTSIDE SHEET) */}
      <form onSubmit={handleSubmit} className="mt-8">
        <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition">
          Submit
        </button>
      </form>

    </div>
  );
}