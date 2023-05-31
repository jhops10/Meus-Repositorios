import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;
  background-color: #fff;

  h1 {
    font-size: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 10px;
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid ${(props) => (props.error ? '#ff0000' : '#eee')};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 17px;
  }
`;

//Animação Botão
const animate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }

`;
//Animação Botão

export const SubmitButton = styled.button.attrs((props) => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background-color: #222;
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${animate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 20px;

  li {
    padding: 15px 0;
    border: 1px solid #eee;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 7px;
    margin: 5px 0;
    border-radius: 4px;
  }

  a {
    color: #222;
    text-decoration: none;
  }
`;

export const DeleteButton = styled.button.attrs({
  type: 'button',
})`
  background-color: transparent;
  color: #222;
  border: none;
  padding: 8px 15px;
  outline: 0;
  border-radius: 4px;
`;
