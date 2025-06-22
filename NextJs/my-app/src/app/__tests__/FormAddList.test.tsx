import { render, screen, fireEvent } from "@testing-library/react";
import FormAddList from "../components/AddCityForm/FormAddList";
describe("FormAddList" , () => {
    it("hiển thị đầu vào và các nút" , () => {
        render(<FormAddList  onAddList={() => {}} onCancel={() => {}}/>)
        expect(screen.getByPlaceholderText("Enter list name")).toBeInTheDocument()
        expect(screen.getByText("Add List")).toBeInTheDocument()
        expect(screen.getByText("Cancel")).toBeInTheDocument()
    })
    it("gọi onAddList khi đầu vào không trống và đã gửi" , () => {
        const onAddList = jest.fn()
        render(<FormAddList onAddList={onAddList} onCancel={() => {}} />)

        fireEvent.change(screen.getByPlaceholderText("Enter list name"), {
            target: {value : "My List"}
        })
        fireEvent.click(screen.getByText("Add List"))

        expect(onAddList).toHaveBeenCalledWith("My List");
    })
    it("không gọi onAddList khi đầu vào trống" , () => {
        const onAddList = jest.fn()
        render(<FormAddList onAddList={onAddList} onCancel={() => {}}/>)

        fireEvent.click(screen.getByText("Add List"))
        expect(onAddList).not.toHaveBeenCalled()
    })
    it("gọi Cancel" , () => {
        const onCancel = jest.fn()
        render (<FormAddList onAddList={() => {}} onCancel={onCancel}/>)

        fireEvent.click(screen.getByText("Cancel"))
        expect(onCancel).toHaveBeenCalled()
    })
})