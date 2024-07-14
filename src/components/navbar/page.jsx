"use client";
import React, { useContext, useState } from "react";
import styles from "./page.module.css";
import mainlogo from "./../../../public/assets/logo.png";
import meng from "./../../../public/assets/meng.png";
import mhin from "./../../../public/assets/mhin.png";
import engBtn from "./../../../public/assets/engBtn.png";
import hamburger from "./../../../public/assets/hamburger.png";
import Image from "next/image";
import Link from "next/link";
import { BooleanContext } from "@/app/context";

const Navbar = () => {
  const [openLine, setOpenLine] = useState(false);

  const handleLineClick = () => {
    setOpenLine(!openLine);
  };
  const { english } = useContext(BooleanContext);
  const { setEnglish } = useContext(BooleanContext);

  const handleLineClickTow = () => {
    setEnglish(!english);
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Link className={styles.lin} href="/">
          <Image
            className={styles.logo}
            src={mainlogo}
            width={180}
            alt="img"
            style={{ height: "auto" }}
            placeholder="blur"
          />
        </Link>
      </div>

      <div className={styles.leftside}>
        <div className={styles.item1}>
          <Link className={styles.lin} href="/">
            <span className={english? styles.section : styles.hinsection}>
              {!english && `होम`}
              {english && `HOME`}
            </span>
          </Link>
          <Link className={styles.lin} href="/about">
          <span className={english? styles.section : styles.hinsection}>
              {!english && `विषय`}
              {english && `ABOUT`}
            </span>
          </Link>

          <Link className={styles.lin} href="/contact">
          <span className={english? styles.section : styles.hinsection}>
              {!english && `संपर्क`}
              {english && `CONTACT`}
            </span>
          </Link>
          <Link className={styles.lin} href="/#portfolio">
          <span className={english? styles.section : styles.hinsection}>
              {!english && `पोर्टफोलियो`}
              {english && `PORTFOLIO`}
            </span>
          </Link>
        </div>
      </div>

      <div className={styles.navStyle}>
        <div className={styles.itm1}>
          <img src="/assets/call.png" alt="icon" className={styles.callIcon} />
          +91 8069859743
        </div>
        <Link className={styles.lin} href="/contact">
          <img
            src={english ? "/assets/navBtn.png" : "/assets/hget.png"}
            alt="icon"
            className={styles.navBtn}
          />
        </Link>

        {!english && (
          <Image
            className={styles.engBtn}
            src={meng}
            width={335}
            alt="img"
            style={{ height: "auto" }}
            onClick={handleLineClickTow}
          />
        )}
        {english && (
          <Image
            className={styles.engBtn}
            src={mhin}
            width={335}
            alt="img"
            style={{ height: "auto" }}
            onClick={handleLineClickTow}
          />
        )}
      </div>

      <Image
        className={styles.hamburger}
        src={hamburger}
        width={35}
        alt="img"
        style={{ height: "auto" }}
        onClick={handleLineClick}
      />

      {!english && (
        <Image
          className={styles.meng}
          src={meng}
          width={35}
          alt="img"
          style={{ height: "auto" }}
          onClick={handleLineClickTow}
        />
      )}
      {english && (
        <Image
          className={styles.meng}
          src={mhin}
          width={35}
          alt="img"
          style={{ height: "auto" }}
          onClick={handleLineClickTow}
        />
      )}

      {openLine && (
        <div className={styles.divsec}>
          <div className={styles.cross} onClick={() => setOpenLine(false)}>
            X
          </div>
          <Link
            className={styles.lin}
            href="/"
            onClick={() => setOpenLine(false)}
          >
            <span className={styles.sectionm}>Home</span>
          </Link>
          <Link
            className={styles.lin}
            href="/about"
            onClick={() => setOpenLine(false)}
          >
            <span className={styles.sectionm}>About</span>
          </Link>
          <Link
            className={styles.lin}
            href="/#portfolio"
            onClick={() => setOpenLine(false)}
          >
            <span className={styles.sectionm}>Portfolio</span>
          </Link>
          <Link
            className={styles.lin}
            href="/contact"
            onClick={() => setOpenLine(false)}
          >
            <span className={styles.sectionm}>Contact</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
