import { useState, useEffect, useRef } from "react"
import * as Tone from "tone"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import styles from "./drumMachine.module.css"

// constants
const notes = ["kick", "snare", "clap", "hihat", "openhat", "perc"]
const columns = 16
const columnArray = [...new Array(columns)].map((_, i) => i)
const activeNotesDefault = new Array(columns).fill(
    new Array(notes.length).fill(false)
)

const samples = notes.reduce((res, sample) => {
    res[sample] = `assets/samples/${sample}.wav`
    return res
}, {})

const transition = {
    type: "spring",
    damping: 30,
    stiffness: 450,
    mass: 1,
}

// individual note component
function Note(props) {
    const { active, activeColumn, column, onTap } = props

    const activeScale = useMotionValue(1)
    useEffect(
        () =>
            activeColumn.onChange((latest) => {
                activeScale.set(latest === column ? 1.25 : 1)
            }),
        []
    )
    const scaleSpring = useSpring(activeScale)

    return (
        <motion.div
            onTap={onTap}
            className={styles.note}
            initial={{ scale: 1 }}
            style={{ scale: scaleSpring }}
            animate={{
                background: active ? "rgba(0,0,0,255)" : "rgba(0,0,0,0)",
            }}
            transition={transition}
            // whileTap={{ scale: 0.9 }}
            // whileHover={{ scale: 1.15 }}
        />
    )
}

function PlayButton() {
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        if (isPlaying) Tone.Transport.start()
        else Tone.Transport.pause()
    }, [isPlaying])
    return (
        <div onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? "pause" : "play"}
        </div>
    )
}

// the grid
export function DrumMachine() {
    const drum = useRef()
    const sequence = useRef()
    const hasSetup = useRef(false)
    const [activeNotes, setActiveNotes] = useState(activeNotesDefault.slice(0))
    const activeColumn = useMotionValue(-1)

    useEffect(() => {
        drum.current = new Tone.Players(samples, {
            release: 1,
            volume: -10,
        }).toMaster()
        // console.log(drum.current)
        // drum.current = drum;
        // return () => drum.disconnect();
    }, [])

    useEffect(() => {
        const loop = new Tone.Sequence(
            (time, col) => {
                notes.forEach((_, i) => {
                    if (activeNotes[col][i]) {
                        const vel = Math.random() * 0.5 + 0.5
                        const notePlayer = drum.current.get(notes[i])

                        if (notePlayer.loaded)
                            notePlayer.start(time, 0, "16n", 0, vel)
                        else console.error("Error playing sample")
                    }
                })
                Tone.Draw.schedule(() => activeColumn.set(col), time)
            },
            columnArray,
            "8n"
        ).start(0)
        sequence.current = loop
        return () => loop.dispose()
    }, [activeNotes, activeColumn])

    const toggleNote = (col, row) => {
        setActiveNotes((prevState) => {
            const newState = prevState.map((arr) => arr.slice(0))
            newState[col][row] = !prevState[col][row]
            return newState
        })
    }

    const setup = () => {
        if (!hasSetup.current) {
            Tone.start()
            Tone.Draw.anticipation = 0.1
            hasSetup.current = true
        }
    }

    return (
        <div onClick={setup}>
            <div
                className={styles.machine}
                style={{ grid: `repeat(${notes.length}, 50px) / auto-flow` }}
            >
                {activeNotes.map((column, col) => {
                    return column.map((active, row) => {
                        return (
                            <Note
                                key={`${col}+${row}`}
                                active={active}
                                activeColumn={activeColumn}
                                onTap={() => toggleNote(col, row)}
                                column={col}
                            />
                        )
                    })
                })}
            </div>

            <PlayButton />

            <div
                onClick={() => {
                    // Hmmm ok
                    // the tempo is..... up there at the 4n ?string
                    setActiveNotes(activeNotesDefault.slice(0))
                }}
            >
                Click me i will clear
            </div>
        </div>
    )
}
