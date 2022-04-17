import { useState } from "react";
import axios from "axios";

function MyForm({ contactFormTitle, contactFormDropdownOptions }) {
  const [serverState, setServerState] = useState({
    submitting: false,
    status: null,
  });
  const handleServerResponse = (ok, msg, form) => {
    setServerState({
      submitting: false,
      status: { ok, msg },
    });
    if (ok) {
      form.reset();
      setTimeout(() => {
        setServerState({
          submitting: false,
          status: null,
        });
      }, 3000);
    }
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setServerState({ submitting: true });
    axios({
      method: "post",
      url: "https://formspree.io/f/mrgjykba",
      data: new FormData(form),
    })
      .then((r) => {
        handleServerResponse(true, "Submission successful!", form);
      })
      .catch((r) => {
        handleServerResponse(false, r.response.data.error, form);
      });
  };

  //   window.onload = function() {
  //     var el = document.getElementById('g-recaptcha-response');
  //     if (el) {
  //       el.setAttribute('required', 'required');
  //     }
  //   }

  return (
    <form
      // className="px-6 h-full w-full flex flex-col justify-center"
      className="h-full w-full flex flex-col justify-center"
      onSubmit={handleOnSubmit}
    >
      <h2 className="font-extrabold text-[1.3em] md:text-[2em] lg:text-[3em]">{contactFormTitle}</h2>
      <select name="reason" id="reason" className="mt-2 md:mt-4 border bg-white rounded">
      {contactFormDropdownOptions.map((dropdownOption) => {
              return (
                <option key={dropdownOption} value={dropdownOption}>
                {dropdownOption}
              </option>
              );
            })}
      </select>
      <input
        className="mt-2 md:mt-4 border rounded"
        id="name"
        type="name"
        name="name"
        placeholder="your name"
        required
      />
      <input
        className="mt-2 md:mt-4 border rounded"
        id="email"
        type="email"
        name="email"
        placeholder="your e-mail"
        required
      />
      <textarea
        className="mt-2 md:mt-4 border rounded"
        id="message"
        name="message"
        placeholder="your message"
      ></textarea>
      {/* <div className="g-recaptcha" data-sitekey={process.env.RECAPTCHA_SITE_KEY}></div> */}
      <button
        className="w-full md:w-1/4 lg:w-1/5 p-3 mt-2 md:mt-5 bg-black rounded text-white md:transition md:duration-200 md:ease-in-out submit-btn"
        type="submit"
        disabled={serverState.submitting}
      >
        Submit
      </button>
      {serverState.status && (
        <p
          className={`fixed rounded top-5 right-5 py-6 px-6 bg-green-700 w-[300px] text-lg text-white text-center ${
            !serverState.status.ok ? "errorMsg" : ""
          }`}
        >
                {/* <p
          className="fixed rounded top-5 right-5 py-6 px-6 bg-green-700 w-[300px] text-lg text-white text-center"
        > */}
          {serverState.status.msg}
        </p>
      )}
    </form>
  );
}

export default MyForm;
