// src/components/UserForm.jsx

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUser, updateUser } from "../api/userApi";

const schema = Yup.object({
  name: Yup.string().min(3).required("Required"),
  email: Yup.string().email("Invalid").required("Required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "10 digits required")
    .required(),
  gender: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  password: Yup.string().min(6).required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Not match")
    .required("Required"),
  terms: Yup.boolean().oneOf([true], "Required"),
});

const UserForm = ({ addUser, editUser, editingUser }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: editingUser?.name || "",
        email: editingUser?.email || "",
        phone: editingUser?.phone || "",
        gender: editingUser?.gender || "",
        country: editingUser?.country || "",
        password: "",
        confirmPassword: "",
        terms: true,
      }}
      validationSchema={schema}
      onSubmit={async (values, { resetForm }) => {
        if (editingUser) {
          const updated = await updateUser(editingUser.id, values);
          editUser({ ...values, id: editingUser.id });
          resetForm();
          alert("User Updated");
          return;
        }

        const newUser = await createUser(values);
        addUser({ ...values, id: newUser.id });
        resetForm();
        alert("User Registered");
      }}
    >
      <Form className="form" style={{ display: "grid", gap: "10px" }}>
        <Field name="name" placeholder="Name" />
        <ErrorMessage name="name" component="div" className="error" />

        <Field name="email" placeholder="Email" />
        <ErrorMessage name="email" component="div" className="error" />

        <Field name="phone" placeholder="Phone" />
        <ErrorMessage name="phone" component="div" className="error" />

        <Field as="select" name="gender">
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </Field>
        <ErrorMessage name="gender" component="div" className="error" />

        <Field as="select" name="country">
          <option value="">Country</option>
          <option>India</option>
          <option>USA</option>
          <option>Canada</option>
          <option>UK</option>
        </Field>
        <ErrorMessage name="country" component="div" className="error" />

        <Field type="password" name="password" placeholder="Password" />
        <ErrorMessage name="password" component="div" className="error" />

        <Field
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
        />
        <ErrorMessage
          name="confirmPassword"
          component="div"
          className="error"
        />

        <label>
          <Field type="checkbox" name="terms" /> Accept Terms
        </label>
        <ErrorMessage name="terms" component="div" className="error" />

        <button type="submit">
          {editingUser ? "Update User" : "Register User"}
        </button>
      </Form>
    </Formik>
  );
};

export default UserForm;
