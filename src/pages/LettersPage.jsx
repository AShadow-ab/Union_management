import { useEffect,useState } from "react";
import { db } from "../firebase/config";
import { collection,onSnapshot } from "firebase/firestore";
import html2pdf from "html2pdf.js";

export default function LettersPage(){

const [letters,setLetters] = useState([]);

useEffect(()=>{

const unsub = onSnapshot(collection(db,"letters"),snapshot=>{

const data = snapshot.docs.map(doc=>({
id:doc.id,
...doc.data()
}));

setLetters(data);

});

return ()=>unsub();

},[]);

const downloadPDF = (letter) => {

  if(!letter.pdfURL){
    alert("PDF not found in storage");
    return;
  }

  const link = document.createElement("a");
  link.href = letter.pdfURL;
  link.download = `${letter.name}_resignation.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

};

return(

<div className="min-h-screen bg-gray-100 p-10">

<h1 className="text-3xl font-bold mb-6">
Resignation Letters
</h1>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

{letters.map(letter=>(

<div key={letter.id} className="bg-white p-5 shadow rounded">

<p className="italic mb-4">
{letter.content}
</p>

<p>
<b>{letter.name}</b>
</p>

<button
onClick={()=>downloadPDF(letter)}
className="mt-3 bg-blue-600 text-white px-3 py-1 rounded"
>
Download PDF
</button>

</div>

))}

</div>

</div>

);
}