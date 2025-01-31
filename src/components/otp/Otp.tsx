import { RefObject, useEffect, useRef, useState } from "react";

export default function OtpHandler({ otpLength = 6 }) {
  const [otpFields, setOTPFields] = useState<string[]>(
    new Array(otpLength).fill("")
  );
  const ref = useRef<(HTMLInputElement | null)[]>([]);

  const handleOTP = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.key;
    const copyOtpFields = [...otpFields];

    console.log("val", val);
    if (val === "ArrowLeft") {
      if (index > 0) ref.current[index - 1]?.focus();
      return;
    }
    if (val === "ArrowRight") {
      if (index + 1 < otpLength) ref.current[index + 1]?.focus();
    }
    if (val == "Backspace") {
      copyOtpFields[index] = "";
      setOTPFields(copyOtpFields);
      if (index > 0) ref.current[index - 1]?.focus();
      return;
    }
    if (isNaN(Number(val))) {
      return;
    }

    copyOtpFields[index] = val;
    setOTPFields(copyOtpFields);
    if (index + 1 < otpLength) ref.current[index + 1]?.focus();
  };

  useEffect(() => {
    ref.current[0]?.focus();
  }, []);

  return (
    <div className="otp-container">
      {otpFields.length > 0 &&
        otpFields.map((value, index) => {
          return (
            <input
              key={index}
              ref={(currentInput) => (ref.current[index] = currentInput)}
              type="text"
              value={value}
              onKeyDown={(e) => handleOTP(e, index)}
            />
          );
        })}
    </div>
  );
}
