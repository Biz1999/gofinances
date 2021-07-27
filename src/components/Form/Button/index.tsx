import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Container,
  Title,
} from './styles';

type Props = {
  title: string;
  onPress: () => void;
}

export function Button({
  title,
  onPress,
  ...rest
}: Props) {
  return (
    <Container onPress={onPress} {...rest}>
      <Title>
        {title}
      </Title>
    </Container>
  );
}