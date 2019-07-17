import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function OnBoardingForm({ values, errors, touched }) {
  return (
    <div className="formContainer">
      <h2>Onboarding New User</h2>
      <Form className="onboardingForm">
        <label htmlFor="name">Name: </label>
        <Field type="text" id="name" name="name" placeholder="Enter name" />
        {touched.name && errors.name && <p>{errors.name}</p>}
        <label htmlFor="email">Email: </label>
        <Field type="email" id="email" name="email" placeholder="Enter email" />
        {touched.email && errors.email && <p>{errors.email}</p>}
        <label htmlFor="name">Password: </label>
        <Field
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
        />
        {touched.password && errors.password && <p>{errors.password}</p>}
        <div className="termsCheckbox">
          <label htmlFor="name" className="tosLabel">
            Terms of Service:{" "}
          </label>
          <Field type="checkbox" name="tos" checked={values.tos} />
        </div>
        <Button>Submit</Button>
      </Form>
    </div>
  );
}

export default withFormik({
  mapPropsToValues: () => {
    return {
      name: "",
      email: "",
      password: "",
      tos: ""
    };
  },
  handleSubmit: (values, formikBag) => {
    console.log("hello");
    const url = "https://reqres.in/api/users";
    console.log(values);
    formikBag.resetForm();
    axios.post(url, values).then(res => {
      window.alert(res.data.name);
    });
  },
  ///Validation
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(5)
      .required()
  })
})(OnBoardingForm);
