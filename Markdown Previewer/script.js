
const SET_CONTENT = 'SET_CONTENT';

const setContent = (text) => ({
  type: SET_CONTENT,
  payload: text
});

const reducer = (state = { content: sampleText }, action) => {
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
    let parsed = marked.parse(content);
    
    parsed = parsed.replace(/\n/g, '<br>\n');
    parsed = parsed.replace(/(<\/p>|<\/h\d?>|<blockquote>)<br>/g, '$1');
    parsed = parsed.replace(/<\/h1>/g, '</h1>\n<hr>\n');
    parsed = parsed.replace(/<br>\n<\/blockquote>/g, '\n<\/blockquote>');
    
    parsed = parsed.replace(/(<table>|<\/?thead>|<\/?th>|<\/?tr>|<\/?td>)<br>/g, '$1');
    parsed = parsed.replace(/(<\/li>|<ul>|<\/ul>)<br>/g, '$1');
    
    return {__html: parsed};
  }

  return (
    <div className="container">
      <div className="viewer" id="preview"
        dangerouslySetInnerHTML={getHtml()}>
      </div>
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
