import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style/style.css";
import axios from "axios";
import { Context } from "./context/context";
import Home from "./components/home";
import Navbar from "./components/navbar";
import Singlepost from "./components/singlepost";

const App = () => {
  const [posts, setposts] = useState([]);
  const [filterposts, setfilterposts] = useState([]);
  const [users, setusers] = useState([]);
  const [photos, setphotos] = useState([]);
  const [more, setmore] = useState(15);
  const [isactive, setisactive] = useState(false);
  const [search, setsearch] = useState('');

  useEffect(() => {
    async function getapi() {
      let imgresponse = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );
      let userresponse = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      let postresponse = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      imgresponse.data.splice(500);
      setposts(postresponse.data);
      setfilterposts(postresponse.data);
      setusers(userresponse.data);
      setphotos(imgresponse.data);
    }
    getapi();
  }, []);


  return (
    <>
      <Context.Provider
        value={{
          search: search,
          isactive : isactive,
          setmore: setmore,
          more: more,
          posts: posts,
          filterposts: filterposts,
          users: users,
          photos: photos,
          onmore: handlemore,
          onchange: handlechange,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Singlepost />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </Context.Provider>
    </>
  );

  //  ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,functions

  function handlemore(refmorebtn) {
    setmore();
    refmorebtn.style.display = 'none'
    setisactive(true)
  }

  function handlechange(value, refmorebtn) {
    setsearch(value)
    setmore();
    refmorebtn.style.display = "none";
    setisactive(true);
    let newposts;
    newposts = posts.filter((item) =>
      item.title.toString().toLowerCase().includes(value.toLowerCase())
    );
    setfilterposts(newposts);
  }
};

export default App;
