import "./App.css";
import { useSnackbar } from "notistack";
import { useForm, Controller } from "react-hook-form";

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const Formdata = await response.json();
      if (response.ok) {
        enqueueSnackbar(Formdata.message, { variant: "success" });
      } else {
        enqueueSnackbar(Formdata.message.errors[0].msg, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("An error occurred while sending email", {
        variant: "error",
      });
    }
  };
  return (
    <>
      <div
        className="flex items-center justify-center
								w-screen min-h-screen bg-gray-100 text-gray-800 p-10"
      >
        <div
          className="w-full h-118 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/2 2xl:h-1/3 xl:1/3 bg-mail bg-center
								      bg-white shadow-xl flex flex-col rounded-l"
        >
          <div className="w-full sm:h-118 md:h-118 lg:h-120 xl:h-120 2xl:h-128 flex items-center justify-center">
            <div
              className="sm:w-3/4 md:w-2/3 lg:w-3/4 xl:w-3/4 2xl:w-[380px] 2xl:h-[430px]  mt-24 
								      bg-white shadow-xl  rounded-xl"
            >
              <div className="w-full">
                <h2 className="text-2xl mx-6 mt-5 font-bold">Contact Us</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex mx-6 mt-3">
                    <div className="w-1/2 flex flex-col mr-3">
                      <label
                        className="mb-2 font-bold text-sm"
                        htmlFor="firstname"
                      >
                        First name
                      </label>
                      <Controller
                        name="firstname"
                        defaultValue=""
                        rules={{
                          required: "Firstname is Required",
                          minLength: {
                            value: 3,
                            message: "Minimum 3 characters",
                          },
                        }}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            placeholder="First name"
                            className={`rounded-md border p-2 text-xs ${
                              errors.firstname
                                ? "border-red-500 focus:outline-none focus:border-red-500"
                                : ""
                            }`}
                            type="text"
                            id="firstname"
                          />
                        )}
                      />
                      <small className="text-xs text-red-500 h-3 mt-1">
                        {errors?.firstname?.message}
                      </small>
                    </div>
                    <div className="w-1/2 flex flex-col">
                      <label
                        className="mb-2 font-bold text-sm"
                        htmlFor="lastname"
                      >
                        Last name
                      </label>
                      <Controller
                        name="lastname"
                        defaultValue=""
                        rules={{
                          required: "Lastname is Required",
                          minLength: {
                            value: 3,
                            message: "Minimum 3 characters ",
                          },
                        }}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            placeholder="Last name"
                            className={`rounded-md border p-2 text-xs ${
                              errors.lastname
                                ? "border-red-500 focus:outline-none focus:border-red-500"
                                : ""
                            }`}
                            type="text"
                            id="lastname"
                          />
                        )}
                      />
                      <small className="text-xs text-red-500 h-3 mt-1">
                        {errors?.lastname?.message}
                      </small>
                    </div>
                  </div>
                  <div className="flex mx-6 mt-3">
                    <div className="w-1/2 flex flex-col mr-3">
                      <label className="mb-2 font-bold text-sm" htmlFor="email">
                        Email
                      </label>
                      <Controller
                        name="email"
                        defaultValue=""
                        rules={{
                          required: "Email is Required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
                            message: "Email Id is invalid",
                          },
                        }}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            placeholder="Email"
                            className={`rounded-md border p-2 text-xs ${
                              errors.email
                                ? "border-red-500 focus:outline-none focus:border-red-500"
                                : ""
                            }`}
                            type="text"
                            id="email"
                          />
                        )}
                      />
                      <small className="text-xs text-red-500 h-3 mt-1">
                        {errors?.email?.message}
                      </small>
                    </div>
                    <div className="w-1/2 flex flex-col">
                      <label className="mb-2 font-bold text-sm" htmlFor="phone">
                        Phone number
                      </label>
                      <Controller
                        name="phone"
                        defaultValue=""
                        rules={{
                          required: "Phone is Required",
                          minLength: {
                            value: 11,
                            message: "Must be 11 characters",
                          },
                          maxLength: {
                            value: 11,
                            message: "Must be 11 characters",
                          },
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Please enter a number",
                          },
                        }}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            placeholder="Phone number"
                            className={`rounded-md border p-2 text-xs ${
                              errors.phone
                                ? "border-red-500 focus:outline-none focus:border-red-500"
                                : ""
                            }`}
                            type="text"
                            id="phone"
                          />
                        )}
                      />

                      {errors?.phone?.message ? (
                        <small className="text-xs text-red-500 h-3 mt-1 m-0 p-0">
                          {errors?.phone?.message}
                        </small>
                      ) : (
                        ""
                      )}

                      <small className="text-xs text-red-500 h-3 mt-1">
                        {errors?.phone?.message}
                      </small>
                    </div>
                  </div>
                  <div className="w-full flex flex-col">
                    <label
                      className="ml-7 mb-2 mt-2 font-bold text-sm"
                      htmlFor="message"
                    >
                      Message:
                    </label>
                    <Controller
                      name="message"
                      defaultValue=""
                      rules={{
                        required: "Message is Required",
                      }}
                      control={control}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          placeholder="Leave us a message..."
                          className={`min-h-[70px] ml-7 mr-4 p-2 border rounded-md text-xs ${
                            errors.message
                              ? "border-red-500 focus:outline-none focus:border-red-500"
                              : ""
                          }`}
                          id="message"
                        ></textarea>
                      )}
                    />
                    <small className="text-xs text-red-500 h-3 mt-1 ml-7">
                      {errors?.message?.message}
                    </small>
                  </div>
                  <div className="w-full flex flex-col">
                    <button className="border rounded-xl m-4 ml-7 p-2 bg-black text-white">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
