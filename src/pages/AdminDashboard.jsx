// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import html2pdf from "html2pdf.js";
import HomeButton from "../components/HomeButton";

// Logos
import formLeftLogo from "../assets/Fin.jpg";
import formRightLogo from "../assets/cdc.jpg";
import otherFormLogo from "../assets/Fin.jpg";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("forms");
  const [forms, setForms] = useState([]);
  const [otherForms, setOtherForms] = useState([]);
  const [letters, setLetters] = useState([]);
  const [estateFilter, setEstateFilter] = useState("");

  const storage = getStorage();

  // Fetch forms, otherForms
  useEffect(() => {
    const unsubForms = onSnapshot(collection(db, "forms"), snap => setForms(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    const unsubOtherForms = onSnapshot(collection(db, "otherforms"), snap => setOtherForms(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

    // Fetch letters from Storage
    const lettersRef = ref(storage, "letters/");
    listAll(lettersRef).then(async res => {
      const lettersData = await Promise.all(
        res.items.map(async itemRef => {
          const url = await getDownloadURL(itemRef);

          // Clean display name (strip extension)
          let name = itemRef.name.replace(/\.[^/.]+$/, "");
          // Replace underscores with spaces for readability
          name = name.replace(/_/g, " ");
          return { name, url };
        })
      );
      setLetters(lettersData);
    });

    return () => {
      unsubForms();
      unsubOtherForms();
    };
  }, []);

  const filteredForms = estateFilter
    ? forms.filter(f => f.estate?.toLowerCase().includes(estateFilter.toLowerCase()))
    : forms;

  const filteredOtherForms = estateFilter
    ? otherForms.filter(f => f.estate?.toLowerCase().includes(estateFilter.toLowerCase()))
    : otherForms;

  const generatePDF = async (data, type = "forms") => {
  const element = document.createElement("div");
  element.style.width = "794px";
  element.style.padding = "40px";
  element.style.background = "white";
  element.style.fontFamily = "Times New Roman, serif";
  element.style.lineHeight = "1.7";
  element.style.fontSize = "18px";

  const signatureURL = data.signatureURL || "";

  // Logos
  const leftLogo = type === "forms" ? formLeftLogo : otherFormLogo;
  const rightLogo = type === "forms" ? formRightLogo : otherFormLogo;

  // Keep title the same for both
  const titleText = "ADHERENCE (CHECK-OFF) DEDUCTION FORM";

  element.innerHTML = `
    <div style="border:4px solid black; padding:30px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px;">
        <img src="${leftLogo}" style="height:80px; object-fit:contain;" />
        <div style="text-align:center;">
          <h1 style="margin:0; font-size:44px; letter-spacing:3px;">FINAAWU</h1>
          <p style="margin:4px 0;">REG: SD/14/2018 of 22/02/2018</p>
          <p style="margin:4px 0;">EMAIL: finaawu@gmail.com • P.O BOX 115 TIKO</p>
        </div>
        <img src="${rightLogo}" style="height:80px; object-fit:contain;" />
      </div>

      <h2 style="text-align:center; text-decoration:underline; font-weight:bold; margin-bottom:20px;">
        ${titleText}
      </h2>

      <p>In conformity with provision of section 21 of the labour code:</p>
      <p>I, <strong>${data.name}</strong></p>
      <p>ID Card No: <strong>${data.idCard || ""}</strong></p>
      <p>Matricule No: <strong>${data.matricule}</strong> | Section: <strong>${data.section}</strong> | Profession: <strong>${data.profession}</strong></p>
      <p>Estate / Service: <strong>${data.estate}</strong> | Contact: <strong>${data.contact}</strong></p>

      <p>Hereby authorize my employer to deduct from my salary/wages 1% of my basic salary/wages representing Trade Union Check-Off contribution each month to be paid to the account of <strong>FINAAWU</strong>.</p>

      <p style="margin-top:20px;">Done at <strong>${data.place}</strong> on <strong>${data.date}</strong></p>

      <div style="display:flex; justify-content:flex-end; margin-top:50px;">
        <div style="text-align:center;">
          ${signatureURL ? `<img src="${signatureURL}" style="width:240px;height:120px; object-fit:contain;"/>` : ""}
          <p>Signature of Member</p>
        </div>
      </div>

      <p style="margin-top:30px;">Endorsed by: T. Union Leader</p>
    </div>
  `;

  html2pdf()
    .from(element)
    .set({ margin: 5, filename: `${data.name}_form.pdf`, html2canvas: { scale: 3 }, jsPDF: { format: "a4" } })
    .save();
};
  const deleteForm = async (id, type) => {
    if (!window.confirm("Delete this form?")) return;
    await deleteDoc(doc(db, type, id));
  };

  // Determine what to display
  let displayData = [];
  if (activeTab === "forms") displayData = filteredForms;
  else if (activeTab === "otherForms") displayData = filteredOtherForms;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <HomeButton />
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["forms", "otherForms", "letters"].map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${activeTab === tab ? "bg-green-600 text-white" : "bg-white"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "forms" ? "Forms" : tab === "otherForms" ? "Other Forms" : "Letters"}
          </button>
        ))}
      </div>

      {/* Filter */}
      {activeTab !== "letters" && (
        <input
          placeholder="Filter by estate..."
          className="border p-2 rounded mb-6 w-60"
          onChange={e => setEstateFilter(e.target.value)}
        />
      )}

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === "letters"
          ? letters.map(letter => (
              <div key={letter.url} className="bg-white p-4 shadow rounded">
                <p className="font-bold">{letter.name}</p>
                <div className="flex gap-2 mt-2">
                  <a href={letter.url} target="_blank" className="bg-blue-600 text-white px-3 py-1 rounded text-sm">View Letter</a>
                  <a href={letter.url} download className="bg-green-600 text-white px-3 py-1 rounded text-sm">Download Letter</a>
                </div>
              </div>
            ))
          : displayData.map(item => (
              <div key={item.id} className="bg-white p-5 shadow-md rounded-xl border">
                <h2 className="font-bold text-lg mb-2">{item.name} {activeTab === "otherForms" ? "(Other)" : ""}</h2>
                <div className="text-sm space-y-1">
                  <p><b>ID Card:</b> {item.idCard}</p>
                  <p><b>Matricule:</b> {item.matricule}</p>
                  <p><b>Estate:</b> {item.estate}</p>
                  <p><b>Contact:</b> {item.contact}</p>
                </div>

                {item.signatureURL && (
                  <img src={item.signatureURL} className="h-20 mt-3 border rounded" />
                )}

                <div className="flex gap-2 mt-4 flex-wrap">
                  <button
                    onClick={() => generatePDF(item, activeTab === "otherForms" ? "otherForms" : "forms")}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Download PDF
                  </button>
                  <button
                    onClick={() => deleteForm(item.id, activeTab === "otherForms" ? "otherforms" : "forms")}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}