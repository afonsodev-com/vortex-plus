import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native'; 
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Avatar } from 'tamagui';

const Header: React.FC = () => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
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
        <TouchableOpacity style={{ marginHorizontal: 10 }}>
          <Avatar borderRadius={2} size="$2">
            <Avatar.Image src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" />
            <Avatar.Fallback bc="red" />
          </Avatar>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;