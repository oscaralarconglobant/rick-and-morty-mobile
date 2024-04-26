import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, Text} from 'react-native';
import styled from 'styled-components/native';

import {Bounce} from '../animations/bounce';
import OpenLinkInBrowser from '../components/OpenLinkInBrowser';
import {Character} from '../interfaces';
import {API} from '../utils';

const Container = styled.View`
  flex: 1;
  background-color: #9fded5;
  color: #303032;
`;

const CharacterImage = styled.Image`
  width: 200px;
  height: 200px;
  text-align: center;
`;

const CharacterInfo = styled.View`
  padding: 10px;
  padding-top: 10px;
`;

const CharacterTitle = styled.Text`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #303032;
`;

const CharacterDetail = styled.Text`
  font-size: 18px;
  margin-bottom: 5px;
  color: #70592d;
  font-family: ${props => props.theme.fontFamily};
`;

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
    <Container>
      <Bounce>
        <CharacterImage source={{uri: character.image}} />
      </Bounce>
      <CharacterInfo>
        <CharacterTitle>{character.name}</CharacterTitle>
        <CharacterDetail>Estatus: {character.status}</CharacterDetail>
        <CharacterDetail>Especie: {character.species}</CharacterDetail>
        <CharacterDetail>Género: {character.gender}</CharacterDetail>
        <CharacterDetail>Origen: {character.origin.name}</CharacterDetail>
        <CharacterDetail>
          Episodios:
          <FlatList
            numColumns={1}
            data={character.episode}
            renderItem={OpenLinkInBrowser}
            keyExtractor={(item: string) => item}
          />
        </CharacterDetail>
      </CharacterInfo>
    </Container>
  );
};

export default DetailScreen;
