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
    toggleRunning: (state) => {
      state.isRunning = !state.isRunning;
    },
    reset: () => initialState,
    decrementTime: (state) => {
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
  toggleRunning,
  reset,
  decrementTime,
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
        dispatch(decrementTime());
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
    null,
    React.createElement("h1", null, "Pomodoro Clock"),
    React.createElement("h2", {id: "timer-label"}, mode === "session" ? "Work Session" : "Break Time"),
    React.createElement("h1", {id: "timer-left"}, formatTime(timeLeft)),
    React.createElement("div", null,
                        React.createElement("label", {id: "session-label"}, "Session Length: "),
                        React.createElement("button", {id: "session-decrement"}, "▼"),
                        React.createElement("input", {
      id: "session-length",
      type: "number",
      min: 1,
      max: 60,
      value: sessionLength,
      onChange: (e) => dispatch(setSessionLength(Number(e.target.value))),
    }),
                        React.createElement("button", {id: "session-increment"}, "▲")
                       ),
    React.createElement("div", null,
                        React.createElement("label", {id: "break-label"}, "Break Length: "),
                        React.createElement("button", {id: "break-decrement"}, "▼"),
                        React.createElement("input", {
      id: "break-length",
      type: "number",
      min: 1,
      max: 30,
      value: breakLength,
      onChange: (e) => dispatch(setBreakLength(Number(e.target.value))),
    }),
                        React.createElement("button", {id: "break-increment"}, "▲")
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

