const { createSlice, configureStore } = RTK;
const { Provider, useDispatch, useSelector } = ReactRedux;
const { useEffect } = React;

const initialState = {
  sessionLength: 25,
  breakLength: 5,
  isRunning: false,
  mode: 'session',
  timeLeft: 25 * 60,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setSessionLength: (state, action) => {
      state.sessionLength = action.payload;
      if (state.mode === 'session') {
        state.timeLeft = action.payload * 60;
      }
    },
    setBreakLength: (state, action) => {
      state.breakLength = action.payload;
      if (state.mode === 'break') {
        state.timeLeft = action.payload * 60;
      }
    },
    changeSessionLength: (state, action) => {
      state.sessionLength += action.payload;
      if(state.sessionLength < 0) state.sessionLength = 0;
    },
    changeBreakLength: (state, action) => {
      state.breakLength += action.payload;
      if(state.breakLength < 0) state.breakLength = 0;
    },
    toggleRunning: (state) => {
      state.isRunning = !state.isRunning;
    },
    reset: () => initialState,
    runTimer: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
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
  const { sessionLength, breakLength, timeLeft, isRunning, mode } = useSelector(
    (state) => state.timer
  );

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        dispatch(runTimer());
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, dispatch]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return React.createElement(
    "div",
    {className: "clock"},
    React.createElement("h1", {className: "title"}, "POMODORO CLOCK"),
    React.createElement("h2", {id: "timer-label"}, mode === "session" ? "Work Session" : "Break Time"),
    React.createElement("h1", {id: "time-left"}, formatTime(timeLeft)),
    React.createElement("div", null,
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
    }, "▲")
                       ),
    React.createElement("div", null,
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
    }, "▲")
                       ),
    React.createElement("div", null,
                        React.createElement("button", { 
      id: "start_stop",
      onClick: () => dispatch(toggleRunning()) },
                                            isRunning ? "Pause" : "Start"
                                           ),
                        React.createElement("button", { 
      id: "reset",
      onClick: () => dispatch(reset()) }, 
                                            "Reset")
                       )
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  React.createElement(Provider, { store },
                      React.createElement(App)
                     )
);
