import { useState, useEffect, useRef } from "react"
import * as Tone from "tone"
import { motion } from "framer-motion"

export function ToggleExample() {
    // useState is where you store states of the component
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
        if (active) osc.current.start()
        else osc.current.stop()
    }, [active])
    // this ^ code runs whenever 'active' changes

    const handleToggle = () => {
        setActive(!active)
    }

    return (
        <motion.div
            animate={{
                border: active ? "5px solid #dc9d0f" : "1px solid #eee",
            }}
        >
            This is a component with a button
            <button onClick={handleToggle}>Turn {active ? "Off" : "On"}</button>
        </motion.div>
    )
}
