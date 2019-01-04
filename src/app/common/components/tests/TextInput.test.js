import React from 'react';
import renderer from 'react-test-renderer';
import TextInput from '../TextInput';

describe('TextInput', () => {
  it('renders correctly', () => {
    const props = {
      autoFocus: true,
      className: 'my-class',
      name: 'textInput',
      id: 'text-input-id',
      placeholder: 'Text input placeholder',
      onBlur: jest.fn(),
      onChange: jest.fn()
    };
    const tree = renderer.create(<TextInput {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
