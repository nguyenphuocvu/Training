# useState Hook lý do gọi hook là gắn vào component
# Dùng khi nào 
Khi muốn dữ liệu thayy đổi thì giao diện tự động được cập nhật (render lại theo dữ liệu)


# Cách dùng 

import {useState} from 'react'

function Component () {
    const [state , setState] = useState(initState)
}

state đang là 1 nếu mình muốn nó là 2 thì mình phải dùng setState để thay đổi nó lên 2

initState giá trị khởi tạo

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