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
    const API = "http://192.170.0.129:3000/api";
    const URL = `${API}/user`;
    console.log(URL);
    setLoading(true);

    try {
      const response = await fetch(URL);
      const json = await response.json();
      setData(json)
      console.log(json);
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
          <Button title="Buscar Dados" onPress={fetchData} />
        )}
        {data &&
          data.map((item) => {
            return <Text>{item.email}</Text>;
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
