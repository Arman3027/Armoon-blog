import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Singlepost = () => {
  const { id } = useParams();
  const [singlepost, setsinglepost] = useState([]);
  const [singleimg, setsingleimg] = useState([]);
  const [singleuser, setsingleuser] = useState([]);
  const [comments, setcomments] = useState([]);

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
      let commentresponse = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );
      setsingleuser(useresponse.data);
      setsinglepost(postresponse.data);
      setsingleimg(imgresponse.data);
      let filtered = commentresponse.data.filter((item) => {
        return item.postId === postresponse.data.id;
      });
      setcomments(filtered);
    }
    getitem();
  }, []);

  return (
    <>
      <div className="container-single">
        <div className="main-single">
          <div className="item-single">
            <img src={singleimg.url} className="img-single" />
            <p className="title-single">{singlepost.title}</p>
            <p className="name-single"> نویسنده :{singleuser.name}</p>
            <p className="body-single">{singlepost.body}</p>
          </div>
        </div>
        نظرات :
        <div className="comments-single">
          {comments.map((element) => {
            return (
              <>
                <div className="singlecomment-single">
                  <div className="commentname-single">{element.name}</div>
                  <div className="commentemail-single">{element.email}</div>
                  <div className="commentbody-single">{element.body}</div>
                </div>
              </>
            );
          })}
        </div>
        <div className="sendcomment-single">
          <textarea className="textarea-single" placeholder="نظر خود را وارد کنید"></textarea>
          <button className="submitbtn-single">ثبت نام (ارسال نظر)</button>
          <button className="sendbtn-single">ارسال نظر</button>
        </div>
      </div>
    </>
  );
};

export default Singlepost;
