import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useState } from "react";
import Cards from "react-credit-cards-2";
import { PulseLoader } from "react-spinners";
import { toast, Toaster } from "react-hot-toast";
import { updateData } from "../../Logics/updateData";
import { useDispatch, useSelector } from "react-redux";
import { AppState, setUser } from "../../store/Slice";

const PaymentForm = () => {
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [focus, setFocus] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currency, setCurrency] = useState("USD");

  const { user } = useSelector((root: { app: AppState }) => root.app);
  const dispatch = useDispatch();

  const handleInputFocus = (e: any) => setFocus(e.target.name);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "cvc") setCvc(value);
    if (name === "expiry") setExpiry(value);
    if (name === "name") setName(value);
    if (name === "number") setNumber(value);
  };

  const validateCreditCard = (
    number: string,
    name: string,
    expiry: string,
    cvc: string
  ) => {
    if (!number || !name || !expiry || !cvc) {
      toast.error("All fields are required");
      return false;
    }

    if (!/^\d{16}$/.test(number)) {
      toast.error("Invalid card number");
      return false;
    }

    if (expiry.length < 4) {
      toast.error("Invalid expiry date");
      return false;
    }

    if (!/^\d{3}$/.test(cvc)) {
      toast.error("Invalid CVC");
      return false;
    }

    return true;
  };

  const submitCard = async () => {
    if (!validateCreditCard(number, name, expiry, cvc)) return;

    setIsLoading(true);

    if (user) {
      await updateData("Users", user.docId as string, {
        ...user,
        registrationCompleted: true,
      });
      localStorage.setItem(
        "User",
        JSON.stringify({ ...user, registrationCompleted: true })
      );
      dispatch(setUser({ ...user, registrationCompleted: true }));
    }

    setTimeout(() => {
      setIsLoading(false);
      setOpenAlert(true);
    }, Math.floor(Math.random() * 5000) + 1000);
  };

  return (
    <>
      <Toaster />

      {/* ================= MODAL ================= */}
      {openAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Payment</h3>
              <button
                onClick={() => setOpenAlert(false)}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            <div className="text-center">
              <img
                src="/delcinedCard.png"
                className="w-24 h-24 mx-auto rounded-full"
                alt=""
              />
              <h5 className="mt-3 font-bold text-lg">
                PAYMENT UNAVAILABLE
              </h5>
              <p className="text-sm text-gray-600 mt-2">
               Payment is currently unavailable in your country at this time.
Please contact your local agent to make the payment through our PIS Portal, or email    <a
                  href="mailto:support@tromsoil.com"
                  className="text-blue-600 underline"
                >
                  support@tromsoil.com 
                </a> for assistance.

             
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setOpenAlert(false)}
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= FORM ================= */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 w-full flex lg:flex-row" style={{gap:10,maxWidth:700,
           display: window.innerWidth > 900 ? "flex" : "block"
        }}>
          <div className="flex justify-center mb-4">
            <Cards
              cvc={cvc}
              expiry={expiry}
              focused={focus as "name"}
              name={name}
              number={number}
            />
          </div>

          <div className="space-y-3">
            <input
              type="tel"
              name="number"
              placeholder="Card Number"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black"
            />

            <input
              type="text"
              name="name"
              placeholder="Cardholder Name"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <div className="flex gap-2">
              <input
                type="number"
                name="expiry"
                placeholder="MMYY"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className="w-1/2 px-4 py-2 border rounded-lg"
              />
              <input
                type="number"
                name="cvc"
                placeholder="CVC"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className="w-1/2 px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Amount"
                className="w-1/2 px-4 py-2 border rounded-lg"
              />

              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-1/2 px-4 py-2 border rounded-lg"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            <button
              onClick={submitCard}
              className="w-full mt-4 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition"
            >
              {isLoading ? <PulseLoader color="white" /> : "Process Request"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
