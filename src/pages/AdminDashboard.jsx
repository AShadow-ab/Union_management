// src/pages/AdminDashboard.jsx
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, deleteDoc, doc, query, orderBy } from "firebase/firestore";

import HomeButton from "../components/HomeButton";
import PDFDocument from "../components/PDFDocument";
import { useReactToPrint } from "react-to-print";
import { BsEye, BsX } from "react-icons/bs";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("forms");
  const [forms, setForms] = useState([]);
  const [otherForms, setOtherForms] = useState([]);
  const [estateFilter, setEstateFilter] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [viewData, setViewData] = useState(null);

  const GENERAL_DOC_TITLE = "ADHERENCE (CHECK-OFF) DEDUCTION FORM";

  const pdfDocRef = useRef();

  // Fetch data
  useEffect(() => {
  // Query forms collection sorted by createdAt descending (newest first)
  const formsQuery = query(collection(db, "forms"), orderBy("createdAt", "desc"));
  const unsubForms = onSnapshot(formsQuery, (snap) =>
    setForms(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  );

  // Query otherforms collection sorted by createdAt descending
  const otherFormsQuery = query(collection(db, "otherforms"), orderBy("createdAt", "desc"));
  const unsubOtherForms = onSnapshot(otherFormsQuery, (snap) =>
    setOtherForms(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  );

  // Cleanup
  return () => {
    unsubForms();
    unsubOtherForms();
  };
}, []);

  // Filtered data
  const filteredForms = estateFilter
    ? forms.filter((f) =>
        f.estate?.toLowerCase().includes(estateFilter.toLowerCase())
      )
    : forms;

  const filteredOtherForms = estateFilter
    ? otherForms.filter((f) =>
        f.estate?.toLowerCase().includes(estateFilter.toLowerCase())
      )
    : otherForms;

  const deleteForm = async (id, type) => {
    if (!window.confirm("Delete this form?")) return;
    await deleteDoc(doc(db, type, id));
  };

  // Determine display data
  let displayData = [];
  if (activeTab === "forms") displayData = filteredForms;
  else if (activeTab === "otherForms") displayData = filteredOtherForms;

  // Print handler
  const handlePrint = useReactToPrint({
    contentRef: pdfDocRef,
    onBeforePrint: async () => {
      console.log("Preparing print");
      setIsPrinting(true);

      await new Promise((resolve) => setTimeout(resolve, 50));

      console.log("Ready to print");
    },

    onAfterPrint: () => {
      console.log("Print dialog closed");
      setIsPrinting(false);
      setSelectedData(null);
    },
  });

  // Trigger print after data is set
  useEffect(() => {
    if (selectedData) {
      handlePrint();
    }
  }, [selectedData]);



  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <HomeButton />
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex justify-between">
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          {["forms", "otherForms"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded ${
                activeTab === tab ? "bg-green-600 text-white" : "bg-white"
              }`}
              onClick={() => setActiveTab(tab)}
              style={{
                backgroundColor: `${activeTab === tab ? "green" : "white"}`,
              }}
            >
              {tab === "forms" ? "Forms" : "Other Forms"}
            </button>
          ))}
        </div>

        {/* Filter */}
        <input
          placeholder="Filter by estate..."
          className="border p-2 rounded mb-6 w-60"
          onChange={(e) => setEstateFilter(e.target.value)}
        />
      </div>

      <div className="py-5">
        <hr />
      </div>

      <div className="flex gap-4 flex-wrap">
        {/* Grid */}
        <div className="flex-2">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayData.map((item) => (
              <div
                key={item.id}
                className={`bg-white p-5 shadow-md rounded-xl border ${
                  viewData === item && `border-4 border-blue-600`
                }`}
              >
                <div className="flex justify-end">
                  <button
                    style={{ backgroundColor: "#0051dd", color: "white" }}
                    className="cursor-pointer"
                    onClick={() => setViewData(item)}
                  >
                    <BsEye />
                  </button>
                </div>

                <h2 className="font-bold text-lg mb-2">
                  {item.name} {activeTab === "otherForms" ? "(Other)" : ""}
                </h2>

                <div className="text-sm space-y-1">
                  <p>
                    <b>ID Card:</b> {item.idCard}
                  </p>
                  <p>
                    <b>Matricule:</b> {item.matricule}
                  </p>
                  <p>
                    <b>Estate:</b> {item.estate}
                  </p>
                  <p>
                    <b>Contact:</b> {item.contact}
                  </p>
                </div>

                <div className="flex justify-between flex-wrap items-center mt-2">
                  {item.signatureURL && (
                    <div className="border rounded p-2">
                      <img
                        src={item.signatureURL}
                        alt="signature"
                        className="h-20 mt-3"
                      />
                    </div>
                  )}

                  <div className="flex gap-2 mt-4 flex-wrap">
                    <button
                      onClick={() => setSelectedData(item)}
                      className={`bg-blue-600 text-white px-3 py-1 rounded text-sm w-full ${
                        isPrinting ? `cursor-not-allowed` : `cursor-pointer`
                      }`}
                      style={{
                        backgroundColor: `${
                          isPrinting && selectedData === item
                            ? `gray`
                            : `#0051dd`
                        }`,
                      }}
                      disabled={isPrinting}
                    >
                      {isPrinting && selectedData === item
                        ? "Preparing Print..."
                        : "Download PDF"}
                    </button>

                    <button
                      onClick={() =>
                        deleteForm(
                          item.id,
                          activeTab === "otherForms" ? "otherforms" : "forms"
                        )
                      }
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm w-full"
                      style={{ backgroundColor: "red" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview */}
        {viewData && (
          <div className="container flex-2 sticky-top">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-xl">Document Preview:</h3>
              <BsX
                onClick={() => setViewData(null)}
                size={40}
                className="hover:text-red-800 cursor-pointer"
              />
            </div>

            <div ref={pdfDocRef} className="bg-white p-10">
              <PDFDocument
                type={activeTab}
                data={selectedData || viewData}
                titleText={GENERAL_DOC_TITLE}
              />
            </div>
          </div>
        )}

        {/* Hidden Print Renderer */}
        <div ref={pdfDocRef} className="bg-white p-10 print:block hidden">
          <PDFDocument
            type={activeTab}
            data={selectedData}
            titleText={GENERAL_DOC_TITLE}
          />
        </div>
      </div>
    </div>
  );
}