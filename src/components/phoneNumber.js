import { useState, useRef, useEffect } from "react";
import OtpInput from "./OtpInput";

const PhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const phnInputRef = useRef();
  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };
  useEffect(() => {
    if (phnInputRef.current) {
      phnInputRef.current.focus();
    }
  }, []);

  const handlePhoneSubmit = (event) => {
    event.preventDefault();

    // phone validations
    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("Invalid Phone Number");
      phnInputRef.current.focus();
      return;
    }

    // Call BE API
    // show OTP Field
    setShowOtpInput(true);
  };

  const onOtpSubmit = (otp) => {
    console.log("Login Successful", otp);
  };

  return (
    <div className="bg-purple-400 m-auto w-8/12 py-20 my-auto rounded-b-xl">
      <h1 className="text-2xl text-white font-bold">Enter your Phone number</h1>
      <div className="text-center bg-red-600 rounded-xl m-auto my-10 w-6/12 py-10">
        {!showOtpInput ? (
          <form onSubmit={handlePhoneSubmit}>
            <input
              type="text"
              className="p-1 rounded"
              value={phoneNumber}
              ref={phnInputRef}
              onChange={handlePhoneNumber}
              placeholder="Enter Phone Number"
            />
            <button
              type="submit"
              className="text-white ml-3 p-2 hover:bg-red-700 rounded"
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="px-2">
            <p className="text-white font-bold">
              Enter OTP sent to +{phoneNumber}
            </p>
            <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneNumber;
