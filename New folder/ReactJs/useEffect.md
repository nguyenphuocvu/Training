# 1 Callback luôn được goi sau khi component mounted
# 2 Clearup function luôn được gọi trước khi component unmounted
# 3 Clearup function luôn được gọi trước khi callback được gọi ( trừ lần mounted )
<!-- Clearup function tránh rò rỉ bộ nhớ  -->

<!-- const Content = () => {
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    //Cleanup
    return () => {
     avatar &&  URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];

    file.preview = URL.createObjectURL(file);

    setAvatar(file);
  };

  return (
    <div>
      <input type="file" onChange={handlePreviewAvatar} />

      {avatar && <img src="{avatar.preview}" alt="" width="80%" />}
    </div>
  );
}; -->

# Events : Add / remove event listener
# Observer pattern : Subscribe / unsubscribe
# Closure
# Timers : setInterval , setTimeout , clearInterval , clearTimeout
<!-- 
const Content = () => {
  const [countdown , setCountdown] = useState(180)
  useEffect(() => {
    const timerId = setInterval(() => {
      setCountdown(prevState => prevState - 1 )
    }, 1000)

    return () => clearInterval(timerId)
  })


  return (
    <div>
       <h1>{countdown}</h1>
    </div>
  )
} -->
# useState
//Mouted / unmounted
// ===
// Call API

- Remove listener / Unsubscribe
- Clear timer
# 1 Update DOM
# 2 Call API
# 1 useEffect(callback )

`Goi callback mỗi khi component re-render`
`Goi callback sau khi component thêm element`

<!-- const Content = () => {
    const [title , setTitle] = useState('')

    useEffect(() => {
       document.title = title

    })

    return (
    <div>
    <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
    </div>
    ) -->


# 2 useEffect(callback , [] )

`Chỉ gọi callback 1 lần sau khi component ,mounted`

  <!-- const [posts, setPosts] = useState([]);
  useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/posts")
  .then(res => res.json())
  .then(posts => {
  setPosts(posts);
  });
  }, []);

    <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
    </ul> -->
# 3 useEffect(callback , [deps] )
`Callback sẽ được gọi lại mỗi lần deps thay đổi`
<!-- import { useEffect, useState } from "react";
const tabs = ['posts' , 'comments' , 'albums']
const Content = () => {
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState('posts')
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then(res => res.json())
      .then(posts => {
        setPosts(posts);
      });
  }, [type]);

  return (
    <div>
    {tabs.map(tab => (
        <button 
          key={tab}
          style={type === tab ? {
            color: '#fff',
            backgroundColor: '#333'
          } : {}}
          onClick={() => setType(tab)}
        >
            {tab}
        </button>
    ))}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title || post.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Content; -->

# 3 Listen DOM events
`Scroll`
`Resize`
# 4 Cleanup
<!-- import { useEffect, useState } from "react";
const tabs = ["posts", "comments", "albums"];
const Content = () => {
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState("posts");
  const [showGoToTop, setShowGoToShop] = useState(false);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, [type]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setShowGoToShop(true);
      } else {
        setShowGoToShop(false);
      }
    //   setShowGoToShop(window.scrollY >= 200)
    };
    window.addEventListener("scroll", handleScroll);

    //Cleanup funtion
    return () => {
        window.removeEventListener('scroll' , handleScroll)
    }
  }, []);
  return (
    <div>
      {tabs.map((tab) => (
        <button
          key={tab}
          style={
            type === tab
              ? {
                  color: "#fff",
                  backgroundColor: "#333",
                }
              : {}
          }
          onClick={() => setType(tab)}
        >
          {tab}
        </button>
      ))}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title || post.name}</li>
        ))}
      </ul>

      {showGoToTop && (
        <button style={{
            position : 'fixed', 
            right: 20, 
            bottom: 20
        }}>
            Go to Top
        </button>
    )}
    </div>

  
  );
};

export default Content; -->
