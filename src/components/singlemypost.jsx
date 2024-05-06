import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { confirmAlert  } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Singlemypost = () => {
  const { mypostid } = useParams();
  const [singelmypost, setsinglemypost] = useState([]);
  let navigate = useNavigate()

  useEffect(() => {
    async function getitem() {
      let singlemypostresponse = await axios.get(
        "http://localhost:8000/myPosts/" + mypostid
      );
      setsinglemypost(singlemypostresponse.data);
    }
    getitem();
  }, []);

  return (
    <>
      <div className="container-singlemy">
        <div className="main-singlemy">
          <img src={singelmypost.image} className="image-singlemy" />
          <p className="title-singlemy">{singelmypost.title}</p>
          <p className="name-singlemy"> نویسنده : {singelmypost.name}</p>
          <p className="body-singlemy">{singelmypost.body}</p>
        </div>
        <button className="dltbtn-singlemy" onClick={handlequestion}>حذف</button>
      </div>
    </>
  );

  function handlequestion() {
    confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="custom-ui">
          <p className="are-you-sure">می خواهید این بلاگ را حذف کنید؟</p>
          <div className="pack-btn-question">
            <button className="no-btn-question" onClick={onClose}>
              نه
            </button>
            <button
              onClick={() => {
                handledelete();
                onClose();
              }}
              className="yes-btn-question"
            >
              آره , حذف کن
            </button>
          </div>
        </div>
      );
    },
  });
  }

  async function handledelete() {
    await axios
      .delete("http://localhost:8000/myPosts/" + mypostid)
    navigate('/')
    window.location.reload()
  }

};

export default Singlemypost;
