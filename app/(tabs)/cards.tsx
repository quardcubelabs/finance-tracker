import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function CardsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Cards</Text>
      </View>
      
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardNumber}>**** **** **** 1234</Text>
          <Text style={styles.cardType}>Visa Debit</Text>
          <Text style={styles.cardBalance}>$2,450.00</Text>
        </View>
        
        <View style={[styles.card, styles.creditCard]}>
          <Text style={styles.cardNumber}>**** **** **** 5678</Text>
          <Text style={styles.cardType}>Mastercard Credit</Text>
          <Text style={styles.cardBalance}>$1,200.00</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  cardContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    minHeight: 180,
    justifyContent: 'space-between',
  },
  creditCard: {
    backgroundColor: '#2196F3',
  },
  cardNumber: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
    letterSpacing: 2,
  },
  cardType: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  cardBalance: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});