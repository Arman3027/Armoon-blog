import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Singlemypost = () => {
  const { mypostid } = useParams();
  const [singelmypost, setsinglemypost] = useState([]);

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
      </div>
    </>
  );
};

export default Singlemypost;
