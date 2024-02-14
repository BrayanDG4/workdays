// ExportToPDF.js
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  subheader: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  userContainer: {
    marginBottom: 10,
  },
  userName: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  scheduleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: "0 -2px",
  },
  scheduleItem: {
    width: "12.5%",
    padding: 5,
    marginBottom: 5,
    textAlign: "center",
    border: "1px solid #000",
    backgroundColor: "#D2E3F0",
  },
  dayOfWeek: {
    width: "12.5%",
    padding: 5,
    marginBottom: 5,
    textAlign: "center",
    fontWeight: "bold",
    border: "1px solid #000",
    backgroundColor: "#EDF3EF",
  },
});

export const ExportToPDF = ({ week }) => {
  const { number, users } = week;
  const daysOfWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Semana {number}</Text>
          <View style={styles.scheduleContainer}>
            {daysOfWeek.map((day) => (
              <Text key={day} style={styles.dayOfWeek}>
                {day}
              </Text>
            ))}
          </View>
          {Array.isArray(users) &&
            users.map((user) => (
              <View key={user.id} style={styles.userContainer}>
                <Text style={styles.userName}>{user.name}</Text>
                <View style={styles.scheduleContainer}>
                  {Object.keys(user.schedule).map((day) => (
                    <Text key={day} style={styles.scheduleItem}>
                      {user.schedule[day]}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
        </View>
      </Page>
    </Document>
  );
};

