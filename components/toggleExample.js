import { useState, useEffect, useRef } from "react"
import * as Tone from "tone"
import { motion } from "framer-motion"

export function ToggleExample() {
    // useState is where you store states of the component
    // the first variable is the value itself, and the second is a function you call to set it
    const [active, setActive] = useState()

    // useRef is where you store references to things, variables that aren't state related
    // in this case, we'll store our Oscillator on here
    const osc = useRef()

    // useEffect runs code when a component loads or each time it renders
    useEffect(() => {
        osc.current = new Tone.Oscillator(440, "sine").toMaster()
    }, [])
    // ^ it runs the code based on what is inside this array

    useEffect(() => {
        Tone.start()
        if (active) osc.current.start(Tone.context.currentTime)
        else osc.current.stop(Tone.context.currentTime)
    }, [active])
    // this ^ code runs whenever 'active' changes

    // we pass this function to the buttons 'onClick' event
    // we use the setting function to set it to not(!) its current value
    const handleToggle = () => {
        setActive(!active)
    }

    return (
        <motion.div
            // framer motion animates based on state
            // reminder that '?' means  (check this value) ? (if its true return this) : (if its false return this)
            animate={{
                border: active ? "5px solid #dc9d0f" : "1px solid #eee",
            }}
        >
            This is a component with a button
            <button onClick={handleToggle}>Turn {active ? "Off" : "On"}</button>
        </motion.div>
    )
}
