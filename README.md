# RescueSmart: Instant Emergency Communication

_Developed by Chamindu Vidyarathne from Team Beatle For TADHACK Sri Lanka 2024 Hackathon. Mangaged to win the SPECIAL AWARD._

RescueSmart is a cutting-edge platform that revolutionizes emergency communication, ensuring that vital information reaches people quickly and effectively during crises. By leveraging Telco APIs and Generative AI, RescueSmart provides real-time, personalized alerts and guidance to help individuals and communities stay safe and informed.

## Table of Contents

- [Problem](#problem)
- [Solution](#solution)
- [Key Features](#key-features)
- [How It Works](#how-it-works)
- [Impact](#impact)
- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Problem

Traditional communication methods often fail during emergencies, leading to:

- **Slow Dissemination**: Delayed distribution of critical alerts.
- **Unclear Information**: Generic, confusing messages during high-stress situations.
- **Accessibility Barriers**: Vulnerable populations may be left out, worsening the impact of emergencies.

## Solution

RescueSmart solves these issues by:

- Delivering **instant, personalized notifications**.
- Providing **AI-powered guidance** tailored to individual needs.
- Ensuring **inclusive reach** with multilingual support and accessible interfaces.
- **Seamlessly integrating** with existing emergency response systems.

## Key Features

- **Rapid Alerts**: Instant, location-specific notifications during crises.
- **Tailored Guidance**: Step-by-step instructions based on the user's situation.
- **Inclusive Reach**: Multilingual and accessible for diverse communities.
- **Real-Time Responsiveness**: Dynamic updates as situations evolve.
- **Seamless Integration**: Connects with existing emergency services for improved coordination.

## How It Works

1. **Detect Crisis**: Advanced sensors and data analysis detect and validate emergency situations in real-time.
2. **Locate Users**: Utilizes telco location data to identify affected individuals and their proximity to the crisis.
3. **Deliver Alerts**: Sends personalized notifications and guidance directly to users' devices.

## Impact

- **Lives Saved**: Faster response and tailored guidance during emergencies.
- **Community Resilience**: Keeps people informed and coordinated, helping communities recover.
- **Reduced Panic**: Clear, timely communication minimizes confusion and anxiety.
- **Improved Response**: Enhances coordination and effectiveness of existing emergency systems.

## Getting Started

### Prerequisites

- Node.js
- Telco API access
- Google Gemini API key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/CD-Vidyarathne/RescueSmart.git
   ```

2. Navigate to the project directory:

   ```bash
   cd RescueSmart
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Usage

1. Set up your environment variables for API keys:

   ```bash
    PORT = "YOUR PORT"
    GOOGLE_API_KEY = "YOUR GOOGLE_API_KEY"
    SMS_APP_ID = "YOUR SMS_APP_ID"
    SMS_APP_PASSWORD = "YOUR SMS_APP_PASSWORD"
   ```

2. Run the application:

   ```bash
   npm start
   ```

## Technologies Used

- **Telco APIs**: For real-time user location and communication.
- **Generative AI**: Provides dynamic, personalized guidance.
- **Node.js**: Backend service.
- **Express**: Web framework for server management.
- **React**: Frontend interface (if applicable).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
