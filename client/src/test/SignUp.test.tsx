import { render as rtlRender, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

import SignUp from "../pages/login/SignUp";
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

describe("SignUp", () => {
  it("renders the SignUp component", () => {
    render(<SignUp />);
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("renders the apps name -OutFitMe-", () => {
    render(<SignUp />);
    expect(screen.getByText("OutFitMe")).toBeInTheDocument();
  });
  
  it("should render username input field with placeholder 'Username'", () => {
    render(<SignUp />);
    const usernameInput = screen.getByPlaceholderText("Username");
    expect(usernameInput).toBeInTheDocument();
  });

  it("should render email input field with placeholder 'email'", () => {
    render(<SignUp />);
    const emailInput = screen.getByPlaceholderText("email");
    expect(emailInput).toBeInTheDocument();
  });

  it("should render password input field with placeholder 'password'", () => {
    render(<SignUp />);
    const passwordInput = screen.getByPlaceholderText("password");
    expect(passwordInput).toBeInTheDocument();
  });

  it("should disable the submit button when isLoading is true", () => {
    render(<SignUp />);
    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeEnabled();
  });

  it("should render a link to the SignIn component with text 'Sign in'", () => {
    render(<SignUp />);
    const signInLink = screen.getByText("Sign in");
    expect(signInLink).toBeInTheDocument();
    expect(signInLink.closest("a")).toHaveAttribute("href", "/"); // Check for expected href
  });
  
});