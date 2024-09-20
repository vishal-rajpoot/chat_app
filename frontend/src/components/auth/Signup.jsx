import { ArrowRight, UploadCloud, Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUpoading] = useState(false);
  const [filename, setFilename] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters long")
      .required("Name is required"),
    email: Yup.string()
      .email("Email address is invalid")
      .required("Email is required"),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters long")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .min(5, "Password must be at least 5 characters long")
      .required("Confirm Password is required"),
    image: Yup.string()
      .url("Image must be a valid URL")
      .required("Image is required"),
  });

  const validate = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const formErrors = {};
      err.inner.forEach((error) => {
        formErrors[error.path] = error.message;
      });
      setErrors(formErrors);
      return false;
    }
  };

  const handleFileChange = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    setFilename(file.name);

    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "mychats");
    form.append("cloud_name", "donzovjhn");

    try {
      if (file === null) {
        return toast.warning("Please upload image");
      }
      if (file.type === "image/jpeg" || file.type === "image/png") {
        const data = await fetch(
          "https://api.cloudinary.com/v1_1/donzovjhn/image/upload",
          {
            method: "POST",
            body: form,
          }
        );
        const url = data.url.toString();
        setFormData({ ...formData, image: url });
        setLoading(false);
      } else {
        return toast.error("Invalid image type");
      }
    } catch {
      return toast.error("dekhte hain");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validate();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match !");
      return;
    }
    if (!formData.image) {
      toast.error(errors.image);
      return;
    }
    if (!formData.name) {
      toast.error(errors.name);
    }
    const data = JSON.stringify(formData);
    if (isValid) {
      try {
        setUpoading(true);
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        });

        if (response.ok) {
          setUpoading(false);
          await response.json();
          toast.success("Form submitted");
        } else {
          toast.error(response.statusText);
        }
      } catch (error) {
        toast.error(error);
      }
    } else {
      console.log("form not submitted");
    }
  };

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <svg
              width="50"
              height="56"
              viewBox="0 0 50 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                fill="#FFD763"
              />
            </svg>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign up to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              title=""
              className="font-medium text-[#FFD763] transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => (
              <Form className="mt-8" onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Name{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="name"
                        name="name"
                        id="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      {errors.name && (
                        <div className="text-red-400 text-[12px] mt-1">
                          {errors.name}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Email address{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        placeholder="Email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {errors.email && (
                        <div className="text-red-400 text-[12px] mt-1">
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor=""
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Password{" "}
                      </label>
                    </div>

                    <div className="mt-2 relative">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-2 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                      {errors.password && (
                        <div className="text-red-400 text-[12px] mt-1">
                          {errors.password}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor=""
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Confirm Password{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <div className="relative">
                        <input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          name="confirmPassword"
                          id="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                        />
                        <button
                          type="button"
                          onClick={toggleConfirmPasswordVisibility}
                          className="absolute inset-y-0 right-2 flex items-center"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                        {errors.confirmPassword && (
                          <div className="text-red-400 text-[12px] mt-1">
                            {errors.confirmPassword}
                          </div>
                        )}
                      </div>
                      <Link
                        to="/"
                        title=""
                        className="text-sm flex justify-end font-semibold text-[#FFD763] hover:underline"
                      >
                        {" "}
                        Forgot password?{" "}
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center border  rounded-lg">
                    <label className="inline-flex items-center justify-center rounded-md bg-[#ffcd36] px-3.5 py-2.5 font-semibold leading-7 text-white cursor-pointer hover:bg-[#fac554]">
                      {loading ? (
                        <Loader className="animate-spin mr-2" size={20} />
                      ) : (
                        <UploadCloud className="mr-2" size={16} />
                      )}{" "}
                      {loading ? "Uploading..." : "Upload Your Picture"}
                      <input
                        type="file"
                        className="hidden"
                        name="image"
                        id="image"
                        onChange={handleFileChange}
                      />
                    </label>
                    <span className="mx-3 text-gray-600 font-semibold">
                      {filename ? filename : "No file chosen"}
                    </span>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full items-center justify-center rounded-md bg-[#ffcd36] px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-[#fac554]"
                    >
                      {uploading ? (
                        <Loader className="animate-spin mr-2" size={20} />
                      ) : (
                        "Sign up"
                      )}{" "}
                      {uploading ? "Signing up..." : "Sign up"}
                      <ArrowRight className="ml-2" size={16} />
                    </button>
                    <ToastContainer />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="mt-3 space-y-3">
            <button
              type="button"
              className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
            >
              <span className="mr-2 inline-block">
                <svg
                  className="h-6 w-6 text-rose-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.287 0 8.447-2.685 8.447-8.934 0-.593-.075-1.186-.219-1.775z" />
                </svg>
              </span>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
