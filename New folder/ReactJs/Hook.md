
# HOC
-Nguyên lý hoạt động nhận vào 1 component 
Check props của cpn có bị thay đổi hay không  

- Khi nào nên sử dụng : `Khi có 1 component nào đó sử dụng nhiều props ở trong chức năng `
- memo() -> Higher Order Component (HOC)
`import {memo} from 'react'`
`export default memo()`
Biết viết và sử dụng context
# Hook
# State (Xử lý kiểu dữ liệu nguyên thủy , đơn giản )
`- 1 Init state : 0`
`- 2 Actions: Up `
useState sẽ trả về một mảng 2 phần tử
phần tử đầu tiên là state hiện tại
phần tử thứ 2 là set State ` hàm cho phép bạn cập nhật trạng thái đó `
đọc phần tử thứ nhất và set state là phần tử thứ 2 sẽ thay đổi
gọi useState() nhiều lần để các state được độc lập với nhau tránh conflict

có thể trả về 1 string 1 array không cần là một object 



# useLayoutEffect
1 : Cập nhật lại state
2 : Cập nhât DOM (mutated)
3 : Gọi cleanup nếu dép thay đổi (sync)
4 : Gọi useLayoutEffect callback(sync)
5 : Render lại UI

Khác nhau giữa useEffect vs useLayoutEffect thì Layout nó sẽ gọi render ui lại cuối cùng còn effect thì nó gọi ở dòng 3


# useCallback 
- Tránh render những cái không cần thiết
- Reference types
- React memo()
-


useCallback là một hook mạnh mẽ giúp tối ưu hiệu suất của các component function phức tạp bằng cách memoize các hàm giữa các lần rendr.

# useMemo
- Tránh thực hiện lại một logic nào đó khong cần thiết 
React useMemoHook trả về một giá trị được ghi nhớ.

# Phân biệt 2 cái useCallback vs useMemo 
 Sự khác biệt chính là useMemo trả về giá trị được ghi nhớ và useCallback trả về hàm được ghi nhớ. 

# useContext  
CompA -> CompB -> CompC
Truyền từ components cha xuống components con  

-1 Create context  `import {  createContext } from "react";`
-2 Provider  
   <ThemeContext.Provider value={theme}>   
   </ThemeContext.Provider>
-3 Consumer




# useReducer (Xử lý kiểu dữ liệu phức tạp hơn)
`- 1 Init state : 0`
`- 2 Actions: Up `
`- 3 Reducer `
`- 4 Dispatch là chức năng  ` Có 2 đối số
useReduce(reduce , initState)

Nhận vào hiện tại và hành động (state , aciton)

//Init state
const initState = 0

//Action
const UP_ACTION = 'up'
const DOWN_ACITON = 'down'

//Reduce
const reducer = (state, action) => {
  switch(action){
    case UP_ACTION:
      return state + 1
    case DOWN_ACITON:
      return state - 1
    default:
      throw new Error('INvalid action')
  }
}

  const [count , dispatch] =  useReducer(reducer , initState)

      <h1>{count}</h1>
<button onClick={() => dispatch(DOWN_ACITON)}>Down</button>
<button onClick={() => dispatch(UP_ACTION)}>Up</button>
