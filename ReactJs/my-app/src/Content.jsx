import React, { useEffect, useState } from "react";
const lessons = [
  {
    id: 1,
    name: "ReactJs",
  },
  {
    id: 2,
    name: "ReactJs",
  },
  {
    id: 3,
    name: "ReactJs",
  },
];
const Content = () => {
  const [lessonId, setLessonId] = useState(1);
  useEffect(() => {
    const handleComment = (detail) => {
      console.log(detail);
      
    }
    window.addEventListener(`lesson-${lessonId}`, handleComment )

    return() => {
      window.removeEventListener(`lesson-${lessonId}`, handleComment )
    }
  }, [lessonId])
  return (
    <div>
      <ul>
        {lessons.map((lesson) => {
          <li
            key={lesson.id}
            style={{
              color: lessonId === lesson.id ?
              'red' :
              '#333'
            }}
            onClick={( )=> setLessonId(lesson.id)}
          >
            {lesson.name}
          </li>;
        })}
      </ul>
    </div>
  );
};

export default Content;
{
  /* 
export default Content

// import React from 'react'
// import Paragraph from "./Paragraph"
// const Content = () => {
//   return (
//     <div>
//        <Paragraph/>
//     </div>

//   )
// }

// export default Content

// import { useState, useRef, useEffect } from "react";

// const Content = () => {
//   const [count, setCount] = useState(60);

//   const timerId = useRef();
//   const prevCount = useRef();

//   useEffect(() => {
//     prevCount.current = count;
//   }, [count]);

//   const handleStart = () => {
//     timerId.current = setInterval(() => {
//       setCount((prevCount) => prevCount - 1);
//     }, 1000);
//   };

//   const handleStop = () => {
//     clearInterval(timerId.current);
//   };

//   //LayouEffect
//   //   useLayoutEffect(() => {
//   //     if(count > 3)
//   //         setCount(0)
//   //   }, [count])

//   //   const handleRun = () => {
//   //     setCount(count + 1);
//   //   };

//   return (
//     <div>

//      {/* LayouEffect */
}
//       {/* <h1>{count}</h1>
//       <button onClick={handleRun}>Run</button> */}

//       <h1>{count}</h1>
//       <button onClick={handleStart}>Start</button>
//       <button onClick={handleStop}>Stop</button>
//     </div>
//   );
// };

// export default Content; */}
