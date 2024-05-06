import { useContext, useState, useRef, useEffect } from "react";
import { Context } from "../context/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Makeblog = () => {
  const [image, setimage] = useState(null);
  const [urlimage, seturlimage] = useState([]);

  let navigate = useNavigate();
  let titleinputref = useRef(null);
  let bodyinputref = useRef(null);
  let context = useContext(Context);

  useEffect(() => {
    async function get() {
      let responseimg = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );
      responseimg.data.splice(500);
      seturlimage(responseimg.data);
    }
    get();
  }, []);

  return (
    <>
      <div className="container-make">
        <div className="flex-make">
          <div className="main-make">
            <div className="pickimg-make">
              <label className="labelselect-make" htmlFor="selectid-make">
                رنگ مدنظر را برای بلاگ خود انتخاب کنید
              </label>
              <select
                id="selectid-make"
                onChange={(e) => {
                  handlechange(e.target.value);
                }}
                className="select-make"
              >
                {urlimage.map((element) => {
                  return (
                    <>
                      <option
                        className="option-make"
                        value={element.url}
                        style={{
                          background: "#" + element.url.slice(-6),
                        }}
                      ></option>
                    </>
                  );
                })}
              </select>
            </div>
            <div className="titlepick-make">
              <p className="titletext-make">عنوان</p>
              <input
                ref={titleinputref}
                type="text"
                className="titleinput-make"
              />
            </div>
            <div className="bodypick-make">
              <p className="bodytext-make">متن</p>
              <textarea
                ref={bodyinputref}
                type="text"
                className="bodytextarea-make"
              />
            </div>
            <button
              className="submitmake-make"
              onClick={() => {
                handlequestion(titleinputref.current, bodyinputref.current);
              }}
            >
              ارسال پست
            </button>
          </div>
        </div>
      </div>
    </>
  );

  function handlechange(value) {
    if (value) {
      setimage(value);
    }
  }


  function handlequestion(titleref,bodyref) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <p className="are-you-sure">آیا از این کار مطمئنی؟</p>
            <div className="pack-btn-question">
              <button className="no-btn-question" onClick={onClose}>
                نه
              </button>
              <button
                onClick={() => {
                  handlesubmit(titleref , bodyref);
                  onClose();
                }}
                className="yes-btn-question"
              >
                آره 
              </button>
            </div>
          </div>
        );
      },
    });
  }

  function handlesubmit(titleinputref, bodyinputref) {
    if (
      context.status === true &&
      image !== null &&
      titleinputref.value !== "" &&
      bodyinputref.value !== ""
    ) {
      let person = {
        name: context.usernameprofile,
        image:image,
        title: titleinputref.value,
        body: bodyinputref.value.replace(/(\r\n|\n|\r)/gm, ""),
      };
      fetch("http://localhost:8000/myPosts", {
        method: "POST",
        headers: { "content-type": "aplication/json" },
        body: JSON.stringify(person),
      })
        .then(() => {
        toast.success("با موفقیت انجام شد", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
         const settimeout =  setTimeout(() => {
          navigate("/");
           window.location.reload();
         }, 3000)
        })
        .catch((err) => {
          alert(err.massage);
        });
    } else {
        toast.warning("موارد خواسته شده را پر کنید", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
    }
  }
};

export default Makeblog;
