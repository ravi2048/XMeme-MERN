import './App.css';
import Posts from './components/Posts.js';
import PostForm from './components/PostForm.js';

function App() {
  return (
    <div className="App">
      {/* <div style = {{  marginBottom:'10px', borderRadius:'10px', backgroundColor: 'SlateBlue' , fontSize:'4vw' }}>XMeme</div> */}
      <PostForm/>
      <hr/>
      <Posts/>      
    </div>
  );
}

export default App;
