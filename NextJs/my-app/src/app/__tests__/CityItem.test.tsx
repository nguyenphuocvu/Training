import { render, screen, fireEvent } from "@testing-library/react";
import CityItem from "../components/City/CityItem";
import { City } from "@/types";

const mockDeleteCity = jest.fn();
const mockEditCity = jest.fn();

jest.mock("../../hooks/useCityRedux.tsx", () => ({
  __esModule: true, 
  default: () => ({
    deleteCity: mockDeleteCity,
    editCity: mockEditCity,
  }),
}));

jest.mock("../../utils/socket.ts", () => ({
  emit: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
}));

const mockCity: City = {
  rank: 1,
  city: "Hanoi",
  state: "Vietnam",
  latitude: 21.0285,
  longitude: 105.8542,
};

describe("CityItem", () => {
  it("render city và các input button ", () => {
    render(<CityItem city={mockCity} group="Group A" />);
    expect(screen.getByDisplayValue("Hanoi")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("shows CityForm khi click Edit", () => {
    render(<CityItem city={mockCity} group="Group A" />);
    fireEvent.click(screen.getByText("Edit"));
    expect(screen.getByText("Lưu")).toBeInTheDocument();
    expect(screen.getByText("Huỷ")).toBeInTheDocument();
  });
});
