# Dùng khi nào 
Khi muốn dữ liệu thayy đổi thì giao diện tự động được cập nhật (render lại theo dữ liệu)
Tạo và cập nhật giá trị

# Cách dùng 
const [count , setCount] = useState(0)
setCount(1) thay đổi giá trị thành 1
// count giữ giá trị trạng thái
// setCount dùng để cập nhật giá trị
// useState tạo tài nguyên trạng thái và gắn giá trị là 0

# Lưu ý 
- COmponent được re-render sau khi `setState`
- Initial state chỉ dùng cho lần đầu
# Set state với callback
` const [counter, setCounter] = useState(1)`

const handleIncrease = () => {
    setCounter(prevState => prevState + 1)
     setCounter(prevState => prevState + 1)
      setCounter(prevState => prevState + 1)
}

# Initial state với callback
(Viết ra ngoài)
const orders = [100, 200,300]
` const [counter, setCounter] = useState(() => {
     const total = orders.reduce((total, cur) => total + cur)
     return total
})`


# Set state là thay thế cho state bằng giá trị mới 
const [info , setInfo] = useState({
    name: 'Nguyen Van A',
    age: 18,
    address : 'Ha Noi'
})

const handleUpdate = () => {
    setInfo(prev => ({
        ...prev,
        bio: 'Yeu'
    }))
}

`h1 {JSON.stringify(info)} h1 `