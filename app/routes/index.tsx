import { json } from "@remix-run/node";
import { Form, useTransition } from "@remix-run/react";
import React, { useCallback, useState } from "react";

export async function action() {
  return json({});
}

export default function Index() {
  const [phoneNumber, setPhoneNumber] = useState({
    formatted: "",
    isValid: false,
  });
  const transition = useTransition();
  const disabled =
    transition.state === "submitting" || transition.state === "loading";

  const handlePhoneNumberInput = useCallback((input: string) => {
    // some phone number manipulations
    setPhoneNumber({ formatted: input, isValid: input ? true : false });
  }, []);

  console.log(phoneNumber);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Form method="post" replace>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <div>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              required
              autoFocus={true}
              autoComplete="tel"
              disabled={disabled}
              value={phoneNumber?.formatted}
              onChange={(e) => {
                handlePhoneNumberInput(e.target.value);
              }}
              placeholder="00 00 00 00 00"
            />
          </div>
        </div>

        <button
          id="sub"
          type="submit"
          disabled={disabled || !phoneNumber.isValid}
          // @ts-expect-error Firefox fix https://github.com/vercel/next.js/issues/35558#issuecomment-1077007477
          autoComplete="off"
        >
          Continue
        </button>
      </Form>
    </div>
  );
}
