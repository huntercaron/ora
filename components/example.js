import { useState } from "react"

export function Home() {
    const [active, setActive] = useState()

    return (
        <div style={{ border: "1px solid #f5f5f5" }}>
            This is a component with a button
            <button onClick={() => setActive(!active)}>
                Turn {active ? "Off" : "On"}
            </button>
        </div>
    )
}
