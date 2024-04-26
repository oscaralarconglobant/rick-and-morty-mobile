import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';

import {Character} from '../../app/interfaces';
import {API} from '../../app/utils/API';

const DetailScreen: React.FC = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const route = useRoute();
  const params = route.params as {id: number};

  useEffect(() => {
    const fetchCharacter = async () => {
      const response = await API.getCharacter(params?.id);
      const data = response.data as Character;
      setCharacter(data);
    };

    fetchCharacter();
  }, [params]);

  if (!character) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View>
      <Image
        source={{uri: character.image}}
        style={{width: 200, height: 200, margin: 10}}
      />
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>{character.name}</Text>
      <Text style={{margin: 10}}>Estatus: {character.status}</Text>
      <Text style={{margin: 10}}>Especie: {character.species}</Text>
      <Text style={{margin: 10}}>Género: {character.gender}</Text>
      <Text style={{margin: 10}}>Origen: {character.origin.name}</Text>
      <Text style={{margin: 10}}>
        Episodios: {character.episode.join(', ')}
      </Text>
    </View>
  );
};

export default DetailScreen;
