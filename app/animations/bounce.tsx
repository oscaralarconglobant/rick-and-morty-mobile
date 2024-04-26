import React, {ReactNode, useEffect} from 'react';
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

const initialOffset = 200;

interface IProps {
  children: ReactNode;
}

const Container = styled.View`
  width: 1px;
  margin: 0 auto;
  justify-content: center;
`;

const Box = styled(Animated.View)`
  height: 210px;
  width: 210px;
`;

export const Bounce = ({children}: IProps) => {
  const offset = useSharedValue(initialOffset);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));

  useEffect(() => {
    offset.value = withSpring(-offset.value, {
      mass: 7.9,
      damping: 14,
      stiffness: 46,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2,
      reduceMotion: ReduceMotion.System,
    });
  }, [offset]);

  return (
    <Container>
      <Box style={animatedStyles}>{children}</Box>
    </Container>
  );
};
