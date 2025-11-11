/*
  Author : Goli Bi 
  Created At : 10/11/2025 14:11:05
*/
import React, { FC, useEffect, Fragment, useState, useRef } from "react";
// import Loading from '../Loading/Loading';
import "./AccountPage.css";
import Loading from "../../components/Loading/Loading";
import { generateId, validateUpdateUserForm } from "../../helpers/utils";
import { useFormik } from "formik";
import { User } from "../../models/user";
import { getDataById, updateData } from "../../api/entity";
import { useDispatch, useSelector } from "react-redux";
import { getUserID } from "../../redux/selectors/selectors";
import { ADD_NOTIFICATION } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import PageBanner from "../../components/PageBanner/PageBanner";
import { resquestResponse } from "../../models/resquestResponse";

interface AccountPageProps {}

const AccountPage: FC<AccountPageProps> = () => {
  // const [state, setState] = useState<any>(null)
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");
  const [formError, setFormError] = useState<string>("");
  const [curentUser, setCurentUser] = useState<User>({});
  const [previewImage, setPreviewImage] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const userId = useSelector(getUserID);
  console.log(userId);

  const validate = (value: any) => validateUpdateUserForm(value);
  // ==============

  const formik = useFormik({
    initialValues: {
      // username: "Goli",
      username: "",
      firstname: "",
      lastname: "",
      // fullname: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: "",
    },
    validate,
    // enableReinitialize: true,
    onSubmit: async (values: User) => {
      // console.log("go");
      console.log("users:" + values);
      const formData = new FormData();
      formData.append("username", values.username as string);
      formData.append("firstname", values.firstname as string);
      formData.append("lastname", values.lastname as string);
      formData.append("fullname", values.fullname as string);
      formData.append("phone", values.phone as string);
      formData.append("image", values.image as any);
      console.log(formData);
      let result;
      const id = userId;
      if (id) {
        console.log(formData);
        result = await updateData("users", id, formData);
        console.log(result);
      }

      if (result.isSuccess) {
        // setRedirect(true);
        console.log(result);

        // setErrorStatus(true);
        setFormError("Profil mise à jour avec succès");

        dispatch({
          type: ADD_NOTIFICATION,
          payload: {
            _id: generateId(),
            message: "Mise à jour effectuée",
            status: "success",
            timeout: 2000,
          },
        });
        // if (currentProduct) {
        //   cancel();
        // } else {
        //   formik.resetForm();
        //   setPreviewImage(null);
        // }
      } else {
        // setErrorStatus(false);
        setFormError(result.message);
      }
    },
  });
  // ======================
  const runLocalData = async () => {
    const user: any = await getDataById("users", userId);
    console.log(user);

    if (user.isSuccess) {
      const datUser: any = user.result;
      console.log(datUser);

      setCurentUser(datUser);
      console.log(value);

      formik.setValues({
        username: curentUser.username || "",
        firstname: curentUser.firstname || "",
        lastname: curentUser.lastname || "",
        // fullname: "",
        phone: curentUser.phone || "",
        email: curentUser.email || "",
        password: curentUser.password || "",
        confirmPassword: curentUser.password || "",
        image: curentUser.image || "",
      });
    }
    setValue("1");
    setLoading(false);
  };
  // =============================
  useEffect(() => {
    // window.scrollTo(0, 0);
    runLocalData();
    console.log(curentUser);
  }, [value]);
  // ==============
  console.log(curentUser);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let file: File | null = null;
    if (event.currentTarget.files && event.currentTarget.files.length > 0) {
      file = event.currentTarget.files[0];
      formik.setFieldValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      // reader.readAsDataURL(event.currentTarget.files[0]);
      reader.readAsDataURL(file);
    } else {
      formik.setFieldValue("image", null);
    }
  };
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="AccountPage">
          <div className="Signup">
            <PageBanner name="Compte" />
            {/* <div className="container-lg py-2 px-5 heading_s">
            <h3>Créer votre compte</h3>
          </div> */}
            <div className="container-lg py-2 px-5">
              <div className="row justify-content-center">
                <div className="col-12 col-sm-10 col-md-6">
                  <div className="card justify-content-center">
                    <div className="row mx-auto py-2 heading_s ">
                      <h3>Modifier votre profile</h3>
                    </div>
                    <form
                      onSubmit={formik.handleSubmit}
                      encType="multipart/form-data"
                      className="row mx-5 pb-2 "
                    >
                      <p className="error text-danger">{formError}</p>
                      {/* ======================== */}
                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        name="image"
                        className="form-control"
                        id="validationDefaultimage"
                        // required
                        ref={fileInputRef}
                        onChange={handleFileChange}
                      />
                      {/* <FileUpload image={Formik.values.image} /> */}
                      {/* <button
                        type="button"
                        className="btn btn-primary mb-2 align-items-center"
                        onClick={() => {
                          fileInputRef.current?.click();
                        }}
                      >
                        Ajouter image
                      </button> */}
                      <div className="text-center ">
                        {previewImage ? (
                          <img
                            className="rounded-circle "
                            src={previewImage}
                            alt="selection une Photo"
                            // style={{ width: "200px", height: "200px" }}
                            style={{ width: "150px", height: "150px" }}
                            onClick={() => {
                              fileInputRef.current?.click();
                            }}
                          />
                        ) : (
                          <img
                            className="rounded-circle "
                            src="/Photo1.png"
                            // alt="selection une Photo"
                            // style={{ width: "200px", height: "200px" }}

                            style={{ width: "150px", height: "150px" }}
                            onClick={() => {
                              fileInputRef.current?.click();
                            }}
                          />
                        )}
                      </div>
                      {/* {previewImage ? (
                        <div className="text-center">
                          <img
                            className="rounded-circle  "
                            src={previewImage}
                            alt="Preview"
                            // style={{ width: "200px", height: "200px" }}
                            style={{ width: "150px", height: "150px" }}
                          />
                        </div>
                      ) : // <>
                      //   {currentProduct ? (
                      //     <img
                      //       className="card preview rounded "
                      //       src={currentProduct.image}
                      //       alt="Preview"
                      //       style={{ width: "200px", height: "200px" }}
                      //     />
                      //   ) : (
                      //     <div
                      //       className="card rounded align-middle"
                      //       style={{ width: "200px", height: "200px" }}
                      //     ></div>
                      //   )}
                      // </>
                      null} */}
                      {/* ======================== */}
                      <div className="mb-3">
                        <label htmlFor="exampleInputgin" className="form-label">
                          Login
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          id="exampleInputgin"
                          aria-describedby="emailHelp"
                          onChange={formik.handleChange}
                          value={formik.values.username}
                        />
                        {formik.errors.username ? (
                          <div className="error text-danger">
                            {formik.errors.username}
                          </div>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputNom" className="form-label">
                          Nom
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="lastname"
                          id="exampleInputNom"
                          aria-describedby="emailHelp"
                          onChange={formik.handleChange}
                          value={formik.values.lastname}
                        />
                        {formik.errors.lastname ? (
                          <div className="error text-danger">
                            {formik.errors.lastname}
                          </div>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPrenoms"
                          className="form-label"
                        >
                          Prénoms
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstname"
                          id="exampleInputPrenoms"
                          aria-describedby="emailHelp"
                          onChange={formik.handleChange}
                          value={formik.values.firstname}
                        />
                        {formik.errors.firstname ? (
                          <div className="error text-danger">
                            {formik.errors.username}
                          </div>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          onChange={formik.handleChange}
                          value={formik.values.email}
                        />
                        {formik.errors.email ? (
                          <div className="error text-danger">
                            {formik.errors.email}
                          </div>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          Mot de passe
                        </label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          id="exampleInputPassword1"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                        />
                      </div>
                      {formik.errors.password ? (
                        <div className="error text-danger">
                          {formik.errors.password}
                        </div>
                      ) : null}
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputConfigPassword"
                          className="form-label"
                        >
                          Confirmé mot de passse
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          className="form-control"
                          id="exampleInputConfigPassword"
                          onChange={formik.handleChange}
                          value={formik.values.confirmPassword}
                        />
                        {formik.errors.confirmPassword ? (
                          <div className="error text-danger">
                            {formik.errors.confirmPassword}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-12 mx-auto ">
                        <div className="row mx-auto  my-2 g-2">
                          <button
                            type="submit"
                            className="col-md-5 btn btn-primary mx-auto"
                            name="registrer"
                          >
                            Valider
                          </button>

                          {/* <button className="col-md-5 btn btn-danger mx-auto"> */}
                          <Link
                            to="/"
                            className="col-md-5 btn btn-danger mx-auto text-light .text-light"
                          >
                            Fermer
                          </Link>
                          {/* </button> */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AccountPage;
