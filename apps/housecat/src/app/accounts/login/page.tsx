import styles from "../../styles/Accounts.module.css";
import { Field, Form, Formik } from "formik";
import { getCookie } from "@wprdc/ui";

import { useRouter } from "next/navigation";

import Layout from "../../components/Layout";
import { ReactElement } from "react";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:8000";

interface Values {
  username: string;
  password: string;
}

const headers = {
  "Content-Type": "application/json",
  "X-CSRFToken": getCookie("csrftoken") || "",
  Accept: "application/json",
};

export function LoginPage() {
  const router = useRouter();

  function login(values: Values) {
    return fetch(`${API_HOST}/accounts/login/`, {
      method: "POST",
      body: JSON.stringify(values),
      headers,
      credentials: "include",
    });
  }

  return (
    <div className="w-full">
      <div className={styles.login}>
        <h2>Log In</h2>
        <p>Email us at wprdc@pitt.edu if you have any issues.</p>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={(values) => {
            login(values).then((r) => {
              if (r.status === 200) {
                router.push("/map");
              }
            });
          }}
        >
          <Form>
            <label>
              Email
              <Field type="text" name="username" />
            </label>
            <label>
              Password
              <Field type="password" name="password" />
            </label>
            <button type={"submit"}>Sign In</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

LoginPage.getLayout = (page: ReactElement) => (
  <Layout protect={false}>{page}</Layout>
);

export default LoginPage;
