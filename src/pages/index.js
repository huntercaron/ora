import Head from "next/head"
import { DrumMachine } from "../components/drumMachine"

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
        </div>
    )
}

export default Home
