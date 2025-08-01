import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ProgressBar from 'react-native-progress-bar-horizontal';

// hardcoded in the information for right now becuase i havent checked out the db that is the next step though

export default function Home() {
  const goalsCompleted = 13;
  const goalsTotal = 16;
  const progressPercentage = goalsCompleted / goalsTotal;
  // first card hardcoded data
  const totalGoalsCompleted = 29;
  const currentDayStreak = 5;
  // third card hardcoded data 
  const activityMessage = "There's been an uptick in your recent activity.";

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={{ color: "white", marginBottom: 8 }}>
          Weekly Goals: {goalsCompleted}/{goalsTotal}
        </Text>
        <ProgressBar
          progress={progressPercentage}
          borderWidth={1}
          fillColor="#00ff1a"
          unfilledColor="#085200ff"
          height={20}
          borderColor="#00ff1a"
          duration={100}
          width={350}
          borderRadius={15}
        />
      </View>

      <View style={styles.cards}>
        {/* top card for total goals and streak  */}
        <View style={[styles.card, styles.topCard, styles.glowBorder]}>
          <View style={styles.cardRow}>
            <View style={styles.cardSection}>
              <Text style={styles.largeText}>{totalGoalsCompleted}</Text>
              <Text style={styles.smallText}>Goals Completed</Text>
            </View>
            <View style={styles.cardSection}>
              <View style={styles.streakRow}>
                <Text style={styles.largeText}>{currentDayStreak}</Text>
                <Image
                  source={require('../assets/images/fire.png')}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.smallText}>Day Streak</Text>
            </View>
          </View>
        </View>

        {/* future avery's problem */}
        <View style={[styles.card, styles.glowBorder, { flex: 1 }]} />

        <View style={[styles.card, styles.bottomCard, styles.glowBorder]}>
          <View style={styles.bottomCardRow}>
            <Text style={styles.activityText}>{activityMessage}</Text>
            <View style={styles.iconSection}>
              <Image
                source={require('../assets/images/graph.png')} // use placeholder for now
                style={styles.trendingIcon}
              />
              <Text style={styles.linkText}>see more &gt;</Text>
            </View>
          </View>
        </View>


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222222",
  },
  content: {
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: "center",
  },
  cards: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#3c3c3c",
    borderRadius: 12,
    marginBottom: 20,
    padding: 20,
  },
  glowBorder: {
    borderWidth: 2,
    borderColor: "#00ff91",
    shadowColor: "#00ff91",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  topCard: {
    flex: 1,
    marginTop: 20,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  cardSection: {
    alignItems: "center",
    flex: 1,
  },
  largeText: {
    color: "white",
    fontSize: 56,
    fontWeight: "bold",
  },
  smallText: {
    color: "white",
    fontSize: 24,
    marginTop: 4,
    textAlign: "center",
  },
  icon: {
    width: 32,
    height: 32,
    marginTop: 4,
    marginBottom: 4,
  },
  streakRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  bottomCard: {
  flex: 0.8,
  justifyContent: 'center',
  padding: 16,
},

bottomCardRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

activityText: {
  color: 'white',
  fontSize: 24,
  flex: 1.2, 
  flexWrap: 'wrap',
},

iconSection: {
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
},

trendingIcon: {
  width: 70,
  height: 70,
  marginBottom: 6,
},

linkText: {
  color: '#00aaff',
  fontSize: 16,
},

});
