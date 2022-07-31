import React from "react";
import { Link, NavLink } from "react-router-dom";
import { footer, footer2 } from "../../data/Data";
import "./footer.css";

const Footer = () => {
  let auth = localStorage?.getItem("user");

  return (
    <>
      {/* {localStorage.getItem("user") !== null && ( */}
      <>
        <section className="footerContact">
          <div className="container">
            <div className="send flex">
              <div className="text">
                <h1>Do You Have Questions ?</h1>
                <p>We'll help you to grow your career and growth.</p>
              </div>
              <a href="/contactus" className="btn5">
                Contact Us Today
              </a>
            </div>
          </div>
        </section>
        <footer>
          <div className="container">
            <div className="box">
              <div className="logo">
                <img src="../images/logo-light.png" alt="" />
                <h2>Do You Need Help With Anything?</h2>
                <p>Receive updates</p>

                <div className="input flex">
                  <input type="text" placeholder="Email Address" />
                  <button>Subscribe</button>
                </div>
              </div>
            </div>
            {JSON.parse(auth)?.role === "user" ? (
              <>
                {footer.map((val) => (
                  <div className="box">
                    <h3>{val.title}</h3>
                    <ul>
                      {val.text.map((items) => (
                        <a href={items?.link}>
                          <li> {items.list} </li>
                        </a>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            ) : (
              <>
                {footer2.map((val) => (
                  <div className="box">
                    <h3>{val.title}</h3>
                    <ul>
                      {val.text.map((items) => (
                        <a href={items?.link}>
                          <li> {items.list} </li>
                        </a>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            )}
          </div>
        </footer>
      </>
      {/* )} */}

      <div className="legal">
        <span>© 2022 RentPay. Designd By Tauseef Gulzar.</span>
      </div>
    </>
  );
};

export default Footer;
