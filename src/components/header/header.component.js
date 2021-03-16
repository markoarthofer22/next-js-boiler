import React, { useState, useEffect } from "react";

//component
import Button from "../../components/buttons/button.component";
import SvgIcon from "../../components/svg-icon/svg-icon.component";

// styles
import styles from "./Header.module.scss";

//Hooks
import useIsBreakpoint from "../hooks/useIsBreakpoint.hook";
// import { useTranslation } from "react-i18next";

const Header = ({ menu, allLanguages, currentLang }) => {
    const isMobile = useIsBreakpoint();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    // const { t } = useTranslation();

    return (
        <>
            <header className={`${styles.header} ${styles.testTwo}`}>
                <div className="container">
                    <div className="row spaced">
                        <h5 className={styles.test}>Ovo je neki header na svim pageovima</h5>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
