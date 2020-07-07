import "ress/dist/ress.min.css"
import "../utilities/styles.css"

// This file 'wraps' all our pages - so we pretty much just use it to add our master css file up there

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}
