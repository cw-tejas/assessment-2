import { render, fireEvent, screen } from "@testing-library/react";
import Listing from "../components/Listing/Listing";

const carsMock = [
  { profileId: "2", carName: "Car B", km: "5000", fuel: "Diesel", cityName: "City B", price: "1500000", imageUrl: "car-b.jpg", priceNumeric: "15000000" },
  { profileId: "1", carName: "Car A", km: "2000", fuel: "Petrol", cityName: "City A", price: "1000000", imageUrl: "car-a.jpg", priceNumeric: "10000000" },
  { profileId: "3", carName: "Car C", km: "10000", fuel: "Electric", cityName: "City C", price: "2000000", imageUrl: "car-c.jpg", priceNumeric: "20000000" },
];

const carsMockAscending = [
  { profileId: "1", carName: "Car A", km: "2000", fuel: "Petrol", cityName: "City A", price: "1000000", imageUrl: "car-a.jpg", priceNumeric: "10000000" },
  { profileId: "2", carName: "Car B", km: "5000", fuel: "Diesel", cityName: "City B", price: "1500000", imageUrl: "car-b.jpg", priceNumeric: "15000000" },
  { profileId: "3", carName: "Car C", km: "10000", fuel: "Electric", cityName: "City C", price: "2000000", imageUrl: "car-c.jpg", priceNumeric: "20000000" },
];

describe("Listing Component", () => {
  const handleSortChange = jest.fn();
  
  it("renders car listings", () => {
    render(<Listing cars={carsMock} filter={{}} handleSortChange={handleSortChange} />);
    expect(screen.getByText(/Car A/i)).toBeInTheDocument();
    expect(screen.getByText(/Car B/i)).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<Listing cars={carsMock} filter={{}} handleSortChange={handleSortChange} />);
    expect(asFragment).toMatchSnapshot();
  });

  it("handles sort option change", () => {
    render(<Listing cars={carsMock} filter={{ sort: "best-match" }} handleSortChange={handleSortChange} />);
    const selectElement = screen.getByRole("combobox");

    fireEvent.change(selectElement, { target: { value: "price-low-high" } });
    console.log(selectElement.value);

    expect(handleSortChange).toHaveBeenCalledTimes(1);
  });
});
