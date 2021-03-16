import { SET_GLOBAL_ERROR, SET_GLOBALS, SET_IS_LOADING } from "./globals.types";
import mainApi from "../apis/main-api";
import _ from "underscore";

export const setIsLoading = (isLoading) => {
    return {
        type: SET_IS_LOADING,
        payload: isLoading
    };
};
export const setGlobalError = (error) => {
    return {
        type: SET_GLOBAL_ERROR,
        payload: error
    };
};

// export const fetchGlobals = (sid) => {
//     return async (dispatch) => {
//         let lang = localStorage.getItem('selectedLang');
//         let allPayload = [];
//         let endpoints = ['header-menu', 'footer-menu-one', 'footer-menu-two'];
//         let promises = [];
//         for (let i = 0; i < endpoints.length; i++) {
//             promises.push(
//                 await menuApi
//                     .get(`/menus/${endpoints[i]}${sid ? `&sid=${sid}` : ''}`, {
//                         params: {
//                             lang: lang,
//                         },
//                     })
//                     .then((response) => {
//                         let temp = {};
//                         temp[endpoints[i]] = response.data;
//                         allPayload = {
//                             ...allPayload,
//                             ...temp,
//                         };
//                     })
//                     .catch((error) => {})
//             );
//         }

//         Promise.all(promises).then(() => {
//             dispatch({
//                 type: SET_GLOBALS,
//                 payload: allPayload,
//             });
//         });
//     };
// };

export const getDataForURL = (url) => {
    return async (dispatch, getState) => {
        let lang = localStorage.getItem("selectedLang");

        let _url = url.split("?")[0].slice(-1) === "/" ? url.split("?")[0].slice(0, -1) : url.split("?")[0];

        // if (_url === getState().globals.pageData.url) {
        //     return; //Neki razlog postoji, kad saznamo napisati ovdje
        // }
        dispatch(setIsLoading(true));

        return await new Promise((resolve, reject) => {
            const endpoint = _url === "" ? "/byslug" + _url : "/byslug/?slug=" + _url.substr(1) + "&_embed";
            mainApi
                .get(endpoint, {
                    params: {
                        lang: lang
                    }
                })
                .then((responseData) => {
                    dispatch(setSlugs(responseData.data.slugs));
                    dispatch(setDataForURL({ response: responseData.data, url: _url }));
                    dispatch(setIsLoading(false));
                    resolve(responseData.data);
                })
                .catch((error) => {
                    reject(error);
                    dispatch(setDataForURL({ response: {}, url: "404-error" }));
                    dispatch(setIsLoading(false));
                });
        });
    };
};
