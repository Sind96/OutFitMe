import { render, screen } from "../Utils/test-utils";
import SignIn from "../pages/login/SignIn";

import App from '../App';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';


describe('With React Testing Library', () => {
  const initialState = { output: 10 };
  const mockStore = configureStore();
  let store;

  it('should render the SignIn component"', () => {
      store = mockStore(initialState);
      const { getByText } = render(
          <Provider store={store}>
              <SignIn />
          </Provider>
      );

      const text = screen.getByText(/Sign In/i);
      expect(text).toBeInTheDocument();
  });
});


