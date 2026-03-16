// src/pages/CombinedForms.jsx
import FormPage from "./FormPage";
import OtherFormPage from "./OtherFormPage";

export default function CombinedForms() {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center py-6 px-4">
      <h1 className="text-3xl font-bold mb-8">Adherence Forms</h1>

      {/* Container for side-by-side forms */}
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-[1800px] justify-center">
        {/* Original FormPage */}
        <div className="flex-1">
          <FormPage isEmbedded={true} />
        </div>

        {/* OtherFormPage */}
        <div className="flex-1">
          <OtherFormPage isEmbedded={true} />
        </div>
      </div>
    </div>
  );
}