import Head from "next/head"
import * as Tone from "tone"
import { ToggleExample } from "../components/toggleExample"

export function ButtonExample(props) {
    // this is a component, its scoped to itself and can be re-used infinite times

    // this takes the values out of the props for use
    const { startNote } = props

    // this function triggers when 'onClick' on the button is triggered
    const playSound = () => {
        Tone.start()
        var synth = new Tone.Synth().toMaster()

        //play a middle 'C' for the duration of an 8th note
        synth.triggerAttackRelease(startNote, "8n", Tone.context.currentTime)
    }

    return (
        <div style={{ border: "1px solid #eee" }}>
            This is a component with a button that plays a note with the start
            of {startNote}
            <button onClick={playSound}>Play Sound</button>
        </div>
    )
}

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

            <h1>this is a Heading on the index page</h1>

            <div>
                <ToggleExample />

                {/* With component props, we can easily made each control do something slightly different */}
                <ButtonExample startNote={"B2"} />
                <ButtonExample startNote={"C4"} />
            </div>
        </div>
    )
}

export default Home
