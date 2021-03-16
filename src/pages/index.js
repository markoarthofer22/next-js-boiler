// react deps
import { useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../redux/globals/globals.actions";
import { selectIsLoading } from "../redux/globals/globals.selectors";

// styles
import styles from "../css/sass/Home.module.scss";

const Home = (props) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        console.log("tu sam");
        dispatch(setIsLoading("Marko_nova_var"));
    }, []);

    useEffect(() => {
        console.log("promijenjena");
        console.log("isLoading :>> ", isLoading);
    }, [isLoading]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className={styles.title}>Marko</h1>
                </div>
            </div>
        </div>
    );
};

export default Home;
