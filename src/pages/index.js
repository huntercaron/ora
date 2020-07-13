import Head from "next/head"
import { DrumMachine } from "../components/drumMachine"
import { DrumMachine2 } from "../components/drumMachine2"

function Home() {
    return (
        <div>
            <Head>
                <title>Ora</title>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
            </Head>

            <DrumMachine />
            {/* <DrumMachine2 /> */}
        </div>
    )
}

export default Home
