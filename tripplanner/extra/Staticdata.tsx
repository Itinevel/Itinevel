export const days = [
  {
    id: 1,
    name: "Day 1",
    locations: [
      {
        details: {
          value: "Location A",
          arrivalTime: "08:00 AM",
          departureTime: "10:00 AM",
          items: [{ name: "Item 1", price: 10 }],
          coordinates: { lat: 40.7128, lng: -74.0060 }
        },
        notes: [
          { text: "Make sure to visit early to avoid crowds", theme: "don't forget" },
          { text: "Beware of pickpockets in the area", theme: "warning" }
        ]
      },
      {
        details: {
          value: "Location B",
          arrivalTime: "11:00 AM",
          departureTime: "01:00 PM",
          items: [{ name: "Item 2", price: 20 }],
          coordinates: { lat: 34.0522, lng: -118.2437 }
        },
        notes: [
          { text: "Great spot for a quick lunch", theme: "profit" },
          { text: "Avoid this place during rush hour", theme: "to avoid" }
        ]
      }
    ],
    transports: [
      {
        id: 1,
        details: [
          { type: "Bus", name: "Bus 101", destination: "Location B", price: 5 }
        ],
        notes: [
          { text: "Take the express bus for a faster route", theme: "don't forget" },
          { text: "Bus can get crowded, plan accordingly", theme: "warning" }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Day 2",
    locations: [
      {
        details: {
          value: "Location C",
          arrivalTime: "09:00 AM",
          departureTime: "11:00 AM",
          items: [{ name: "Item 3", price: 15 }],
          coordinates: { lat: 51.5074, lng: -0.1278 }
        },
        notes: [
          { text: "Don’t forget to bring your camera", theme: "don't forget" },
          { text: "A bit pricey, but worth it for the views", theme: "profit" }
        ]
      },
      {
        details: {
          value: "Location D",
          arrivalTime: "12:00 PM",
          departureTime: "02:00 PM",
          items: [{ name: "Item 4", price: 30 }],
          coordinates: { lat: 48.8566, lng: 2.3522 }
        },
        notes: [
          { text: "Beware of tourist traps", theme: "to avoid" },
          { text: "Check out the local markets nearby", theme: "profit" }
        ]
      }
    ],
    transports: [
      {
        id: 2,
        details: [
          { type: "Train", name: "Train A", destination: "Location C", price: 15 }
        ],
        notes: [
          { text: "Reserve seats in advance", theme: "don't forget" },
          { text: "Avoid rush hour if possible", theme: "to avoid" }
        ]
      },
      {
        id: 3,
        details: [
          { type: "Walk", name: "Walk to Park", destination: "Location D", price: 0 }
        ],
        notes: [
          { text: "Wear comfortable shoes", theme: "don't forget" },
          { text: "Scenic route with plenty of photo ops", theme: "profit" }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Day 3",
    locations: [
      {
        details: {
          value: "Location E",
          arrivalTime: "08:00 AM",
          departureTime: "10:00 AM",
          items: [{ name: "Item 5", price: 50 }],
          coordinates: { lat: 35.6895, lng: 139.6917 }
        },
        notes: [
          { text: "Bring cash as credit cards are not widely accepted", theme: "don't forget" },
          { text: "A hidden gem, worth the visit!", theme: "profit" }
        ]
      },
      {
        details: {
          value: "Location F",
          arrivalTime: "11:00 AM",
          departureTime: "01:00 PM",
          items: [{ name: "Item 6", price: 25 }],
          coordinates: { lat: 35.6762, lng: 139.6503 }
        },
        notes: [
          { text: "Be cautious of street vendors", theme: "warning" },
          { text: "Avoid during midday due to high temperatures", theme: "to avoid" }
        ]
      }
    ],
    transports: [
      {
        id: 4,
        details: [
          { type: "Taxi", name: "Taxi 202", destination: "Location E", price: 20 }
        ],
        notes: [
          { text: "Make sure to have small bills", theme: "don't forget" },
          { text: "Can be expensive during peak hours", theme: "warning" }
        ]
      },
      {
        id: 5,
        details: [
          { type: "Bicycle", name: "Bike to Location F", destination: "Location F", price: 10 }
        ],
        notes: [
          { text: "Great exercise and scenic route", theme: "profit" },
          { text: "Bring water and stay hydrated", theme: "don't forget" }
        ]
      }
    ]
  }
];
