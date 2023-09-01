import React, { useState } from "react";
import Input from "@src/components/Input";
import axios from "axios";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { validateWithRegex } from "@src/utils";
import { emailRegex, nameRegex } from "@src/utils/constants";

interface ISignupProps {}

const Signup: React.FunctionComponent<ISignupProps> = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError("please add email");
    } else {
      if (!validateWithRegex(email, emailRegex)) {
        setEmailError("Invalid email");
      } else {
        setEmailError("");
        setEmail(email);
      }
    }
  };
  const validateFirstName = (firstName: string) => {
    if (!firstName) {
      setFirstNameError("please add firstname");
    } else {
      if (!validateWithRegex(firstName, nameRegex)) {
        setFirstNameError("Invalid First Name");
      } else {
        setFirstNameError("");
        setFirstName(firstName);
      }
    }
  };
  const validateLastName = (lastName: string) => {
    if (!lastName) {
      setLastNameError("please add last name");
    } else {
      if (!validateWithRegex(lastName, nameRegex)) {
        setLastNameError("Invalid Last Name");
      } else {
        setLastNameError("");
        setLastName(lastName);
      }
    }
  };

  const checkDisabled = () => {
    if (emailError || lastNameError || firstNameError) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      firstName,
      lastName,
      email,
    };

    const resp = await axios.post(
      "https://spot-the-fake-api.onrender.com/signup",
      formData,
      {
        headers: {
          "Access-Control-Allow-Origin": origin,
        },
      }
    );
    if (resp.status == 200) {
      setIsLoading(false);
      toast.success("You are registered");
      setTimeout(() => {
        router.push("/");
      }, 2700);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center h-screen items-center p-6">
      <div className="w-[100%] md:w-[40%] p-4 md:p-8 lg:p-16 border border-violet-400 rounded-lg shadow-soft-elevated">
        <div>
          <h3 className="font-semibold text-2xl text-gray-200">Signup</h3>
          <h6 className="mt-2 text-gray-300">Hello , enter your credentials</h6>
        </div>
        <form
          className=" w-full h-full flex flex-col items-center mt-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <Input
            type="text"
            label="first name"
            placeholder="first name"
            error={firstNameError}
            handleChange={validateFirstName}
          />
          <Input
            type="text"
            label="last name"
            placeholder="last name"
            error={lastNameError}
            handleChange={validateLastName}
          />
          <Input
            type="text"
            label="email"
            placeholder="email"
            error={emailError}
            handleChange={validateEmail}
          />

          {/* error message */}
          <button
            className="flex justify-center items-center gap-2 text-violet-400 font-semibold rounded-sm transition-all ease-in-out bg-gray-800 w-full py-3 mt-8 hover:cursor-pointer hover:bg-violet-400 hover:text-white disabled:cursor-not-allowed"
            disabled={checkDisabled()}
            type="submit"
          >
            Sign up {isLoading && <ClipLoader size={20} color={"#fff"} />}
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Signup;
