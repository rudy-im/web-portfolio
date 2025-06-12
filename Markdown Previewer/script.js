import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import redux from "https://esm.sh/redux";
import reactRedux from "https://esm.sh/react-redux";




const SET_CONTENT = 'SET_CONTENT';

const setContent = (text) => ({
  type: SET_CONTENT,
  payload: text
});


const reducer = (state = { content: '' }, action) => {
  switch (action.type) {
    case SET_CONTENT:
      return { ...state, content: action.payload };
    default:
      return state;
  }
};


const store = Redux.createStore(reducer);
const { Provider, useDispatch, useSelector } = ReactRedux;

function App() {
  const content = useSelector((state) => state.content);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setContent(e.target.value));
  };

  const getHtml = () => {
    const parsed = marked.parse(content);
    
    // personal parsing <br>
    
    //console.log(parsed);
    return {__html: parsed};
  }

  return (
    <div className="container">
      <div className="viewer" id="preview">{content}</div>
      <div className="editor">
        <textarea id="editor" value={content} onChange={handleChange} />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
