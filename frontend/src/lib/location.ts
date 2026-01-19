import { indianStates } from './states';

/**
 * Attempts to detect a state name from the issue text
 * Returns the state name if found, otherwise returns empty string
 */
export function detectStateFromIssue(issueText: string): string {
  const normalizedText = issueText.toLowerCase();

  // Check for each state name (case-insensitive)
  for (const state of indianStates) {
    const normalizedState = state.toLowerCase();
    
    // Match whole word boundaries to avoid partial matches
    const regex = new RegExp(`\\b${normalizedState}\\b`, 'i');
    if (regex.test(normalizedText)) {
      return state;
    }
  }

  // Check for major city names and map to states
  const cityStateMap: Record<string, string> = {
    'mumbai': 'Maharashtra',
    'pune': 'Maharashtra',
    'nagpur': 'Maharashtra',
    'delhi': 'Delhi',
    'bengaluru': 'Karnataka',
    'bangalore': 'Karnataka',
    'chennai': 'Tamil Nadu',
    'kolkata': 'West Bengal',
    'calcutta': 'West Bengal',
    'hyderabad': 'Telangana',
    'ahmedabad': 'Gujarat',
    'surat': 'Gujarat',
    'jaipur': 'Rajasthan',
    'lucknow': 'Uttar Pradesh',
    'kanpur': 'Uttar Pradesh',
    'bhopal': 'Madhya Pradesh',
    'indore': 'Madhya Pradesh',
    'patna': 'Bihar',
    'chandigarh': 'Chandigarh',
    'thiruvananthapuram': 'Kerala',
    'kochi': 'Kerala',
    'guwahati': 'Assam',
    'bhubaneswar': 'Odisha',
    'raipur': 'Chhattisgarh',
    'ranchi': 'Jharkhand',
    'goa': 'Goa',
    'panaji': 'Goa',
  };

  for (const [city, state] of Object.entries(cityStateMap)) {
    const regex = new RegExp(`\\b${city}\\b`, 'i');
    if (regex.test(normalizedText)) {
      return state;
    }
  }

  return '';
}
