// component/Header.tsx
import { View, Image, TouchableOpacity } from 'react-native'; 
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { Avatar } from 'tamagui';

const Header: React.FC = () => {
  const navigation = useNavigation();

  const handleAvatarClick = () => {
    navigation.navigate('(profile)');
  };
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
      <Image
        source={require('../assets/images/favicon.png')}
        style={{ width: 30, height: 30, marginLeft: 10 }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={{ marginHorizontal: 10 }}>
          <MaterialIcons name="cast" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 10 }}>
          <Ionicons name="search-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={handleAvatarClick}>
          <Avatar borderRadius={2} size="$2">
            <Avatar.Image src="https://i.imgur.com/8rVCbDp.png" />
            <Avatar.Fallback bc="red" />
          </Avatar>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;