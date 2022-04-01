import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

function Login() {
  const auth = getAuth();

  const [user, Setuser] = useState(auth.currentUser);

  const email = useRef();
  const password = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      Setuser(user);
    });
  }, []);

  if (user) {
    navigate("/home", { replace: true });
  }

  return (
    <div>
      <header>
        <div className="h-screen bg-gray-100 flex justify-center">
          <div className="py-6 px-8 h-80 mt-20 bg-white rounded shadow-xl">
            <form>
              <div className="mb-6">
                <label for="email" className="block text-gray-800 font-bold">
                  Email:
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  ref={email}
                  placeholder="@email"
                  className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
                />
              </div>

              <div>
                <label for="password" className="block text-gray-800 font-bold">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  ref={password}
                  placeholder="password"
                  className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
                />

                <a
                  href="#"
                  className="text-sm font-thin text-gray-800 hover:underline mt-2 inline-block hover:text-indigo-600"
                >
                  Signup?
                </a>
              </div>

              <button
                onClick={async (event) => {
                  event.preventDefault();

                  try {
                    await signInWithEmailAndPassword(
                      auth,
                      email.current.value,
                      password.current.value
                    );
                  } catch {
                    alert("login failed");
                  }
                }}
                className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Login;
