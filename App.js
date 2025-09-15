import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function App() {
  //Processo do GET - Solicitar dados do servidor
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const API = "http://192.168.100.109:3000/api";
    const URL = `${API}/user`;
    setLoading(true);

    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const postData = async () => {
    const API = "http://192.168.100.109:3000/api";
    const URL = `${API}/user`;
    setLoading(true);

    //Se orientar pelo servidor quais dados obrigatórios devem ser enviados
    body = { username: "Graziani01", email: "graziani01@etec.sp.gov.br" };

    //Padrão pelo qual será enviado o dado
    headers = { "Content-Type": "application/json" };

    page = {
       method: "POST",
       body: JSON.stringify(body),
       headers
    }

    try {
      const response = await fetch(URL, page);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      Alert.alert('Dados enviados com sucesso');
    } catch (error) {
      console.log(error);
      Alert.alert('Dados com erro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Projeto TCC - Turma B</Text>
      <View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            <Button title="Buscar Dados" onPress={fetchData} />
            <Button title="Limpar Dados" onPress={() => setData([])} />
              <Button title="Gravar Dados" onPress={postData} />
          </>
        )}
        {data &&
          data.map((item) => {
            return <Text key={item.id}>{item.email}</Text>;
          })}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
