import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../../app/navigation/navigation';

export const useNavigate = () => {
  const navigation = useNavigation<StackNavigation>();
  return navigation;
};
