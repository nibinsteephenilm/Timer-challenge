import { useState, useRef } from "react";
export default function Player() {
    const playerName = useRef();

    const [enteredPlayerName, setEnteredPlayerName] = useState(null);

    function handleInput() {
        setEnteredPlayerName(playerName.current.value)
        playerName.current.value = ''
    }

    return (
        <section id="player">
            <h2>Welcome {enteredPlayerName ?? 'unkonwn entity'}</h2>
            <p>
                <input
                    ref={playerName}
                    type="text"
                />
                <button onClick={handleInput}>Set Name</button>
            </p>
        </section>
    );
}
