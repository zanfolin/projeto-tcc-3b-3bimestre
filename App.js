import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ActivityIndicator,
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

    body = { username: "Graziani01", email: "graziani01@etec.sp.gov.br" };

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
