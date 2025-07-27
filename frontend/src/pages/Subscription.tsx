import Usernav from "@/components/Usernav";
import { Button } from "@mui/material";
const Subscription = () => {
  return (
    <div className="w-full">
      <Usernav />
      <div className="flex flex-wrap w-full gap-4 justify-center mt-10">
        <div className="relative max-w-80 w-full">
          <div className="absolute inset-x-0 top-1 flex justify-center">
            <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
              Current package
            </span>
          </div>

          <div className="mt-4 rounded-lg border-2 border-gray-500 bg-white shadow-lg">
            <div className="border-b p-6">
              <h3 className="text-2xl font-bold">Free</h3>
              <p className="text-gray-500">Perfect for simple tasks</p>
            </div>

            <div className="p-6">
              <div className="mb-4 flex items-baseline">
                <span className="text-3xl font-bold">$0</span>
                <span className="ml-1 text-sm text-gray-500">/month</span>
              </div>

              <ul className="space-y-1 text-gray-500">
                <li className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm">Create 1000 notes</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm">Ai content Generation</span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm">10 GB monthly uploads</span>
                </li>
              </ul>
            </div>

            <div className="border-t p-6">
              <Button
                variant="contained"
                fullWidth
                href="/dashboard/billing"
                sx={{ bgcolor: "#6B7280", borderRadius: 3 }}
              >
                {" "}
                Choose Free Tier
              </Button>
            </div>
          </div>
        </div>
        <div className="relative max-w-80 w-full">
          <div className="absolute inset-x-0 top-1 flex justify-center">
            <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
              Most Popular
            </span>
          </div>

          <div className="mt-4 rounded-lg border-2 border-gray-500 bg-white shadow-lg">
            <div className="border-b p-6">
              <h3 className="text-2xl font-bold">Pro</h3>
              <p className="text-gray-500">Perfect for growing businesses</p>
            </div>

            <div className="p-6">
              <div className="mb-4 flex items-baseline">
                <span className="text-3xl font-bold">$29</span>
                <span className="ml-1 text-sm text-gray-500">/month</span>
              </div>

              <ul className="space-y-1 text-gray-500">
                <li className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm">Create upto 100,000 notes</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm">AI Content Generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm">Ai summarization feature</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm">20 GB monthly uploads</span>
                </li>
              </ul>
            </div>

            <div className="border-t p-6">
              <Button
                variant="contained"
                fullWidth
                href="/dashboard/billing"
                sx={{ bgcolor: "#6B7280", borderRadius: 3 }}
              >
                {" "}
                Choose Pro
              </Button>
            </div>
          </div>
        </div>
        <div className="relative max-w-80 w-full">
          <div className="absolute inset-x-0 top-1 flex justify-center">
            <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
              Hot Cake
            </span>
          </div>

          <div className="mt-4 rounded-lg border-2 border-gray-500 bg-white shadow-lg">
            <div className="border-b p-6">
              <h3 className="text-2xl font-bold">Enterprise</h3>
              <p className="text-gray-500">Perfect for large Enterprises</p>
            </div>

            <div className="p-6">
              <div className="mb-4 flex items-baseline">
                <span className="text-3xl font-bold">$79</span>
                <span className="ml-1 text-sm text-gray-500">/month</span>
              </div>

              <ul className="space-y-1 text-gray-500">
                <li className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm">Unlimited projects & users</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm">Everything In pro</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm">24/7 premium support</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm">Ai transcription</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm">
                    Enhanced security and compliance
                  </span>
                </li>
              </ul>
            </div>

            <div className="border-t p-6">
              <Button
                variant="contained"
                fullWidth
                href="/dashboard/billing"
                sx={{ bgcolor: "#6B7280", borderRadius: 3 }}
              >
                {" "}
                Choose Enterprise
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
