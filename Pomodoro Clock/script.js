const { createSlice, configureStore } = RTK;
const { Provider, useDispatch, useSelector } = ReactRedux;
const { useRef, useEffect } = React;

const initialState = {
  sessionLength: 25,
  breakLength: 5,
  isRunning: false,
  mode: 'session',
  timeLeft: 25 * 60,
  isBeeping: false,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setSessionLength: (state, action) => {
      state.sessionLength = action.payload;
      if(state.sessionLength < 1) state.sessionLength = 1;
      if(state.sessionLength > 60) state.sessionLength = 60;
      if (state.mode === 'session') {
        state.timeLeft = state.sessionLength * 60;
      }
    },
    setBreakLength: (state, action) => {
      state.breakLength = action.payload;
      if(state.breakLength < 1) state.breakLength = 1;
      if(state.breakLength > 60) state.breakLength = 60;
      if (state.mode === 'break') {
        state.timeLeft = state.breakLength * 60;
      }
    },
    changeSessionLength: (state, action) => {
      state.sessionLength += action.payload;
      if(state.sessionLength < 1) state.sessionLength = 1;
      if(state.sessionLength > 60) state.sessionLength = 60;
      state.mode = 'session';
      state.timeLeft = state.sessionLength * 60;
    },
    changeBreakLength: (state, action) => {
      state.breakLength += action.payload;
      if(state.breakLength < 1) state.breakLength = 1;
      if(state.breakLength > 60) state.breakLength = 60;
      state.mode = 'break';
      state.timeLeft = state.breakLength * 60;
    },
    toggleRunning: (state) => {
      state.isRunning = !state.isRunning;
    },
    reset: () => initialState,
    runTimer: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
        if(state.timeLeft==0) state.isBeeping = true;
        else state.isBeeping = false;
      } else {
        state.mode = state.mode === 'session' ? 'break' : 'session';
        state.timeLeft =
          (state.mode === 'session' ? state.sessionLength : state.breakLength) * 60;
      }
    },
  },
});

const {
  setSessionLength,
  setBreakLength,
  changeSessionLength,
  changeBreakLength,
  toggleRunning,
  reset,
  runTimer,
} = timerSlice.actions;

const store = configureStore({
  reducer: {
    timer: timerSlice.reducer,
  },
});

const App = () => {
  const dispatch = useDispatch();
  const { sessionLength, breakLength, isRunning, mode, timeLeft, isBeeping } = useSelector(
    (state) => state.timer
  );
  
  const beepRef = useRef(null);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        dispatch(runTimer());
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, dispatch]);
  
  useEffect(() => {
    if (!beepRef.current) return;
    beepRef.current.volume = 0.05;
    
    if (isBeeping) {
      beepRef.current.play();
      beepRef.current.currentTime = 0;
    } else {
      beepRef.current.pause();
      beepRef.current.currentTime = 0;
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return React.createElement(
    "div",
    {className: "clock"},
    React.createElement("audio", {
      id: "beep",
      ref: beepRef,
      src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
    }),
    React.createElement("h1", {className: "title"}, "POMODORO CLOCK"),
    
    React.createElement("div", {className: "timer-container"},
      React.createElement("fieldset", {className: "timer"}, 
        React.createElement("legend", {id: "timer-label"}, mode === "session" ? "Work Session" : "Break Time"),
        React.createElement("h1", {id: "time-left"}, formatTime(timeLeft))),
      React.createElement("div", {className: "play-container"},
        React.createElement("button", { 
          id: "start_stop",
          onClick: () => dispatch(toggleRunning()) 
        }, isRunning ? 
          React.createElement("i", {className: "fa-solid fa-pause"}) : 
          React.createElement("i", {className: "fa-solid fa-play"})),
        React.createElement("button", { 
          id: "reset",
          onClick: () => dispatch(reset()) 
        }, React.createElement("i", {className: "fa-solid fa-rotate-left"})))),
    
    React.createElement("div", {className: "length-container"},
      React.createElement("label", {id: "session-label"}, "Session Length: "),
      React.createElement("button", {
        id: "session-decrement",
        onClick: (e) => dispatch(changeSessionLength(-1))
      }, "▼"),
      React.createElement("input", {
        id: "session-length",
        type: "number",
        min: 1,
        max: 60,
        value: sessionLength,
        onChange: (e) => dispatch(setSessionLength(Number(e.target.value))),
      }),
      React.createElement("button", {
        id: "session-increment",
        onClick: (e) => dispatch(changeSessionLength(1))
      }, "▲")),
    
    React.createElement("div", {className: "length-container"},
      React.createElement("label", {id: "break-label"}, "Break Length: "),
      React.createElement("button", {
        id: "break-decrement",
        onClick: (e) => dispatch(changeBreakLength(-1))
      }, "▼"),
      React.createElement("input", {
        id: "break-length",
        type: "number",
        min: 1,
        max: 30,
        value: breakLength,
        onChange: (e) => dispatch(setBreakLength(Number(e.target.value))),
      }),
      React.createElement("button", {
        id: "break-increment",
        onClick: (e) => dispatch(changeBreakLength(1))
      }, "▲")),
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  React.createElement(Provider, { store },
                      React.createElement(App)
                     )
);
