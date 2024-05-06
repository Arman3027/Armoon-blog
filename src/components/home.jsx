import Img from "../images/img1.png";
import { Context } from "../context/context";
import { useContext, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

const Home = () => {
  let refmorebtn = useRef(null);
  let refsearch = useRef(null);
  const context = useContext(Context);

  return (
    <>
      <div className="container-home">
        <div className="flex-home">
          <div className="main-home">
            <div className="mainadpage-home">
              <Link to={context.status ? '/makeblog' : '/register'}>
                <button className="adbtn-home">{context.status? 'ایجاد بلاگ' : 'ثبت نام کن'}</button>
              </Link>
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
                handlechange(e.target.value, refmorebtn.current);
              }}
              ref={refsearch}
              value={context.search}
            />
            <div className="grid-home">
              {context.filterposts.slice(0, context.more).map((element) => {
                return (
                  <Link to={`/singlepost/${element.id}`} className="itemlink-home">
                    <div className="item-home">
                      <img
                        src={context.photos[element.id - 1].url}
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
              style={{ display: context.isactive ? "none" : "block" }}
            >
              بیشتر
            </button>
          </div>
        </div>
      </div>
    </>
  );

  //  ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,functions

  function handlemore(refmorebtn ) {
    context.onmore(refmorebtn );
  }

  function handlechange(value , refmorebtn) {
    context.onchange(value , refmorebtn);
  }
};

export default Home;
