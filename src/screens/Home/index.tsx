import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native'

import { styles } from './styles'
import { Participant } from '../../components/Participant'
import { useState } from 'react'

export function Home() {
  const [name, setName] = useState('')
  const [participants, setParticipants] = useState<string[]>([])

  function handleAddParticipant() {
    if (participants.includes(name)) {
      Alert.alert(
        'Participante já existe',
        'Já existe um participante na lista com esse nome',
      )

      return
    }

    setParticipants((prevState) => [...prevState, name])
    setName('')
  }

  function handleRemoveParticipant(name: string) {
    Alert.alert('Remover participante', `Remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => {
          setParticipants((prevState) =>
            prevState.filter((participant) => participant !== name),
          )

          Alert.alert('Deletado')
        },
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento</Text>

      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022.</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setName}
          value={name}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddParticipant}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.participants}
        data={participants}
        keyExtractor={(a, b) => String(b)}
        renderItem={({ item }) => (
          <Participant
            name={item}
            onRemove={() => handleRemoveParticipant(item)}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>
            Ninguém chegou no evento ainda? Adicione participantes à sua lista
            de presença
          </Text>
        )}
      />
    </View>
  )
}
