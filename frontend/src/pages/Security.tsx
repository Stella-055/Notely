import Usernav from "@/components/Usernav";

const Security = () => {
  return (
    <div className="w-full ">
      <Usernav />
      <div className="w-full flex flex-col justify-center items-center mt-4 ">
        <div className="flex md:flex-row flex-col border border-gray-500/30 rounded-lg items-start md:items-center justify-between gap-5 text-sm max-w-5xl bg-white p-6">
          <div className="bg-white text-sm border border-gray-300/60 p-6 rounded-md m-2 max-w-xl ">
            <p className="font-medium text-blue-600 mb-1">Download Now!</p>
            <h2 className="text-2xl font-semibold text-gray-800">
              Download our mobile app.
            </h2>
            <p className="text-gray-500 mt-1">
              Mobile banking app for IOS & Android to
              <br />
              manage your online money.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <button className="active:scale-95 transition-all" type="button">
                <img
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/googlePlayBtnBlue.svg"
                  alt="googlePlayBtnBlue"
                />
              </button>
              <button className="active:scale-95 transition-all" type="button">
                <img
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/appleStoreBtnBlue.svg"
                  alt="appleStoreBtnBlue"
                />
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center w-80 bg-white text-gray-500  p-4 md:p-6 rounded-lg border border-gray-500/30 text-sm">
            <div className="flex items-center justify-center relative w-full gap-2 pb-3">
              <img
                className="absolute -top-12"
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/cookies/cookieImage2.svg"
                alt="cookieImage2"
              />
              <h2 className="text-gray-800 text-xl font-medium text-left w-full pt-3">
                Your privacy is important to us
              </h2>
            </div>
            <p>
              We process your personal information to measure and improve our
              sites and services, to assist our campaigns and to provide
              personalised content. For more information see our{" "}
              <a href="#" className="font-medium underline">
                Privacy Policy.
              </a>
            </p>
          </div>
        </div>
        <div className="w-3xl mt-2">
          <p className="text-gray-600">
            At Notely, we are committed to safeguarding the confidentiality,
            integrity, and availability of our systems and data. All employees,
            contractors, and third-party users are required to adhere to our
            security protocols to prevent unauthorized access, misuse, or
            compromise of information. We employ a layered approach to security,
            incorporating firewalls, encryption, access controls, and continuous
            monitoring. Regular audits, employee training, and incident response
            procedures are in place to ensure compliance and swift action in the
            event of a security breach. This policy is reviewed periodically and
            updated to address emerging threats and evolving best practices.
          </p>
        </div>{" "}
      </div>
    </div>
  );
};

export default Security;
