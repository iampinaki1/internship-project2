import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useAuth } from '../src/context/AuthContext';
import Colors from '../src/constants/colors';

export default function DashboardScreen() {
  const { user, logout } = useAuth?.() || {};
  const { width } = useWindowDimensions();
  const isTabletOrDesktop = width >= 600;

  // Tab State: 'overview' | 'tasks' | 'profile'
  const [activeTab, setActiveTab] = useState('overview');

  // Attendance State
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [workMode, setWorkMode] = useState('Office'); // 'Office' | 'Remote'

  // Tasks State
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Set up React Native & Android environment', done: true },
    { id: 2, title: 'Configure Web support with Vite & RN Web', done: true },
    { id: 3, title: 'Complete Google OAuth single sign-on', done: false },
    { id: 4, title: 'Review sprint deliverables with mentor', done: false },
  ]);

  // Standup Note State
  const [standupNote, setStandupNote] = useState('');
  const [standupSaved, setStandupSaved] = useState(false);

  // Toggle Attendance
  const handleToggleAttendance = () => {
    if (!checkedIn) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCheckedIn(true);
      setCheckInTime(timeStr);
    } else {
      setCheckedIn(false);
      setCheckInTime(null);
    }
  };

  // Toggle Task Completion
  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  // Save Standup
  const handleSaveStandup = () => {
    if (standupNote.trim()) {
      setStandupSaved(true);
      setTimeout(() => setStandupSaved(false), 3000);
    }
  };

  const completedCount = tasks.filter((t) => t.done).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.container,
        isTabletOrDesktop && styles.containerDesktop,
      ]}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View style={styles.card}>
        {/* Workspace Brand Header */}
        <View style={styles.header}>
          <Text style={styles.brandTitle}>
            HB<Text style={styles.brandPlus}>+</Text> Workspace
          </Text>
          <Text style={styles.welcomeText}>
            Welcome, <Text style={styles.userName}>{user?.name || 'Intern'}</Text>
          </Text>
        </View>

        {/* Navigation Tabs */}
        <View style={styles.tabBar}>
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'tasks', label: `Tasks (${completedCount}/${tasks.length})` },
            { key: 'profile', label: 'Profile' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tabButton,
                activeTab === tab.key && styles.tabButtonActive,
                Platform.OS === 'web' && { cursor: 'pointer', userSelect: 'none' },
              ]}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === tab.key && styles.tabButtonTextActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <View style={styles.tabContent}>
            {/* Attendance & Check-In Widget */}
            <View style={styles.widgetCard}>
              <View style={styles.widgetHeader}>
                <Text style={styles.widgetTitle}>Daily Attendance</Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: checkedIn ? '#E8F5E9' : '#FFF3E0' },
                  ]}
                >
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: checkedIn ? '#2E7D32' : '#EF6C00' },
                    ]}
                  />
                  <Text
                    style={[
                      styles.statusBadgeText,
                      { color: checkedIn ? '#2E7D32' : '#EF6C00' },
                    ]}
                  >
                    {checkedIn ? `Checked in at ${checkInTime}` : 'Not Checked In'}
                  </Text>
                </View>
              </View>

              {/* Work Mode Selector */}
              <View style={styles.workModeRow}>
                <Text style={styles.workModeLabel}>Mode:</Text>
                {['Office', 'Remote'].map((mode) => (
                  <TouchableOpacity
                    key={mode}
                    style={[
                      styles.modePill,
                      workMode === mode && styles.modePillActive,
                      Platform.OS === 'web' && { cursor: 'pointer', userSelect: 'none' },
                    ]}
                    onPress={() => setWorkMode(mode)}
                  >
                    <Text
                      style={[
                        styles.modePillText,
                        workMode === mode && styles.modePillTextActive,
                      ]}
                    >
                      {mode === 'Office' ? '🏢 Office' : '🏠 Remote'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Check-In / Check-Out Button */}
              <TouchableOpacity
                style={[
                  styles.attendanceButton,
                  checkedIn && styles.attendanceButtonActive,
                  Platform.OS === 'web' && { cursor: 'pointer', userSelect: 'none' },
                ]}
                onPress={handleToggleAttendance}
                activeOpacity={0.85}
              >
                <Text style={styles.attendanceButtonText}>
                  {checkedIn ? 'Check Out' : 'Check In Now'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Daily Standup Notes Card */}
            <View style={styles.widgetCard}>
              <Text style={styles.widgetTitle}>Daily Standup & Notes</Text>
              <TextInput
                style={styles.standupInput}
                placeholder="What did you achieve today? Any blockers?"
                placeholderTextColor={Colors.mediumGray}
                multiline
                numberOfLines={3}
                value={standupNote}
                onChangeText={setStandupNote}
              />
              <TouchableOpacity
                style={[
                  styles.saveButton,
                  Platform.OS === 'web' && { cursor: 'pointer', userSelect: 'none' },
                ]}
                onPress={handleSaveStandup}
                activeOpacity={0.85}
              >
                <Text style={styles.saveButtonText}>
                  {standupSaved ? '✓ Saved Successfully' : 'Submit Daily Note'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* TAB 2: TASKS */}
        {activeTab === 'tasks' && (
          <View style={styles.tabContent}>
            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>Milestone Progress</Text>
                <Text style={styles.progressValue}>{progressPercent}%</Text>
              </View>
              <View style={styles.progressBarTrack}>
                <View
                  style={[styles.progressBarFill, { width: `${progressPercent}%` }]}
                />
              </View>
            </View>

            {/* Task Checklist */}
            <View style={styles.taskList}>
              {tasks.map((task) => (
                <TouchableOpacity
                  key={task.id}
                  style={[
                    styles.taskItem,
                    task.done && styles.taskItemDone,
                    Platform.OS === 'web' && { cursor: 'pointer' },
                  ]}
                  onPress={() => handleToggleTask(task.id)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[styles.checkbox, task.done && styles.checkboxDone]}
                  >
                    {task.done && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text
                    style={[
                      styles.taskTitle,
                      task.done && styles.taskTitleDone,
                    ]}
                  >
                    {task.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* TAB 3: PROFILE */}
        {activeTab === 'profile' && (
          <View style={styles.tabContent}>
            <View style={styles.accountBox}>
              <Text style={styles.sectionTitle}>Intern Profile</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Name</Text>
                <Text style={styles.detailValue}>{user?.name || 'Intern User'}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Email</Text>
                <Text style={styles.detailValue}>{user?.email || 'intern@hbplus.com'}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Domain</Text>
                <Text style={styles.detailValue}>{user?.domain || 'hbplus.com'}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Role</Text>
                <Text style={styles.detailValue}>Mobile & Web Engineering Intern</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Mentor</Text>
                <Text style={styles.detailValue}>Lead Mobile Architect</Text>
              </View>
            </View>

            {/* Sign Out Action */}
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={logout}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel="Sign Out"
            >
              <Text style={styles.logoutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Text style={styles.footerText}>
        HB+ Platform • Unified Mobile & Web
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.softPeach,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  containerDesktop: {
    paddingVertical: 36,
  },
  card: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: Colors.pureWhite,
    borderRadius: 22,
    paddingVertical: 24,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: Colors.charcoal,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  brandTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.charcoal,
    letterSpacing: -0.5,
  },
  brandPlus: {
    color: Colors.warmCoral,
  },
  welcomeText: {
    fontSize: 14,
    color: Colors.mediumGray,
    marginTop: 3,
    fontWeight: '500',
  },
  userName: {
    color: Colors.charcoal,
    fontWeight: '700',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.offWhite,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: Colors.pureWhite,
    elevation: 2,
    shadowColor: Colors.charcoal,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tabButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.mediumGray,
  },
  tabButtonTextActive: {
    color: Colors.charcoal,
    fontWeight: '700',
  },
  tabContent: {
    width: '100%',
  },
  widgetCard: {
    backgroundColor: Colors.offWhite,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  widgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  widgetTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.charcoal,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  workModeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  workModeLabel: {
    fontSize: 12,
    color: Colors.mediumGray,
    fontWeight: '600',
  },
  modePill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 14,
    backgroundColor: Colors.pureWhite,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  modePillActive: {
    borderColor: Colors.warmCoral,
    backgroundColor: '#FFF0ED',
  },
  modePillText: {
    fontSize: 12,
    color: Colors.charcoal,
    fontWeight: '500',
  },
  modePillTextActive: {
    color: Colors.warmCoral,
    fontWeight: '700',
  },
  attendanceButton: {
    backgroundColor: Colors.warmCoral,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: Colors.warmCoral,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  attendanceButtonActive: {
    backgroundColor: Colors.charcoal,
  },
  attendanceButtonText: {
    color: Colors.pureWhite,
    fontWeight: '700',
    fontSize: 14,
  },
  standupInput: {
    backgroundColor: Colors.pureWhite,
    borderRadius: 10,
    padding: 10,
    fontSize: 13,
    color: Colors.charcoal,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minHeight: 64,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: Colors.pureWhite,
    borderWidth: 1.5,
    borderColor: Colors.warmCoral,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: Colors.warmCoral,
    fontWeight: '700',
    fontSize: 13,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.charcoal,
  },
  progressValue: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.warmCoral,
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.warmCoral,
    borderRadius: 4,
  },
  taskList: {
    gap: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.offWhite,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  taskItemDone: {
    opacity: 0.7,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: Colors.mediumGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: Colors.pureWhite,
  },
  checkboxDone: {
    backgroundColor: Colors.warmCoral,
    borderColor: Colors.warmCoral,
  },
  checkmark: {
    color: Colors.pureWhite,
    fontSize: 12,
    fontWeight: '900',
  },
  taskTitle: {
    fontSize: 13,
    color: Colors.charcoal,
    fontWeight: '600',
    flex: 1,
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: Colors.mediumGray,
  },
  accountBox: {
    backgroundColor: Colors.offWhite,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.charcoal,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  detailLabel: {
    fontSize: 13,
    color: Colors.mediumGray,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 13,
    color: Colors.charcoal,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: Colors.warmCoral,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: Colors.warmCoral,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    ...(Platform.OS === 'web' ? { cursor: 'pointer', userSelect: 'none' } : {}),
  },
  logoutText: {
    color: Colors.pureWhite,
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  footerText: {
    marginTop: 14,
    fontSize: 11,
    color: Colors.mediumGray,
    textAlign: 'center',
  },
});
