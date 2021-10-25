import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Register } from ".";
import { ThemeProvider } from "styled-components/native";
import theme from "../../global/styles/theme";
import { AuthProvider } from "../../hooks/auth";

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("Input Component", () => {
  it("must have specific border color when active", async () => {
    const { getByTestId } = render(<Register />, { wrapper: Providers });
    const categoryModal = getByTestId("modal-category");
    const buttonCategory = getByTestId("button-category");
    fireEvent.press(buttonCategory);
    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    });
  });
});

// describe("Register Screen", () => {
//   it("should be opened category modal when user clicks the button", async () => {
//     const { getByTestId } = render(<Register />, { wrapper: Providers });
//     const categoryModal = getByTestId("modal-category");
//     const buttonCategory = getByTestId("button-category");
//     fireEvent.press(buttonCategory);
//     await waitFor(() => {
//       expect(categoryModal.props.visible).toBeTruthy();
//     });
//   });
// });
