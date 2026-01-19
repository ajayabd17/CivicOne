# **App Name**: CivicOne

## Core Features:

- Landing Page: Collects citizen's issue description and ensures jurisdiction (state) is selected before routing to the appropriate government portal. Provides inline validation for the state selector.
- State Selector: A required dropdown for users to select their state. This selection is crucial for accurate routing.
- Issue Input: An optional multiline textarea for users to describe their civic issue.
- Portal Resolution: Connects to the backend `/resolve` endpoint with the issue text and selected state to fetch the appropriate government portal.
- Result Display: Presents the name, URL, instructions, and reasoning from the backend response. Opens the government portal in a new tab.
- Loading State: Displays a loading message ('Finding the right government portal…') while waiting for the backend response.
- Error Handling: Displays appropriate error messages when the backend returns a 404 ('No official portal found for this state yet.') or 500 ('Temporary issue. Please try again.') status code.

## Style Guidelines:

- Primary color: A desaturated blue (#5A7D9A) for a neutral, civic feel.
- Background color: Light gray (#F5F5F5) to ensure a light and readable interface.
- Accent color: A muted green (#8FBC8F) to highlight key actions without being overly assertive.
- Body and headline font: 'Inter' sans-serif font for clear and accessible text.
- Mobile-first, responsive layout with generous whitespace to improve readability and focus.
- Minimal use of icons, primarily for indicating external links (opening in a new tab).
- Subtle hover and focus states to provide feedback on interactive elements.