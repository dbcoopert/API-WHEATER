import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, Button } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

const API_KEY = "9d41f816a941a1ae772d7e1fed2f7efa";

export default function CityWeather() {
  const { city } = useLocalSearchParams();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=id`
        );
        const data = await res.json();

        if (data.cod !== 200) {
          setError("Kota tidak ditemukan!");
        } else {
          setWeather(data);
        }
      } catch {
        setError("Gagal memuat data cuaca.");
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
        <Button title="Kembali" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{weather.name}, {weather.sys?.country}</Text>
      <Image
        style={styles.icon}
        source={{
          uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`,
        }}
      />
      <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
      <Text style={styles.desc}>{weather.weather[0].description}</Text>
      <Text style={styles.info}>Kelembapan: {weather.main.humidity}%</Text>
      <Text style={styles.info}>Angin: {weather.wind.speed} m/s</Text>

      <Button title="Kembali" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#EAF2F8",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF2F8",
  },
  city: {
    fontSize: 24,
    fontWeight: "bold",
  },
  icon: {
    width: 120,
    height: 120,
  },
  temp: {
    fontSize: 36,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 18,
    textTransform: "capitalize",
  },
  info: {
    fontSize: 14,
    color: "#555",
  },
});
