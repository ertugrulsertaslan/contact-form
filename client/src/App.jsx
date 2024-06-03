import "./App.css";
import { useState } from "react";
function App() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    message: "",
    email: "",
    phone: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.text();
      console.log("Success:", responseData);
      setResponseMessage("Email sent");
    } catch (error) {
      console.error("Error:", error);
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
                <h2 className="text-2xl m-6 font-bold">Contact Us</h2>
                <form onSubmit={handleSubmit}>
                  <div className="flex m-6">
                    <div className="w-1/2 flex flex-col mr-3">
                      <label
                        className="mb-2 font-bold text-sm"
                        htmlFor="firstname"
                      >
                        First name
                      </label>
                      <input
                        placeholder="First name"
                        className="border rounded-md p-2 text-xs"
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-1/2 flex flex-col">
                      <label
                        className="mb-2 font-bold text-sm"
                        htmlFor="lastname"
                      >
                        Last name
                      </label>
                      <input
                        placeholder="Last name"
                        className="border rounded-md p-2 text-xs"
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex m-6">
                    <div className="w-1/2 flex flex-col mr-3">
                      <label className="mb-2 font-bold text-sm" htmlFor="email">
                        Email
                      </label>
                      <input
                        placeholder="Email"
                        className="border rounded-md p-2 text-xs"
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-1/2 flex flex-col">
                      <label className="mb-2 font-bold text-sm" htmlFor="phone">
                        Phone number
                      </label>
                      <input
                        placeholder="Phone number"
                        className="border rounded-md p-2 text-xs"
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col">
                    <label
                      className="ml-7 mb-2 font-bold text-sm"
                      htmlFor="message"
                    >
                      Message:
                    </label>
                    <textarea
                      placeholder="Leave us a message..."
                      className="min-h-[70px] ml-7 mr-4 p-2 border rounded-md text-xs"
                      id="message"
                      name="message"
                      value={formData.message}
                      required
                      onChange={handleChange}
                    ></textarea>
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
