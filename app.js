class Timer {
    constructor(durationInput, startButton, pauseButton, resetButton, callbacks){
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        this.resetButton = resetButton;
        this.running = false
        this.initialVal = this.durationInput.value

        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        startButton.addEventListener('click', this.start)
        pauseButton.addEventListener('click', this.pause)
        resetButton.addEventListener('click', this.reset)
    }

    start = () => {
        if (this.onStart) this.onStart(this.timeRemaining); 
        
        if (this.running) return; // prevent speeding up timer
        this.countdown = setInterval(this.tick, 50)
        this.running = true
    }

    pause = () => {
        clearInterval(this.countdown)
        this.running = false
    } 
    
    reset = () => {
        if (this.initialVal) this.timeRemaining = parseFloat(this.initialVal)
    }

    tick = () => {
        if (this.timeRemaining > 0){
            this.timeRemaining = this.timeRemaining - 0.05; 
            if (this.onTick) this.onTick(this.timeRemaining);
        } else {
            this.pause();
            if (this.onComplete) this.onComplete();
        };
    }

    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);
    }
}

const startButton = document.querySelector('#play');
const pauseButton = document.querySelector('#pause');
const resetButton = document.querySelector('#reset');
const input = document.querySelector('input');
const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter)

let duration;
const myTimer = new Timer(input, startButton, pauseButton, resetButton, {
    onStart(totalDuration) {
        if (!duration) duration = totalDuration;
        console.log('Timer Started')
    },
    onTick(timeRemaining) {
        offsetAmount = (perimeter * timeRemaining / duration - perimeter)
        circle.setAttribute('stroke-dashoffset', offsetAmount)
    },
    onComplete() {
        console.log('Timer is complete!')
    }
});

