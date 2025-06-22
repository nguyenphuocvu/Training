import { render, screen, fireEvent } from "@testing-library/react";
import AddList from "../components/AddCityForm/AddList";

describe("AddList" , () => {
    it("render add button " , () => {
        render(<AddList onAdd={() => {}}/>)
        expect(screen.getByText("+")).toBeInTheDocument()
    })
    it("shows FormAddList khi click + " , () => {
        render(<AddList onAdd={() => {}}/>)
        fireEvent.click(screen.getByText("+"))
       expect(screen.getByPlaceholderText("Enter list name")).toBeInTheDocument()
    })
    it("gọi onAdd và ẩn sau khi gửi" , () => {
        const onAdd = jest.fn()
        render(<AddList onAdd={onAdd}/>)

        fireEvent.click(screen.getByText("+"))
        fireEvent.change(screen.getByPlaceholderText("Enter list name"), {
            target: {value : "New List"}
        })
        fireEvent.click(screen.getByText("Add List"))

        expect(onAdd).toHaveBeenCalledWith("New List")
        expect(screen.queryByPlaceholderText("Enter list name")).not.toBeInTheDocument()
    })
    it("ẩn khi click Hủy" , () => {
        render(<AddList onAdd={() => {}} />)
        fireEvent.click(screen.getByText("+"))
        fireEvent.click(screen.getByText("Cancel"))

        expect(screen.queryByPlaceholderText("Enter list name")).not.toBeInTheDocument()
    })
})