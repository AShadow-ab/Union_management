
// src/pages/Dashboard.jsx

import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function Dashboard() {

  const [forms, setForms] = useState([]);
  const [letters, setLetters] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const formQuery = query(collection(db, "forms"), orderBy("createdAt", "desc"));
        const formSnapshot = await getDocs(formQuery);

        const formList = formSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setForms(formList);

        const letterQuery = query(collection(db, "letters"), orderBy("createdAt", "desc"));
        const letterSnapshot = await getDocs(letterQuery);

        const letterList = letterSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setLetters(letterList);

      } catch (error) {

        console.log("Dashboard error:", error);

      }

    };

    fetchData();

  }, []);

  return (

    <div className="min-h-screen bg-gray-200 p-8">

      <h1 className="text-3xl font-bold mb-8 text-center">
        Admin Dashboard
      </h1>

      {/* FORMS */}

      <div className="mb-10">

        <h2 className="text-xl font-semibold mb-4">
          Submitted Forms
        </h2>

        {forms.length === 0 ? (

          <p>No forms submitted yet.</p>

        ) : (

          <div className="space-y-4">

            {forms.map(form => (

              <div
                key={form.id}
                className="bg-white p-4 rounded shadow flex justify-between items-center"
              >

                <div>

                  <p><strong>Name:</strong> {form.name}</p>
                  <p><strong>Matricule:</strong> {form.matricule}</p>

                </div>

                <a
                  href={form.pdfURL}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  View PDF
                </a>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* LETTERS */}

      <div>

        <h2 className="text-xl font-semibold mb-4">
          Resignation Letters
        </h2>

        {letters.length === 0 ? (

          <p>No resignation letters submitted yet.</p>

        ) : (

          <div className="space-y-4">

            {letters.map(letter => (

              <div
                key={letter.id}
                className="bg-white p-4 rounded shadow flex justify-between items-center"
              >

                <div>

                  <p><strong>Name:</strong> {letter.name}</p>
                  <p><strong>Matricule:</strong> {letter.matricule}</p>
                  <p><strong>Union:</strong> {letter.union}</p>

                </div>

                <a
                  href={letter.pdfURL}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  View Letter
                </a>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

