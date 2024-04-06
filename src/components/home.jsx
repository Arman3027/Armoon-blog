import Img from "../images/img1.png";
import { Context } from "../context/context";
import { useContext, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

const Home = () => {
  let refmorebtn = useRef(null);
  const context = useContext(Context);

  return (
    <>
      <div className="container-home">
        <div className="flex-home">
          <div className="main-home">
            <div className="mainadpage-home">
              <button className="adbtn-home">ثبت نام کن</button>
              <p className="ad-home"> وبلاگ خودتو بنویس</p>
            </div>
            <div className="imgpack-home">
              <img src={Img} className="img-home" />
              <p className="Arm-home">Armoon-blog</p>
            </div>
          </div>
          <div className="content-home">
            <p className="text-home">مطالب و مقالات</p>
            <input
              type="text"
              placeholder="جستوجو"
              className="search-home"
              onChange={(e) => {
                handlechange(e.target.value);
              }}
            />
            <div className="grid-home">
              {context.filterposts
                .slice(0, context.more)
                .map((element, index) => {
                  return (
                    <Link to={`/${element.id}`} className="itemlink-home">
                      <div className="item-home">
                        <img
                          src={context.photos[index].thumbnailUrl}
                          className="itemimg-home"
                        />
                        <p className="itemtitle-home">{element.title}</p>
                        <p className="itemname-home">
                          {context.users.map((item) =>
                            item.id === element.userId ? item.name : null
                          )}
                          : نویسنده
                        </p>
                      </div>
                    </Link>
                  );
                })}
            </div>
            <button
              className="morebtn-home"
              onClick={() => {
                handlemore(refmorebtn.current);
              }}
              ref={refmorebtn}
            >
              بیشتر
            </button>
          </div>
        </div>
      </div>
    </>
  );

  //  ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,functions

  function handlemore(refmorebtn) {
    context.onmore(refmorebtn);
  }

  function handlechange(value) {
    context.onchange(value);
  }
};

export default Home;
