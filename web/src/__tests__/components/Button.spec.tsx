import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Button from '../../components/Button';

describe('Button component', () => {
  it('shoud be able to render a button', () => {
    const { getByText } = render(<Button>button-test</Button>);

    const button = getByText('button-test');

    expect(button).toBeVisible();
  });

  it('should be able to click on button', () => {
    const onClickFunction = jest.fn();

    const { getByText } = render(
      <Button onClick={onClickFunction}>button-test</Button>,
    );

    const button = getByText('button-test');

    fireEvent.click(button);

    expect(onClickFunction).toHaveBeenCalled();
  });

  it('should not be able to click on a loading button', () => {
    const onClickFunction = jest.fn();

    const { getByText } = render(
      <Button onClick={onClickFunction} loading>
        button-test
      </Button>,
    );

    const button = getByText('Carregando...');

    fireEvent.click(button);

    expect(onClickFunction).not.toHaveBeenCalled();
  });
});
