import React from 'react';
import { shallow } from 'enzyme';
import { LoginForm } from 'components/SideBar/comps/LoginForm/LoginForm';
/* Components */
import IconSignIn from 'assets/icons/IconSignIn';
import {
  ComponentBase,
  FormButton,
  InfoText,
  Link,
  LoginHeader,
  LoginHeaderLabel,
  TextField
} from './LoginForm.styles';
import ForgetPassword from '../ForgetPassword/ForgetPassword';

const wrapper = shallow(
  <LoginForm auth0Client={{ isAuthenticated: () => false }} />
);

describe('<LoginForm />', () => {
  it('renders one <ComponentBase/> component', () => {
    expect(wrapper.find(ComponentBase)).toHaveLength(1);
  });
  it('renders one <LoginHeader/> component', () => {
    expect(wrapper.find(LoginHeader)).toHaveLength(1);
  });
  it('renders one <IconSignIn/> component', () => {
    expect(wrapper.find(IconSignIn)).toHaveLength(1);
  });
  it('renders one <LoginHeaderLabel/> component', () => {
    expect(wrapper.find(LoginHeaderLabel)).toHaveLength(1);
  });
  it('renders two <TextField/> component', () => {
    expect(wrapper.find(TextField)).toHaveLength(2);
  });
  it('renders one <FormButton/> component', () => {
    expect(wrapper.find(FormButton)).toHaveLength(1);
  });
  it('renders one <ForgetPassword/> component', () => {
    expect(wrapper.find(ForgetPassword)).toHaveLength(1);
  });
  it('renders one <InfoText/> component', () => {
    expect(wrapper.find(InfoText)).toHaveLength(1);
  });
  it('renders one <Link/> component', () => {
    expect(wrapper.find(Link)).toHaveLength(1);
  });
});
