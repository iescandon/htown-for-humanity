import { useState } from "react";
import axios from "axios";

function MyForm({ contactFormTitle }) {
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
      className="p-6 h-full flex flex-col justify-center"
      onSubmit={handleOnSubmit}
    >
      <div className="font-lato font-bold text-[3em]">{contactFormTitle}</div>
      {/* <label className="mt-5s" htmlFor="reason">
        I would love to help by
      </label> */}
      <select name="reason" id="reason" className="mt-5 border rounded">
        <option value="I'd like to take in a family">
          I&apos;d like to take in a family
        </option>
        <option value="I'd like to sponsor a family">
          I&apos;d like to sponsor a family
        </option>
        <option value="I'd like to volunteer to work with H-Town for Humanity">
          I&apos;d like to volunteer to work for H-Town for Humanity
        </option>
        <option value="Other">Other</option>
      </select>
      <input
        className="mt-5 border rounded"
        id="name"
        type="name"
        name="name"
        placeholder="your name"
        required
      />
      <input
        className="mt-5 border rounded"
        id="email"
        type="email"
        name="email"
        placeholder="your e-mail"
        required
      />
      <textarea
        className="mt-5 border rounded"
        id="message"
        name="message"
        placeholder="your message"
      ></textarea>
      {/* <div className="g-recaptcha" data-sitekey={process.env.RECAPTCHA_SITE_KEY}></div> */}
      <button
        className="self-end w-1/3 p-3 mt-10 bg-black text-white md:transition md:duration-200 md:ease-in-out md:w-1/6 submit-btn"
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
