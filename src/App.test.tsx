import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

describe('MyComponent', () => {
  it('should render correctly in "debug" mode', () => {
    const app = shallow(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(app).toMatchSnapshot();
  });
});
