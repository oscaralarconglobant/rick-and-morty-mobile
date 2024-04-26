import React, {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';

import {CharacterItem} from '../components';
import {Character} from '../interfaces';
import {API} from '../utils';

const Container = styled.View`
  flex: 1;
  background-color: #02afc5;
  color: #a9f3fd;
`;

const FilterInput = styled.TextInput`
  margin: 10px;
  padding: 10px;
  border-width: 1px;
  border-color: #ccc;
`;

const CharacterList = styled.FlatList`
  flex: 1;
` as typeof FlatList<Character>;

const HomeScreen: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await API.getCharacters(page, nameFilter);
      const data = response.data.results as Character[];
      setCharacters(data);
    };

    fetchCharacters();
  }, [page, nameFilter]);

  const handleLoadMore = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const handleFilterChange = useCallback((text: string) => {
    setNameFilter(text);
  }, []);

  return (
    <Container>
      <FilterInput
        value={nameFilter}
        onChangeText={handleFilterChange}
        placeholder="Filtrar por nombre"
      />
      <CharacterList
        numColumns={2}
        data={characters}
        renderItem={({item}) => <CharacterItem item={item} />}
        keyExtractor={(item: Character) => item.id.toString()}
        onEndReached={handleLoadMore}
      />
    </Container>
  );
};

export default HomeScreen;
