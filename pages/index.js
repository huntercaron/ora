import Head from "next/head"
import * as Tone from "tone"
import { ToggleExample } from "../components/toggleExample"

export function ButtonExample(props) {
    // this takes the values out of the props for use
    const { startNote } = props
    // this is a component, its scoped to itself and can be re-used infinite times
    // this function triggers when 'onClick' on the button is triggered
    const playSound = () => {
        Tone.start()
        var synth = new Tone.Synth().toMaster()

        //play a middle 'C' for the duration of an 8th note
        synth.triggerAttackRelease(startNote, "8n")
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
            </Head>
            <h1>this is a Heading on the index page</h1>

            <div>
                <ToggleExample />
                <ButtonExample startNote={"B2"} />
                <ButtonExample startNote={"C4"} />
            </div>
        </div>
    )
}

export default Home
