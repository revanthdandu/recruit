import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { async } from "@firebase/util";

function Home() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [company, Setcompany] = useState([]);
  const [companylist, Setcompanylist] = useState([]);
  const [user, SetUser] = useState(auth.currentUser);

  const name = useRef();
  const website = useRef();
  const phone = useRef();
  const address = useRef();
  const city = useRef();
  const state = useRef();
  const country = useRef();
  const industry = useRef();

  const id = useRef("");

  useEffect(() => {
    (async () => {
      await compdata();
    })();
  }, []);

  const comp = collection(db, "Company");

  const changeInputHandler = (event) => {
    const { name, value } = event.target;

    Setcompany({ ...company, [name]: value });
  };

  const postdata = async () => {
    if (id.current === "") {
      await addDoc(comp, company);
    } else {
      const cmpnyRef = doc(db, "Company", id.current);
      await updateDoc(cmpnyRef, company);
    }

    Setcompany("");

    name.current.value = "";
    website.current.value = "";
    city.current.value = "";
    state.current.value = "";
    country.current.value = "";
    industry.current.value = "";
    phone.current.value = "";
    address.current.value = "";
    id.current = "";

    await compdata();
  };

  const compdata = async () => {
    const data = await getDocs(comp);
    console.log(data.docs);
    Setcompanylist(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      SetUser(user);
    });
  }, []);

  if (!user) {
    navigate("/", { replace: true });
  }

  return (
    <div>
      <div className="flex justify-end p-3 mr-6 mt-6">
        <div className="text-center justify-center w-28 p-1 border-2 border-red-500 rounded-md bg-red-500 text-slate-100 font-semibold">
          <button
            onClick={() => {
              signOut(auth);
            }}
          >
            SIGNOUT
          </button>
        </div>
      </div>
      <div className="p-3">
        <div className="flex justify-center pl-96 pr-96">
          {/* edit item start */}
          <div className="border-2 border-slate-400 shadow-lg p-3 rounded-lg items-center">
            <div className="font-semibold text-center underline">
              ADD / UPDATE
            </div>
            <div className="p-5">
              <div>
                <input
                  id=""
                  name="name"
                  ref={name}
                  onChange={changeInputHandler}
                  type="text"
                  placeholder="Name..."
                  className="border-2 rounded-md pl-4 mb-2 w-full p-1 shadow-sm"
                />
                <input
                  id=""
                  name="website"
                  ref={website}
                  onChange={changeInputHandler}
                  type="text"
                  placeholder="Website..."
                  className="border-2 rounded-md pl-4 mb-2 w-full p-1 shadow-sm"
                />
                <input
                  id=""
                  name="phone"
                  ref={phone}
                  onChange={changeInputHandler}
                  type="number"
                  placeholder="Phone Number..."
                  className="border-2 rounded-md pl-4 mb-2 w-full p-1 shadow-sm"
                />
                <textarea
                  id=""
                  name="address"
                  ref={address}
                  onChange={changeInputHandler}
                  type="text"
                  placeholder="Address..."
                  className="border-2 rounded-md pl-4 mb-2 w-full p-1 shadow-sm"
                />
                <input
                  id=""
                  name="city"
                  ref={city}
                  onChange={changeInputHandler}
                  type="text"
                  placeholder="City..."
                  className="border-2 rounded-md pl-4 mb-2 w-full p-1 shadow-sm"
                />
                <input
                  id=""
                  name="state"
                  ref={state}
                  onChange={changeInputHandler}
                  type="text"
                  placeholder="State..."
                  className="border-2 rounded-md pl-4 mb-2 w-full p-1 shadow-sm"
                />
                <input
                  id=""
                  name="country"
                  ref={country}
                  onChange={changeInputHandler}
                  type="text"
                  placeholder="Country..."
                  className="border-2 rounded-md pl-4 mb-2 w-full p-1 shadow-sm"
                />
                <div>
                  <select
                    id=""
                    ref={industry}
                    name="industry"
                    className="w-full p-2 text-center border-2 rounded-md font-medium text-lg"
                    onChange={changeInputHandler}
                  >
                    <option value="sel">Select one of them</option>
                    <option value="Account">Account</option>
                    <option value="IT">IT</option>
                    <option value="Sales">Sales</option>
                    <option value="Health Care">Health Care</option>
                  </select>
                </div>

                <div className="pt-2 text-center">
                  <button
                    id=""
                    name=""
                    type="submit"
                    onClick={postdata}
                    className="border-2 border-green-200 p-1 pl-4 pr-4 rounded-md bg-green-200 font-semibold shadow-lg"
                  >
                    ADD / UPDATE
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* edit items end */}
        </div>
        <div className="mt-20 pl-24 pr-24">
          <div>
            <table className="w-full rounded-md">
              <tr>
                <th>Name</th>
                <th>Website</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Industry</th>
                <th></th>
              </tr>
              {companylist.map((cmpny) => {
                return (
                  <tr>
                    <td>{cmpny.name}</td>
                    <td>
                      <a href={cmpny.website} target="_blank">
                        {cmpny.website}
                      </a>
                    </td>
                    <td>{cmpny.phone}</td>
                    <td>{cmpny.address}</td>
                    <td>{cmpny.city}</td>
                    <td>{cmpny.state}</td>
                    <td>{cmpny.country}</td>
                    <td>{cmpny.industry}</td>
                    <td>
                      <button
                        onClick={() => {
                          name.current.value = cmpny.name;
                          website.current.value = cmpny.website;
                          city.current.value = cmpny.website;
                          state.current.value = cmpny.state;
                          country.current.value = cmpny.country;
                          industry.current.value = cmpny.industry;
                          phone.current.value = cmpny.phone;
                          address.current.value = cmpny.address;

                          id.current = cmpny.id;
                        }}
                        className="p-1 pl-4 pr-4 border-2 rounded-md border-blue-500 text-blue-500 font-semibold"
                      >
                        Edit
                      </button>
                      <div className="pt-2 text-center">
                        <button
                          onClick={async () => {
                            const cmpnyRef = doc(db, "Company", cmpny.id);
                            await deleteDoc(cmpnyRef);

                            await compdata();
                          }}
                          id=""
                          name=""
                          type="submit"
                          className="border-2 border-red-500 p-1 pl-4 pr-4 rounded-md bg-red-500 font-semibold shadow-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
