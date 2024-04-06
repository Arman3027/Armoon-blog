import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Singlepost = () => {
  const { id } = useParams();
  const [singlepost, setsinglepost] = useState([]);
  const [singleimg, setsingleimg] = useState([]);
  const [singleuser, setsingleuser] = useState([]);

  useEffect(() => {
    async function getitem() {
      let postresponse = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      let imgresponse = await axios.get(
        `https://jsonplaceholder.typicode.com/photos/${id}`
      );
      let useresponse = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${postresponse.data.userId}`
      );
      setsingleuser(useresponse.data);
      setsinglepost(postresponse.data);
      setsingleimg(imgresponse.data);
    }
    getitem();
  }, []);

  return (
    <>
      <div className="item-single">
        <img src={singleimg.thumbnailUrl} className="img-single"/>
              <p className="title-single">{singlepost.title}</p>
              <p className="name-single"> نویسنده :{singleuser.name}</p>
              <p className="body-single">{singlepost.body}</p>
      </div>
    </>
  );
};

export default Singlepost;
