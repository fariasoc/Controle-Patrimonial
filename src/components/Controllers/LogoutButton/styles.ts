import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
`;