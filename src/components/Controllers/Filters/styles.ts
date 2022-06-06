import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  margin-bottom: 15px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.TEXT};
  text-align: center;
  margin-bottom: 15px;

`;

export const Options = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
`;