// src/components/PDFDocument.jsx
import React, { forwardRef } from "react";
import formLeftLogo from "../assets/Fin.jpg";
import formRightLogo from "../assets/cdc.jpg";
import otherFormLogo from "../assets/Fin.jpg";

const PDFDocument = forwardRef(({ data={}, titleText ,type}) => {
  const leftLogo = type === "forms" ? formLeftLogo : otherFormLogo;
  const rightLogo = type === "forms" ? formRightLogo : otherFormLogo;

  return (
    <div
	//className=" print:block hidden"
      dangerouslySetInnerHTML={{
        __html: `
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
      <p>I, <strong>${data?.name || ""}</strong></p>
      <p>ID Card No: <strong>${data?.idCard || ""}</strong></p>
      <p>Matricule No: <strong>${data?.matricule || ""}</strong> | Section: <strong>${data?.section || ""}</strong> | Profession: <strong>${data?.profession || ""}</strong></p>
      <p>Estate / Service: <strong>${data?.estate || ""}</strong> | Contact: <strong>${data?.contact || ""}</strong></p>

      <p>Hereby authorize my employer to deduct from my salary/wages 1% of my basic salary/wages representing Trade Union Check-Off contribution each month to be paid to the account of <strong>FINAAWU</strong>.</p>

      <p style="margin-top:20px;">Done at <strong>${data?.place || ""}</strong> on <strong>${data?.date || ""}</strong></p>

      <div style="display:flex; justify-content:flex-end; margin-top:50px;">
        <div style="text-align:center;">
          ${data?.signatureURL ? `<img src="${data?.signatureURL}" style="width:240px;height:120px; object-fit:contain;"/>` : ""}
          <p>Signature of Member</p>
        </div>
      </div>

      <p style="margin-top:30px;">Endorsed by: T. Union Leader</p>
    </div>
  `,
      }}
    />
  );
});

export default PDFDocument;
