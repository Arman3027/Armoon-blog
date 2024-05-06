import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style/style.css";
import axios from "axios";
import { Context } from "./context/context";
import Home from "./components/home";
import Navbar from "./components/navbar";
import Singlepost from "./components/singlepost";
import Register from "./components/register";
import Login from "./components/login";
import Makeblog from "./components/makeblog";
import Yourblog from "./components/yourblog";
import Singlemypost from "./components/singlemypost";
import Not_found from "./components/not found";
import Protect from "./components/protect";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [posts, setposts] = useState([]);
  const [filterposts, setfilterposts] = useState([]);
  const [users, setusers] = useState([]);
  const [photos, setphotos] = useState([]);
  const [more, setmore] = useState(15);
  const [isactive, setisactive] = useState(false);
  const [search, setsearch] = useState("");
  const [status, setstatus] = useState(false);
  const [usernameprofile, setusernameprofile] = useState("");
  const [passwordprofile, setpasswordprofile] = useState("");
  const [emailprofile, setemailprofile] = useState("");
  const [myposts, setmyposts] = useState([]);

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

      let username = sessionStorage.getItem("username");
      if ((username !== "", username !== null)) {
        let profileresponse = await axios.get(
          "http://localhost:8000/users/" + username
        );
        setemailprofile(profileresponse.data.email);
        setpasswordprofile(profileresponse.data.password);
        setusernameprofile(profileresponse.data.id);
        setstatus(true);

        let responsemypost = await axios.get("http://localhost:8000/myPosts");
        let filtermyposts = responsemypost.data.filter(
          (item) => item.name === username
        );
        setmyposts(filtermyposts);
      }
    }
    getapi();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          search: search,
          isactive: isactive,
          setmore: setmore,
          more: more,
          posts: posts,
          filterposts: filterposts,
          users: users,
          photos: photos,
          onmore: handlemore,
          onchange: handlechange,
          status: status,
          setstatus: setstatus,
          setemailprofile: setemailprofile,
          emailprofile: emailprofile,
          setpasswordprofile: setpasswordprofile,
          passwordprofile: passwordprofile,
          setusernameprofile: setusernameprofile,
          usernameprofile: usernameprofile,
          myposts: myposts,
        }}
      >
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
        <Routes>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Home />} />
          <Route path="/singlepost/:id" element={<Singlepost />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<Protect />}>
            <Route path="/makeblog" element={<Makeblog />} />
            <Route path="/yourblog" element={<Yourblog />} />
          </Route>
          <Route path="/yourblog" element={<Yourblog />} />
          <Route path="/yourblog/:mypostid" element={<Singlemypost />} />
          <Route path="not-found" element={<Not_found />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </Context.Provider>
    </>
  );

  //  ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,functions

  function handlemore(refmorebtn) {
    setmore();
    refmorebtn.style.display = "none";
    setisactive(true);
  }

  function handlechange(value, refmorebtn) {
    setsearch(value);
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
