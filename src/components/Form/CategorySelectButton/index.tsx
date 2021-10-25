import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Icon, Category } from "./styles";

type Props = RectButtonProps & {
  title: string;
  onPress: () => void;
};

export function CategorySelectButton({ title, onPress, testID }: Props) {
  return (
    <Container onPress={onPress} testID={testID}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
}
