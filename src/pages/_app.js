// react deps
import Helmet from "react-helmet";
import ReactGA from "react-ga";

// redux
import { Provider } from "react-redux";
import { useStore } from "../redux/store";

// styles
import "../css/App.scss";

// components

import Header from "../components/header/header.component";

const App = ({ Component, pageProps }) => {
    const store = useStore(pageProps.initialReduxState);

    return (
        <>
            <Helmet>
                <meta name="geo.region" content="US-IL" />
                <meta name="geo.placename" content="Chicago" />
                <meta name="geo.position" content="41.890574,-87.6809104" />
                <meta name="ICBM" content="41.890574,-87.6809104" />
                {/*BASIC SEO PAGE NEEDS */}
                <script type="application/ld+json">
                    {`
                        {
                            "@context": "https://schema.org",
                            "@type": "Corporation",
                            "url": "www.redneck.media",
                            "name": "Forager",
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "telephone": "855-436-7243",
                                "contactType": "Customer service"
                            }
                        }
                    `}
                </script>
            </Helmet>

            <Provider store={store}>
                <div className="wrapper">
                    <Header />
                    <Component {...pageProps} />
                </div>
            </Provider>
        </>
    );
};

export default App;
