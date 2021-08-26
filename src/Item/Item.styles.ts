import styled from 'styled-components';
export const Wrapper = styled.div`
 color:white;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  border: 1px solid lightblue;
  border-radius: 20px;
  height: 100%;
  button {
    border-radius: 0 0 20px 20px;
    color:rgba(248, 9, 121, 0.993);
    font-weight: bold
  }
  img {
    max-height: 200px;
    object-fit: cover;
    border-radius: 20px 20px 0 0;
  }
  div {
    font-family: 'Poppins', sans-serif;
    padding: 1rem;
    height: 100%;
  }
`;