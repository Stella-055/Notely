import { useState } from "react";

const steps = ["Title", "Synopsis", "Genre", "Confirm"];

const Create = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    synopsis: "",
    genre: "",
  });

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="flex items-center mb-8">
        {steps.map((label, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className={`rounded-full w-8 h-8 flex items-center justify-center ${
                index === step
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </div>
            <p className="text-sm mt-2">{label}</p>
          </div>
        ))}
      </div>

      {/* Step Forms */}
      <div className="mb-4">
        {step === 0 && (
          <input
            type="text"
            placeholder="Enter Title"
            className="border p-2 w-full rounded"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        )}
        {step === 1 && (
          <textarea
            placeholder="Enter Synopsis"
            className="border p-2 w-full rounded"
            value={formData.synopsis}
            onChange={(e) =>
              setFormData({ ...formData, synopsis: e.target.value })
            }
          />
        )}
        {step === 2 && (
          <select
            className="border p-2 w-full rounded"
            value={formData.genre}
            onChange={(e) =>
              setFormData({ ...formData, genre: e.target.value })
            }
          >
            <option value="">Select Genre</option>
            <option value="Drama">Drama</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
          </select>
        )}
        {step === 3 && (
          <div className="text-sm space-y-2">
            <p>
              <strong>Title:</strong> {formData.title}
            </p>
            <p>
              <strong>Synopsis:</strong> {formData.synopsis}
            </p>
            <p>
              <strong>Genre:</strong> {formData.genre}
            </p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          className="bg-gray-300 px-4 py-2 rounded"
          disabled={step === 0}
        >
          Previous
        </button>
        {step < steps.length - 1 ? (
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        ) : (
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Create;
