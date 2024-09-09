import { render, screen } from "@testing-library/react";
import Card from "../components/Card/Card";

const carMock = {
  profileId: "1",
  carName: "Car A",
  km: "2000",
  fuel: "Petrol",
  cityName: "City A",
  price: "1000000",
  imageUrl: "car-a.jpg",
};

describe("Card Component", () => {
  it("renders car information", () => {
    render(<Card car={carMock} />);
    expect(screen.getByText(/Car A/i)).toBeInTheDocument();
    expect(screen.getByText(/2000 km/i)).toBeInTheDocument();
    expect(screen.getByText(/Petrol/i)).toBeInTheDocument();
    expect(screen.getByText(/1000000/i)).toBeInTheDocument();
  });
  
  it("renders default image when image URL is missing", () => {
    const carWithoutImage = { ...carMock, imageUrl: "" };
    render(<Card car={carWithoutImage} />);
    expect(screen.getByAltText(/blog/i).src).toContain("dummyimage.com");
  });

  // snapshot
  it("matches snapshot", () => {
    const { asFragment } = render(<Card car={carMock} />);
    expect(asFragment()).toMatchSnapshot();
  })
});
