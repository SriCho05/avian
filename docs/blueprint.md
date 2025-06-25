# **App Name**: Avian Pilot Portal

## Core Features:

- Landing Page: Introductory page with registration call to action.
- Registration Form: Capture pilot details, license info, equipment, and availability.
- Personal Details: Collect user's full name, phone number (with OTP verification), email, password, and location.
- Pilot Details: Gather pilot license number, certification (upload to Firebase Storage), years of experience, areas of expertise, and languages spoken.
- Drone Equipment: Collect information on drone type, model & specs, payload capabilities, and drone insurance details.
- Availability: Determine pilot's service radius, willingness to travel, and availability on weekdays/weekends/custom schedules.
- Confirmation Screen: Confirmation page to let users know that their profiles are under review.
- Firebase Authentication: Secure user signup and authentication using Firebase Authentication.
- Firestore Data Storage: Store pilot profile data, including personal details, pilot details, drone equipment information, and availability, in Firebase Firestore.
- Firebase Storage Integration: Handle document uploads, such as pilot certifications, drone insurance, and government IDs, to Firebase Storage.
- OTP Verification: Implement OTP verification for mobile number using Firebase Authentication.
- Automated Notifications: Trigger automated email and SMS notifications upon successful registration using Firebase Cloud Functions (optional).

## Style Guidelines:

- Primary color: Soft sky blue (#87CEEB) to evoke trust and safety in the aerial environment.
- Background color: Very light blue (#F0F8FF), almost white, for a clean and airy feel.
- Accent color: Muted green (#90EE90) to highlight call to actions and important information.
- Body and headline font: 'Inter', a grotesque-style sans-serif, for a modern, clean, professional look.
- Use clean, line-based icons related to drones, aviation, and location.
- Mobile-first, clean design with a focus on readability and ease of navigation.
- Subtle animations for form transitions and loading states to improve user experience.