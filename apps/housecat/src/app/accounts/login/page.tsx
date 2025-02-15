"use client";

import { Field, Form, Formik } from "formik";

import { useRouter } from "next/navigation";
import { housecatLogin } from "@wprdc/api";
import { useState } from "react";
import { Button } from "@wprdc/ui";

interface Values {
  username: string;
  password: string;
}

export default async function LoginPage({}) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  function onLogin(token: string | null): void {
    if (token) {
      document.cookie = `hct=${token}; path=/`;
      setErrorMessage(null);
      router.push("/explore");
    } else {
      setErrorMessage(
        "Login failed.  If you continue to experience issues, please contact us.",
      );
    }
  }

  return (
    <div className="container mx-auto max-w-5xl pt-8">
      <h2 className="mb-2 mt-4 text-5xl font-bold">Log In</h2>
      <p className="italic">
        Email us at wprdc@pitt.edu if you have any issues.
      </p>

      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={(values) => {
          housecatLogin(values.username, values.password, onLogin);
        }}
      >
        <Form className="mt-8">
          <label className="mt-2 block text-lg font-semibold">Email</label>
          <Field
            type="text"
            name="username"
            className="w-full max-w-sm rounded-sm border border-stone-700 px-1 py-0.5 font-mono disabled:cursor-not-allowed disabled:bg-gray-200"
          />

          <label className="mt-2 block text-lg font-semibold">Password</label>
          <Field
            type="password"
            name="password"
            className="w-full max-w-sm rounded-sm border border-stone-700 px-1 py-0.5 font-mono disabled:cursor-not-allowed disabled:bg-gray-200"
          />

          <div className="mt-4">
            <Button variant={"primary"} type={"submit"} className="text-lg">
              Sign In
            </Button>
          </div>
          {!!errorMessage && (
            <div className="mt-8 italic text-red-800">{errorMessage}</div>
          )}
        </Form>
      </Formik>
    </div>
  );
}
