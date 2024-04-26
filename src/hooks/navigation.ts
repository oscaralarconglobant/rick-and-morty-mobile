import {useNavigation} from '@react-navigation/native';


export const useNavigate = () => {
  const navigation = useNavigation<StackNavigation>();
  return navigation;
};
