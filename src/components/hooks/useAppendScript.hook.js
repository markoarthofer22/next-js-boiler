import { useEffect } from 'react';
const appendScript = (resourceUrl) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = resourceUrl;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, [resourceUrl]);
};
export default appendScript;
