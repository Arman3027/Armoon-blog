import { useContext, useEffect } from "react";
import { Context } from "../context/context";
import { Link } from "react-router-dom";
import axios from "axios";

const Yourblog = () => {
  let context = useContext(Context);

    return (
      <>
        <div className="container-your">
          <div className="flex-your">
            <div className="profile-your">
              <p className="name-your">{context.usernameprofile}</p>
              <p className="email-your">{context.emailprofile}</p>
            </div>
            <div
              className={
                context.myposts.length !== 0
                  ? "content-your"
                  : "contentempty-your"
              }
            >
              {context.myposts.length !== 0 ? (
                context.myposts.map((element) => {
                  return (
                    <Link
                      to={"/yourblog/" + element.id}
                      className="itemlink-your"
                    >
                      <div className="item-your">
                        <img src={element.image} className="itemimg-your" />
                        <p className="itemtitle-your">{element.title}</p>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <p className="empty-your">
                  شما هیچ بلاگی ندارید
                  <Link to={'/makeblog'} className="linkempty-your"> ایجاد بلاگ </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </>
    );
};

export default Yourblog;
