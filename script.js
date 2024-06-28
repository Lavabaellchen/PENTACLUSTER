const chordTypes = {
    Do: { intervals: [0, 2, 4, 7, 9, 12], name: "Do" },
    Re: { intervals: [0, 2, 5, 7, 10, 12], name: "Re" },
    Mi: { intervals: [0, 3, 5, 8, 10, 12], name: "Mi" },
    So: { intervals: [0, 2, 5, 7, 9, 12], name: "So" },
    La: { intervals: [0, 3, 5, 7, 10, 12], name: "La" },

};

let currentChord = null;
let score = 0;

const optionKeys = Object.keys(chordTypes);

document.getElementById('generateChordBtn').addEventListener('click', () => {
    currentChord = getRandomChord();
    playChord(currentChord.intervals);
    displayOptions();
});

function displayOptions() {
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    optionKeys.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = chordTypes[option].name;
        button.addEventListener('click', () => checkAnswer(option));
        optionsDiv.appendChild(button);
    });

    const playChordBtn = document.createElement('button');
    playChordBtn.textContent = 'Akkord anhören';
    playChordBtn.addEventListener('click', () => playChord(currentChord.intervals));
    optionsDiv.appendChild(playChordBtn);

    const playRootNoteBtn = document.createElement('button');
    playRootNoteBtn.textContent = 'Grundton anhören';
    playRootNoteBtn.addEventListener('click', () => playRootNote());
    optionsDiv.appendChild(playRootNoteBtn);
}

function checkAnswer(selectedOption) {
    const selectedChord = chordTypes[selectedOption];
    
    if (selectedChord.name === currentChord.name) {
        score++;
        document.getElementById('result').textContent = 'Richtig!';
    } else {
        document.getElementById('result').textContent = `Falsch! Es war ${currentChord.name}.`;
    }
    document.getElementById('score').textContent = `Punkte: ${score}`;
}

function getRandomChord() {
    const randomKey = optionKeys[Math.floor(Math.random() * optionKeys.length)];
    const intervals = chordTypes[randomKey].intervals;
    const baseNote = randomNoteInRange("Bb3", "E4"); // Zufälliger Grundton zwischen Bb3 und E4
    return { intervals, name: chordTypes[randomKey].name, baseNote };
}

function playChord(intervals) {
    const synth = new Tone.PolySynth().toDestination();
    const noteNames = intervals.map(interval => Tone.Frequency(currentChord.baseNote).transpose(interval).toNote());
    synth.triggerAttackRelease(noteNames, "2n");
}

function playRootNote() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(currentChord.baseNote, "2n");
}

function randomNoteInRange(lowNote, highNote) {
    const lowFreq = Tone.Frequency(lowNote).toFrequency();
    const highFreq = Tone.Frequency(highNote).toFrequency();
    const randomFreq = Math.random() * (highFreq - lowFreq) + lowFreq;
    return Tone.Frequency(randomFreq).toNote();
}
