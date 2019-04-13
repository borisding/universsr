import React from 'react';
import renderer from 'react-test-renderer';
import Checkbox from '../Checkbox';

describe('Checkbox', () => {
  it('renders correctly', () => {
    const props = {
      className: 'my-class',
      name: 'testCheckbox',
      id: 'test-checkbox-id',
      isChecked: true,
      onChange: jest.fn(),
      onClick: jest.fn()
    };
    const tree = renderer.create(<Checkbox {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
