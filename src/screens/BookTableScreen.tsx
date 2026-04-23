import { Ionicons } from '@expo/vector-icons';
import type { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { bookingDates, bookingTimes, getRestaurantById } from '../data/mockData';
import { BookingDateSelector } from '../components/booking/BookingDateSelector';
import { TimeSlotGrid } from '../components/booking/TimeSlotGrid';
import { IconCircleButton } from '../components/common/IconCircleButton';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { SectionTitle } from '../components/common/SectionTitle';
import { GradientHeaderShell } from '../components/layout/GradientHeaderShell';
import { Screen } from '../components/layout/Screen';
import { theme } from '../theme';

type BookTableRoute = RouteProp<{ BookTable: { restaurantId: string } }, 'BookTable'>;

type BookTableScreenProps = {
  navigation: NavigationProp<ParamListBase>;
  route: BookTableRoute;
};

export function BookTableScreen({ navigation, route }: BookTableScreenProps) {
  const restaurant = getRestaurantById(route.params.restaurantId);
  const [selectedDateId, setSelectedDateId] = useState(bookingDates[0]?.id ?? '');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Screen contentContainerStyle={styles.content}>
        <GradientHeaderShell>
          <View style={styles.headerRow}>
            <IconCircleButton onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back-outline" size={28} color={theme.colors.surface} />
            </IconCircleButton>

            <View style={styles.headerCopy}>
              <Text style={styles.title}>Book a Table</Text>
              <Text style={styles.subtitle}>{restaurant?.name ?? 'Restaurant'}</Text>
            </View>

            <View style={styles.headerSpacer} />
          </View>
        </GradientHeaderShell>

        <View style={styles.section}>
          <SectionTitle
            title="Select Date"
            icon={<Ionicons name="calendar-outline" size={28} color={theme.colors.danger} />}
          />
          <BookingDateSelector
            dates={bookingDates}
            selectedDateId={selectedDateId}
            onSelect={setSelectedDateId}
          />
        </View>

        <View style={styles.timeSection}>
          <View style={styles.section}>
            <SectionTitle
              title="Select Time"
              icon={<Ionicons name="time-outline" size={28} color={theme.colors.danger} />}
            />
            <TimeSlotGrid times={bookingTimes} selectedTime={selectedTime} onSelect={setSelectedTime} />
          </View>
        </View>
      </Screen>

      <View style={styles.footer}>
        <PrimaryButton label="Confirm Booking" variant="muted" disabled={!selectedTime} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    gap: theme.spacing.xxxl,
    paddingBottom: 160,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  headerCopy: {
    flex: 1,
  },
  title: {
    color: theme.colors.surface,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
    marginTop: 2,
  },
  headerSpacer: {
    width: 56,
  },
  section: {
    gap: theme.spacing.xl,
  },
  timeSection: {
    backgroundColor: '#F3F5FA',
    paddingVertical: theme.spacing.xxxl,
    paddingHorizontal: theme.spacing.xxl,
  },
  footer: {
    position: 'absolute',
    left: theme.spacing.xxl,
    right: theme.spacing.xxl,
    bottom: 104,
  },
});
