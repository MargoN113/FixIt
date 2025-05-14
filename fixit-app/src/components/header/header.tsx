import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './header.scss'; // Assuming you have similar styles

const Header: React.FC = () => {
    const location = useLocation();

    const pages = [
        { id: "map", name: "Karte" },
        { id: "about", name: "Über uns" },
        { id: "register", name: "Cafe registrieren" },
        { id: "faq", name: "FAQ" }
    ];

    useEffect(() => {
        console.log(location.pathname);
        if (!(location.pathname === "/map" || location.pathname === "/")) {
            headerHoverStart();
        }
    }, [location.pathname]);

    const headerHoverStart = () => {
        document.getElementById("header")?.classList.add("header-extended");
        document.documentElement.style.setProperty("--header-width", "100vw");
    };

    const headerHoverEnd = () => {
        if (location.pathname === "/map" || location.pathname === "/") {
            document.getElementById("header")?.classList.remove("header-extended");
            const detailVisible = document.getElementsByClassName("show-details")?.length > 0;
            document.documentElement.style.setProperty("--header-width", detailVisible ? "800px" : "400px");
        }
    };

    return (
        <div id="header" onMouseEnter={headerHoverStart} onMouseLeave={headerHoverEnd}>
            <div className="identity">
                <div className="logo">
                    <img src="/fixit-logo1.png" height="60" width="60" alt="" />
                </div>
                <div className="company">FixIt Augsburg</div>
            </div>
            <div className="extend-button">&gt;</div>
            <div className="title-wrapper">
                {pages.map((page) => (
                    <div className="title-container" key={page.id}>
                        <Link to={`/${page.id}`}>{page.name}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Header;
