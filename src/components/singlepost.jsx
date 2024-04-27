import axios from "axios";
import { useEffect, useState , useRef ,useContext, createElement} from "react";
import { useParams , useNavigate} from "react-router-dom";
import { Context } from "../context/context";

const Singlepost = () => {
  const context = useContext(Context)
  const textarearef = useRef()
  const navigate = useNavigate()
  const { id } = useParams();
  const [singlepost, setsinglepost] = useState([]);
  const [singleimg, setsingleimg] = useState([]);
  const [singleuser, setsingleuser] = useState([]);
  const [comments, setcomments] = useState([]);
  const [mycomments, setmycomments] = useState([])

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
        let responsemycomment = await axios.get("http://localhost:8000/comments");
      let filterrespones = responsemycomment.data.filter((item) => {
        return item.postId === postresponse.data.id;
      });
      setmycomments(filterrespones);
        
      
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
          {mycomments.map((element) => {
            return (
              <>
                <div className="singlecomment-single">
                  <div className="commentname-single">{element.id}</div>
                  <div className="commentemail-single">{element.email}</div>
                  <div className="commentbody-single">{element.body}</div>
                </div>
              </>
            );
          })}
        </div>
        <div className="sendcomment-single">
          <textarea
            ref={textarearef}
            className="textarea-single"
            placeholder="نظر خود را وارد کنید"
          ></textarea>
          <button
            onClick={() => {
              handlesend(textarearef.current.value);
            }}
            className="submitbtn-single"
          >
            {context.status ? "ارسال نظر" : "ارسال نظر (ثبت نام)"}
          </button>
        </div>
      </div>
    </>
  );

  async function handlesend(value) {
    if (context.status === false) {
      navigate('/register')
      return
    } else if (value === "" || value=== null) {
      alert('لطفا نظر خود را وارد کنید')
    } else {
      value = value.replace(/(\r\n|\n|\r)/gm, "");
      let newcomment = {
        "postId": singlepost.id,
        "id": context.usernameprofile,
        "email": context.emailprofile,
        "body": value
      }
      await axios.post("http://localhost:8000/comments", newcomment);
      let response = await axios.get("http://localhost:8000/comments")
      let filterrespones = response.data.filter((item) => {return item.postId === singlepost.id})
      setmycomments(filterrespones)
      textarearef.current.value = ""
    }
  }
};

export default Singlepost;
