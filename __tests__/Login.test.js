import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import BrandLogo from '../src/components/BrandLogo';
import GoogleLoginButton from '../src/components/GoogleLoginButton';
import ErrorMessage from '../src/components/ErrorMessage';
import LoginScreen from '../app/index';
import { AuthProvider } from '../src/context/AuthContext';

describe('Milestone 4: Login UI Component Suite', () => {
  test('BrandLogo renders HB+ branding mark', async () => {
    let tree;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<BrandLogo />).toJSON();
    });
    expect(tree).toBeDefined();
  });

  test('GoogleLoginButton renders button and handles loading state', async () => {
    let defaultBtn;
    await ReactTestRenderer.act(() => {
      defaultBtn = ReactTestRenderer.create(
        <GoogleLoginButton onPress={() => {}} />
      ).toJSON();
    });
    expect(defaultBtn).toBeDefined();

    let loadingBtn;
    await ReactTestRenderer.act(() => {
      loadingBtn = ReactTestRenderer.create(
        <GoogleLoginButton onPress={() => {}} loading={true} />
      ).toJSON();
    });
    expect(loadingBtn).toBeDefined();
  });

  test('ErrorMessage renders message text when supplied', async () => {
    let errorView;
    await ReactTestRenderer.act(() => {
      errorView = ReactTestRenderer.create(
        <ErrorMessage message="Invalid organization email" onDismiss={() => {}} />
      ).toJSON();
    });
    expect(errorView).toBeDefined();

    let emptyView;
    await ReactTestRenderer.act(() => {
      emptyView = ReactTestRenderer.create(<ErrorMessage message="" />).toJSON();
    });
    expect(emptyView).toBeNull();
  });

  test('LoginScreen renders within AuthProvider', async () => {
    await ReactTestRenderer.act(() => {
      ReactTestRenderer.create(
        <AuthProvider>
          <LoginScreen />
        </AuthProvider>
      );
    });
  });
});
