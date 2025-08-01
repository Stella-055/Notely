import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import api from "@/Api/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
const steps = ["Genre", "Title", "Synopsis", "content"];

const Create = () => {
  type FormDetails = {
    genre: string;
    title: string;
    synopsis: string;
    content: string;
    isPublished: boolean;
  };
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    genre: "",
    title: "",
    synopsis: "",
    content: "",
    isPublished: false,
  });

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const { isPending, mutate } = useMutation({
    mutationKey: ["create-note"],
    mutationFn: async (data: FormDetails) => {
      const response = await api.post("/entries", data);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message, {
          position: "top-center",
        });
      } else {
        toast.error("Something went wrong", {
          position: "top-center",
        });
      }
    },
    onSuccess: () => {
      toast.success("Note created successfully", {
        position: "top-center",
      });
      setFormData({
        genre: "",
        title: "",
        synopsis: "",
        content: "",
        isPublished: false,
      });
    },
  });

  const getContent = useMutation({
    mutationKey: ["get-note-content"],
    mutationFn: async (data: FormDetails) => {
      const response = await api.post("/entry/generate", data);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message, {
          position: "top-center",
        });
      } else {
        toast.error("Something went wrong", {
          position: "top-center",
        });
      }
    },
    onSuccess: (data) => {
      console.log(data);
      setFormData({
        ...formData,
        content: data.content,
      });
    },
  });

  function generateContent() {
    getContent.mutate(formData);
  }

  return (
    <div className="flex flex-col items-center justify-center  bg-white sm:w-1/2 w-full py-12">
      <div className="flex flex-col items-center pt-6">
        <h1 className="text-2xl font-bold ">Create Your Note</h1>
        <p>Just a few steps and you will be there</p>
      </div>
      <div className="w-96 p-4">
        <div className="flex items-center mb-8">
          {steps.map((label, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                onClick={() => setStep(index)}
                className={`rounded-full w-8 h-8 flex items-center justify-center cursor-pointer ${
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

        <div className="mb-4">
          {step === 0 && (
            <select
              className="border p-2 w-full rounded"
              value={formData.genre}
              onChange={(e) =>
                setFormData({ ...formData, genre: e.target.value })
              }
            >
              <option value="">Select Genre</option>
              <option value="GeneraL">General</option>
              <option value="Work">Work</option>
              <option value="School">School</option>
            </select>
          )}
          {step === 1 && (
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
          {step === 2 && (
            <textarea
              placeholder="Enter Synopsis"
              className="border p-2 w-full rounded resize-y "
              value={formData.synopsis}
              onChange={(e) =>
                setFormData({ ...formData, synopsis: e.target.value })
              }
            />
          )}

          {step === 3 && (
            <div className="text-sm space-y-2">
              <textarea
                placeholder="Enter Content"
                className="border p-2 w-full rounded resize-y h-32 "
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
              />
              <div className="flex justify-between items-center">
                <div>
                  <input
                    type="checkbox"
                    name="publish"
                    id="publish"
                    onChange={() =>
                      setFormData({
                        ...formData,
                        isPublished: !formData.isPublished,
                      })
                    }
                    className="mr-1"
                  />
                  <label htmlFor="publish">Publish note</label>
                </div>{" "}
                <Button
                  variant="outlined"
                  loading={getContent.isPending}
                  onClick={generateContent}
                  size="small"
                >
                  Generate content with Ai
                </Button>
              </div>
            </div>
          )}
        </div>

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
            <Button
              variant="contained"
              loading={isPending}
              onClick={() => {
                mutate(formData);
                console.log(formData);
              }}
            >
              Submit
            </Button>
          )}
        </div>
      </div>{" "}
    </div>
  );
};

export default Create;
