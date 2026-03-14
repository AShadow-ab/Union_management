// src/pages/AdminDashboard.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import html2pdf from "html2pdf.js";

import leftLogo from "../assets/Fin.jpg";
import rightLogo from "../assets/cdc.jpg";

export default function AdminDashboard() {

  const [forms,setForms] = useState([]);
  const [letters,setLetters] = useState([]);
  const [estateFilter,setEstateFilter] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{

    const unsubForms = onSnapshot(collection(db,"forms"),(snapshot)=>{

      const data = snapshot.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
      }));

      setForms(data);

    });

    const unsubLetters = onSnapshot(collection(db,"letters"),(snapshot)=>{

      const data = snapshot.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
      }));

      setLetters(data);

    });

    return ()=>{
      unsubForms();
      unsubLetters();
    }

  },[]);


  const filteredForms = estateFilter
    ? forms.filter(f=>f.estate?.toLowerCase().includes(estateFilter.toLowerCase()))
    : forms;


  const generatePDF = async (data) => {

  // Convert Firebase image to Base64
  const toBase64 = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  const signatureBase64 = await toBase64(data.signatureURL);

  const element = document.createElement("div");

  element.style.width = "794px";
  element.style.padding = "40px";
  element.style.background = "white";
  element.style.fontFamily = "Times New Roman, serif";
  element.style.lineHeight = "1.7";
  element.style.fontSize = "18px";

  element.innerHTML = `

<div style="border:3px solid black;padding:35px">

<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:30px">

<img src="/src/assets/Fin.jpg" style="height:80px"/>

<div style="text-align:center">

<h1 style="margin:0;font-size:44px;letter-spacing:3px">
FINAAWU
</h1>

<p style="margin:8px 0">
REG: SD/14/2018 of 22/02/2018
</p>

<p style="margin:8px 0">
EMAIL: finaawu@gmail.com • P.O BOX 115 TIKO
</p>

</div>

<img src="/src/assets/cdc.jpg" style="height:80px"/>

</div>

<hr/>

<h2 style="text-align:center;text-decoration:underline;margin-top:25px;margin-bottom:30px">
ADHERENCE (CHECK-OFF) DEDUCTION FORM
</h2>

<p>
In conformity with the provisions of Section 21 of the Labour Code, I,
<strong>${data.name}</strong>
</p>

<p>
ID Card No: <strong>${data.idCard || ""}</strong>
</p>

<p>
Matricule No: <strong>${data.matricule}</strong> |
Section: <strong>${data.section}</strong> |
Profession: <strong>${data.profession}</strong>
</p>

<p>
Estate / Service: <strong>${data.estate}</strong> |
Contact: <strong>${data.contact}</strong>
</p>

<p>
Hereby authorize my employer to deduct from my salary or wages,
one percent (1%) of my basic salary as Trade Union Check-Off contribution.
</p>

<p>
The deduction shall be paid into the account of <strong>FINAAWU</strong>.
</p>

<p style="margin-top:25px">
Done at <strong>${data.place}</strong> on <strong>${data.date}</strong>
</p>

<div style="display:flex;justify-content:flex-end;margin-top:90px">

<div style="text-align:center">

<img src="${signatureBase64}" style="
width:240px;
height:120px;
object-fit:contain;
"/>

<p style="margin-top:5px">
Signature of Member
</p>

</div>

</div>

<p style="margin-top:35px;font-size:16px">
Endorsed by: T. Union Leader
</p>

</div>
`;

  html2pdf().from(element).set({

    margin:5,

    filename:`${data.name}_form.pdf`,

    html2canvas:{
      scale:3
    },

    jsPDF:{
      unit:"mm",
      format:"a4"
    }

  }).save();
};

const previewPDF = (data) => {

  const element = document.createElement("div");

  element.style.width="794px";
  element.style.padding="40px";
  element.style.background="white";
  element.style.fontFamily="Georgia, serif";
  element.style.lineHeight="1.6";
  element.style.fontSize="18px";

  element.innerHTML = `

<div style="border:3px solid black;padding:35px">

<h2 style="text-align:center;margin-bottom:25px">
ADHERENCE (CHECK-OFF) DEDUCTION FORM
</h2>

<p>I, ${data.name}</p>

<p>ID Card No: ${data.idCard || ""}</p>

<p>Mat. No: ${data.matricule}</p>

<p>Estate: ${data.estate}</p>

<p>Contact: ${data.contact}</p>

<p>Done at ${data.place} on ${data.date}</p>

<div style="text-align:right;margin-top:60px">

<img src="${data.signatureURL}" style="width:220px"/>

<p>Signature of Member</p>

</div>

</div>
`;

  html2pdf().from(element).set({

    margin:5,

    filename:"preview.pdf",

    html2canvas:{scale:3,useCORS:true},

    jsPDF:{unit:"mm",format:"a4"}

  }).outputPdf("bloburl").then((url)=>{

    window.open(url);

  });

};

const deleteForm = async (id) => {

  const confirmDelete = window.confirm("Delete this form?");

  if(!confirmDelete) return;

  try{
    await deleteDoc(doc(db,"forms",id));
  }catch(err){
    console.error(err);
    alert("Failed to delete form");
  }

};

  return(

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-6">
      Admin Dashboard
      </h1>


      <div className="mb-6 flex gap-4">

        <input
        placeholder="Filter by estate..."
        onChange={(e)=>setEstateFilter(e.target.value)}
        className="border p-2 rounded w-60"
        />


        <div className="bg-white shadow px-4 py-2 rounded">
        Total Forms: {forms.length}
        </div>


                <div
          onClick={()=>navigate("/letters")}
          className="bg-white shadow px-4 py-2 rounded cursor-pointer"
        >
          Total Letters: {letters.length}
        </div>

      </div>


      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredForms.map(form => (

<div key={form.id} className="bg-white p-5 shadow-md rounded-xl border">

<h2 className="font-bold text-lg mb-2">
{form.name}
</h2>

<div className="text-sm space-y-1">

<p><b>ID Card:</b> {form.idCard}</p>

<p><b>Matricule:</b> {form.matricule}</p>

<p><b>Estate:</b> {form.estate}</p>

<p><b>Contact:</b> {form.contact}</p>

</div>

<img
src={form.signatureURL}
className="h-20 mt-3 border rounded"
/>

<div className="flex gap-2 mt-4 flex-wrap">

<button
onClick={()=>previewPDF(form)}
className="bg-gray-700 text-white px-3 py-1 rounded text-sm"
>
Preview
</button>

<button
onClick={()=>generatePDF(form)}
className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
>
Download
</button>

<button
onClick={()=>deleteForm(form.id)}
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