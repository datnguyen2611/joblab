import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1000px;
  //margin-left: auto;
  margin-right: auto; 
`;

export const Header = styled(Container)`
  text-align: center; 
  color: palevioletred;
  font-weight: bold;
  font-size: 24px;
  padding: 20px;
`;

export const Main = styled(Container)``;

{/*export const BoxToggle = styled.div`
  margin: 30px auto;
  text-align: center;
`;*/}

export const BoxExpand = styled.div`
  color: #000000;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-color: #575757;
  border-radius: 4px;
  margin: 20px;
  flex: auto;
`;

export const BoxExpand1 = styled(BoxExpand)`
  background-color: #7795f8;
`;

{/*export const Button = styled.a`
  cursor: pointer;
  white-space: nowrap;
  display: inline-block;
  height: 40px;
  width: 200px;
  line-height: 40px;
  padding: 0 14px;
  background: #d1d1d1;
  border-radius: 4px;
  font-size: 14px;
  letter-spacing: .025em;
  color: #fff;
  text-decoration: none;
  
  &:hover {
      transform: translateY(-2px);
      box-shadow: 0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08);
  }
`;*/}

export const ExpandBoxes = styled.div`
  display: flex;
  justify-content: space-around;
`;