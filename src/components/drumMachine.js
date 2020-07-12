import { useState, useEffect, useRef } from "react"
import * as Tone from "tone"
import { motion } from "framer-motion"
import styles from "./drumMachine.module.css"

// constants
const notes = ["hihat", "kick", "perc", "snare"]
const columns = 12
const columnArray = [...new Array(columns)].map((_, i) => i)
const activeNotesDefault = new Array(columns).fill(
    new Array(notes.length).fill(false)
)

const samples = notes.reduce((res, sample) => {
    res[sample] = `assets/samples/${sample}.wav`
    return res
}, {})

// individual note component
function Note(props) {
    const { active, isColumnActive, onTap } = props

    return (
        <motion.div
            onTap={onTap}
            className={styles.note}
            initial={{ scale: 1 }}
            animate={{
                scale: isColumnActive ? 1.15 : 1,
                background: active ? "rgba(0,0,0,255)" : "rgba(0,0,0,0)",
            }}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.15 }}
        />
    )
}

// the grid
export function DrumMachine() {
    const drum = useRef()
    const [activeNotes, setActiveNotes] = useState(activeNotesDefault)
    const [activeColumn, setActiveColumn] = useState(-1)

    useEffect(() => {
        drum.current = new Tone.Players(samples, {
            release: 1,
            volume: -10,
        }).toMaster()
    }, [])

    useEffect(() => {
        const loop = new Tone.Sequence(
            (time, col) => {
                setActiveColumn(col)
                notes.forEach((_, i) => {
                    if (activeNotes[col][i]) {
                        var vel = Math.random() * 0.5 + 0.5
                        drum.current.get(notes[i]).start(time, 0, "8n", 0, vel)
                    }
                })
            },
            columnArray,
            "8n"
        ).start(0)
        return () => loop.dispose()
    }, [activeNotes])

    const toggleNote = (col, row) => {
        setActiveNotes((prevState) => {
            const newState = prevState.map((arr) => arr.slice(0))
            newState[col][row] = !prevState[col][row]
            return newState
        })
    }

    return (
        <div
            onClick={() => {
                Tone.start()
                Tone.Transport.start()
            }}
            className={styles.machine}
            style={{ grid: `repeat(${notes.length}, 50px) / auto-flow` }}
        >
            {activeNotes.map((column, col) => {
                return column.map((active, row) => {
                    return (
                        <Note
                            key={`${col}+${row}`}
                            active={active}
                            isColumnActive={activeColumn === col}
                            onTap={() => toggleNote(col, row)}
                            column={col}
                        />
                    )
                })
            })}
        </div>
    )
}
