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
        handleServerResponse(true, "Thanks!", form);
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
      className="h-full flex flex-col justify-center focus:outline-goldenrod"
      onSubmit={handleOnSubmit}
    >
        <div className="font-saira font-bold text-[3em]">{contactFormTitle}</div>
      <label className="mt-5 font-semibold" htmlFor="reason">
        I would love to help by
      </label>
      <select
        name="reason"
        id="reason"
        className="border rounded border-platinum"
      >
        <option value="I'd like for you to make me a website">
          I&apos;d like for you to make me a website
        </option>
        <option value="I'd like to interview you for a job">
          I&apos;d like to interview you for a job
        </option>
        <option value="I want to work with you on a project">
          I want to work with you on a project
        </option>
        <option value="I just want to give you a compliment">
          I just want to give you a compliment
        </option>
        <option value="I'd like to pet your dog">
          I&apos;d like to pet your dog
        </option>
      </select>
      <label className="mt-5 font-semibold" htmlFor="name">
        My name is
      </label>
      <input
        className="border rounded border-platinum"
        id="name"
        type="name"
        name="name"
        placeholder="your name"
        required
      />
      <label className="mt-5 font-semibold" htmlFor="email">
        You can reply to me at
      </label>
      <input
        className="border rounded border-platinum"
        id="email"
        type="email"
        name="email"
        placeholder="your e-mail"
        required
      />
      {/* <label className="mt-5 font-semibold" htmlFor="message">
        I just want to say
      </label>
      <textarea
        className="border rounded border-platinum"
        id="message"
        name="message"
        placeholder="your message"
      ></textarea> */}

      {/* <div className="g-recaptcha" data-sitekey={process.env.RECAPTCHA_SITE_KEY}></div> */}
      <button
        className="self-end w-1/3 p-3 mt-10 bg-flagYellow text-black md:transition md:duration-200 md:ease-in-out md:w-1/6 submit-btn"
        type="submit"
        disabled={serverState.submitting}
      >
        Submit
      </button>
      {serverState.status && (
        <p
          className={`fixed rounded top-5 right-5 py-6 px-12 bg-green-700 text-4xl text-white ${
            !serverState.status.ok ? "errorMsg" : ""
          }`}
        >
          {serverState.status.msg}
        </p>
      )}
    </form>
  );
}

export default MyForm;
