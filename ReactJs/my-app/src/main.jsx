import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { ThemeProvider } from "./ThemeContext";
//Fake comment
// function emitComment(id){
// setInterval(() => {
//    window.dispatchEvent(
//       new CustomEvent(`lesson-${id}`, {
//          detail: `Noi dung ${id}`
//       })
//    )
// }, 2000)
// }

// emitComment(1)
// emitComment(2)
// emitComment(3)
createRoot(document.getElementById('root')).render(
  <StrictMode>
     {/* <ThemeProvider> */}
        <App />
     {/* </ThemeProvider> */}
  </StrictMode>,
)
