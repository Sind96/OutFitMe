import { render as rtlRender, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

import SignIn from "../Pages/Login/SignIn";
import { store } from "../store/store";
import { ReactNode } from "react";
import { JSX } from "react/jsx-runtime";

const render = (component: string | number | boolean | JSX.Element | Iterable<ReactNode> | null | undefined) => rtlRender(
  <Provider store={store}>
    <BrowserRouter> 
      {component}
    </BrowserRouter>
  </Provider>
)

describe("SignIn", () => {
 
  it("renders the Apps name", () => {
    render(<SignIn />);
    expect(screen.getByText("OutFitMe")).toBeInTheDocument();
  });

  // New Tests:

  it("should render username input field with placeholder 'Username'", () => {
    render(<SignIn />);
    const usernameInput = screen.getByPlaceholderText("Username");
    expect(usernameInput).toBeInTheDocument();
  });

  it("should render password input field with placeholder 'Password'", () => {
    render(<SignIn  />);
    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeInTheDocument();
  });

  it("should disable the submit button when isLoading is true", () => {
    render(<SignIn/>);
    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeEnabled();
  });

  it("should render a link to the SignUp component with text 'Sign up'", () => {
    render(<SignIn />);
    const signUpLink = screen.getByText("Sign up");
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink.closest("a")).toHaveAttribute("href", "/signup"); // Check for expected href
  });
});
