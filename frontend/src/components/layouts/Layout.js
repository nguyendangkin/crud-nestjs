import React from "react";
import classNames from "classnames/bind";
import MainHeader from "./MainHeader/MainHeader";
import styles from "./LayoutStyles.module.scss";
import { useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

const Layout = ({ children }) => {
    const location = useLocation();

    const excludedPaths = ["/login", "/register", "/anotherPath"];
    const showHeader = !excludedPaths.includes(location.pathname);

    return (
        <div className="app">
            {showHeader && (
                <div className={cx("header")}>
                    <div className={cx("container")}>
                        <MainHeader />
                    </div>
                </div>
            )}
            <div className="container pt-3">{children}</div>
        </div>
    );
};

export default Layout;
