import React, { useState, useReducer, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import ContactContext from "../../store/contact-context";
const REGEX_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REGEX_PHONE =
  /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;

const validateInput = (input = { type: "", value: "" }) => {
  if (input.type === "name") {
    return input.value.trim().length === 0 ? "Name is required" : null;
  }
  if (input.type === "email") {
    if (input.value.trim().length === 0) {
      return "Email is required";
    } else if (REGEX_EMAIL.test(String(input.value).toLowerCase()) === false) {
      return "Email invalid";
    } else {
      return null;
    }
  }
  if (input.type === "phone") {
    if (input.value.trim().length === 0) {
      return "Phone is required";
    } else if (REGEX_PHONE.test(input.value) === false) {
      return "Phone invalid";
    } else {
      return null;
    }
  }
};

const initialState = {
  name: {
    value: "",
    isTouched: false,
    isTyping: false,
    error: null,
  },
  email: {
    value: "",
    isTouched: false,
    isTyping: false,
    error: null,
  },
  phone: {
    value: "",
    isTouched: false,
    isTyping: false,
    error: null,
  },
};
const inputReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        [action.payload.name]: {
          value: action.payload.value,
          isTouched: true,
          isTyping: true,
          error: state[action.payload.name].isTouched
            ? action.payload.error
            : null,
        },
      };
    case "INPUT_BLUR":
      return {
        ...state,
        [action.payload.name]: {
          value: action.payload.value,
          isTouched: state[action.payload.name].isTouched,
          isTyping: false,
          error: state[action.payload.name].isTouched
            ? action.payload.error
            : null,
        },
      };
    case "INPUT_RESET":
      return {
          ...initialState
      }

    default:
      return state;
  }
};
export default function AddContact() {
  const [formIsValid, setFormIsValid] = useState(false);
  const [inputState, dispatchInput] = useReducer(inputReducer, initialState);
  const contactContext = useContext(ContactContext);
  let history = useHistory();
  
  const cancelFormHandler = (event) => {
    event.preventDefault();
    history.push("/");
  };

  const changeInputHandler = (event) => {
    let checkValidInput = validateInput({
      type: event.target.id,
      value: event.target.value,
    });
    dispatchInput({
      type: "INPUT_CHANGE",
      payload: {
        name: event.target.id,
        value: event.target.value,
        error: checkValidInput,
      },
    });
  };

  const blurInputHandler = (event) => {
    let checkValidInput = validateInput({
      type: event.target.id,
      value: event.target.value,
    });
    dispatchInput({
      type: "INPUT_BLUR",
      payload: {
        name: event.target.id,
        value: event.target.value,
        error: checkValidInput,
      },
    });
  };

  const submitFormHandler = async (event) => {
      event.preventDefault();
      const newContact = {
        name: inputState.name.value,
        email: inputState.email.value,
        phone: inputState.phone.value,
      }
      console.log(newContact);
      await contactContext.addContact(newContact);
      dispatchInput({type: 'INPUT_RESET'})
      history.push("/");
  }


  useEffect(() => {
    if (
      inputState.name.isTouched &&
      inputState.email.isTouched &&
      inputState.phone.isTouched
    ) {
      if (
        inputState.name.error === null &&
        inputState.email.error === null &&
        inputState.phone.error === null
      ) {
        setFormIsValid(true);
      } else {
        setFormIsValid(false);
      }
    } else {
      setFormIsValid(false);
    }
  }, [inputState]);
  return (
    <div className="container" style={{ minHeight: "100vh" }}>
      <div className="contact-box">
        <div className="title">
          <h3>Add Contact</h3>
          <span></span>
        </div>
        <div className="body">
          <form onSubmit={submitFormHandler} className="form-box card">
            <div className={(inputState.name.isTyping === false &&
                inputState.name.error !== null) ? "form-group form-group--invalid" : "form-group"}>
              <label>Name</label>
              <input
                id="name"
                value={inputState.name.value}
                onChange={changeInputHandler}
                onBlur={blurInputHandler}
              />
              {inputState.name.isTyping === false &&
                inputState.name.error !== null && (
                  <div className="invalid-feedback">
                    {inputState.name.error}
                  </div>
                )}
            </div>
            <div className={(inputState.email.isTyping === false &&
                inputState.email.error !== null) ? "form-group form-group--invalid" : "form-group"}>
              <label>Email</label>
              <input
                id="email"
                value={inputState.email.value}
                onChange={changeInputHandler}
                onBlur={blurInputHandler}
              />
              {inputState.email.isTyping === false &&
                inputState.email.error !== null && (
                  <div className="invalid-feedback">
                    {inputState.email.error}
                  </div>
                )}
            </div>
            <div className={(inputState.phone.isTyping === false &&
                inputState.phone.error !== null) ? "form-group form-group--invalid" : "form-group"}>
              <label>Phone</label>
              <input
                id="phone"
                value={inputState.phone.value}
                onChange={changeInputHandler}
                onBlur={blurInputHandler}
              />
              {inputState.phone.isTyping === false &&
                inputState.phone.error !== null && (
                  <div className="invalid-feedback">
                    {inputState.phone.error}
                  </div>
                )}
            </div>
            <div className="button-group">
              <button
                className={
                  formIsValid ? "btn btn-submit" : "btn btn-submit btn--disable"
                }
              >
                Submit
              </button>
              <button className="btn btn-cancel" onClick={cancelFormHandler}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
