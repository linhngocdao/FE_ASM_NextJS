/* eslint-disable @next/next/no-img-element */
import styles from "./styles/Header.module.scss";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineArrowDropDown, MdOutlineShoppingBag } from "react-icons/md";
import {
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineClose,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineBars,
} from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../models/user";
import { signout } from "../../features/auth/auth.slice";
type Props = {};

const Header = (props: Props) => {
  const boxCart = useRef<HTMLDivElement>(null);
  const navBar = useRef<HTMLDivElement>(null);
  const boxUser = useRef<HTMLDivElement>(null);
  const boxSearch = useRef<HTMLDivElement>(null);
  const [showModelCart, setShowModelCart] = useState<Boolean>(false);
  const [showModelUser, setShowModelUser] = useState<Boolean>(false);
  const [showModelSearch, setShowModelSearch] = useState<Boolean>(false);
  const [showNav, setShowNav] = useState<Boolean>(false);
  const isLogged = useSelector((state: any) => state.auth.isLogged);
  const listCart = useSelector((state: any) => state.cart.cartItems);
  const curentUser = useSelector(
    (state: any) => state.auth.currentUser
  ) as IUser;
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const handleSignout = () => {
    dispatch(signout());
  };
  useEffect(() => {
    const boxCartElement = boxCart.current!;
    if (showModelCart) {
      boxCartElement.style.right = "0px";
    } else {
      boxCartElement.style.right = "-100%";
    }
  }, [showModelCart]);

  useEffect(() => {
    const navBarElement = navBar.current!;
    if (showNav) {
      navBarElement.style.left = "0px";
    } else {
      navBarElement.style.left = "-100%";
    }
  }, [showNav]);

  useEffect(() => {
    const boxUserElement = boxUser.current!;
    if (showModelUser) {
      boxUserElement.style.display = "block";
    } else {
      boxUserElement.style.display = "none";
    }
  }, [showModelUser]);

  useEffect(() => {
    const boxSearchElement = boxSearch.current!;
    if (showModelSearch) {
      boxSearchElement.style.display = "block";
    } else {
      boxSearchElement.style.display = "none";
    }
  }, [showModelSearch]);

  return (
    <header className={styles.header}>
      <div className={styles.header_top}>
        <div onClick={() => setShowNav(!showNav)} className={styles.ic_bar}>
          <AiOutlineBars className={styles.ic} />
        </div>
        <div className={styles.logo}>
          <h3>Shop</h3>
        </div>
        <div className={styles.search}>
          <input type="text" placeholder="Bạn cần tìm gì ?" />
          <AiOutlineSearch className={styles.ic} />
        </div>
        <div className={styles.box_ic}>
          <div
            onClick={() => setShowModelSearch(!showModelSearch)}
            className={styles.ic_search}
          >
            <AiOutlineSearch className={styles.ic} />
          </div>
          <div
            onClick={() => setShowModelUser(!showModelUser)}
            className={styles.user}
          >
            <AiOutlineUser className={styles.ic} />
            <div ref={boxUser} className={styles.box}>
              {isLogged ? (
                <ul>
                  <li>
                    <span className="block italic">Xin chào!</span>
                    <span className="font-bold">
                      {curentUser.user.firstName}
                    </span>
                  </li>
                  {curentUser.user.role == 1 ? (
                    <li>
                      <Link href="/admin">Trang quản trị</Link>
                    </li>
                  ) : null}
                  <li>
                    <div onClick={() => handleSignout()}>Đăng xuất</div>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <Link href="signin">Đăng nhập</Link>
                  </li>
                  <li>
                    <Link href="signup">Đăng ký</Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div className={styles.cart}>
            <MdOutlineShoppingBag
              className={styles.ic}
              onClick={() => setShowModelCart(!showModelCart)}
            />
            <div ref={boxCart} className={styles.box}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModelCart(!showModelCart);
                }}
                className={styles.overlay}
              ></div>
              <div className={styles.content}>
                <div className={styles.h_cart}>
                  <div className={styles.close}>
                    <AiOutlineClose
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowModelCart(!showModelCart);
                      }}
                      className={styles.ic}
                    />
                  </div>
                  <div className={styles.title}>
                    <span>Cart</span>
                  </div>
                </div>

                {listCart.length > 0 ? (
                  <div className={styles.c_cart}>
                    {listCart.map((item: any) => (
                      <div key={item._id} className={styles.item}>
                        <div className={styles.img}>
                          <img
                            src={item.img}
                            alt=""
                          />
                        </div>
                        <div className={styles.detall}>
                          <div className={styles.name}>
                            <h3>{item.name}</h3>
                          </div>
                          <div className={styles.price}>
                            <span className="font-semibold">{item.price} đ</span>
                          </div>
                          <div className={styles.price}>
                            <span>Kích cỡ: </span>
                            <span className="font-semibold">{item.size}</span>
                          </div>
                          <div className={styles.quantity}>
                            <span className={styles.title}>Số lượng</span>
                            <div className={styles.box_control}>
                              {/* <button
                                id="down-quantity"
                                className={styles.down_quantity}
                              >
                                <AiOutlineMinus />
                              </button> */}
                              <span className={styles.input_quantity}>{item.quantity}</span>
                              {/* <input id="input-quantity" type="text" role="spinbutton" aria-valuenow={1} defaultValue={1} className="border w-14 h-8 text-base font-normal box-border text-center cursor-text outline-none" /> */}
                              {/* <button
                                id="up-quantity"
                                className={styles.up_quantity}
                              >
                                <AiOutlinePlus />
                              </button> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className={styles.b_cart}>
                      <button>Thanh toán !</button>
                    </div>
                  </div>
                ) : (
                  <span className="pt-5 pl-5 inline-block">Không có sản phẩm nào !</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav ref={navBar} className={styles.navbar}>
        <div
          onClick={() => setShowNav(!showNav)}
          className={styles.overlay}
        ></div>
        <ul>
          <li>
            <Link href="/">Trang chủ</Link>
          </li>
          <li>
            <Link href="/product">Sản phẩm</Link>
          </li>
          <li>
            <Link href="#">Giới thiệu</Link>
          </li>
          <li>
            <Link href="/contact">Liên hệ</Link>
          </li>
        </ul>
      </nav>

      <div ref={boxSearch} className={styles.box_search}>
        <div className={styles.search}>
          <input type="text" placeholder="Bạn cần tìm gì ?" />
          <AiOutlineSearch className={styles.ic} />
        </div>
      </div>
    </header>
  );
};

export default Header;
