import {
  CLEAR_MEASUREMENTS,
  FETCH_TRIP,
  FETCH_TRIPLIST,
  SAVE_MEASUREMENTS
} from './types';

//using the ES Intl.DateTimeFormat object
var date1 = new Date(Date.UTC(2016, 4, 11, 3, 0, 0));
var date2 = new Date(Date.UTC(2017, 9, 8, 3, 0, 0));
var date3 = new Date(Date.UTC(2020, 1, 15, 3, 0, 0));

const trips = [
  {
    tripName: "Paris",
    tripDate: date1,
    tripActivities: [
      {
        activityName: "Flight to Paris",
        activityType: "flight",
        startTime: "9:00 a.m.",
        endTime: "1:00 p.m.",
        info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      },
      {
        activityName: "Pick up Rental Car",
        activityType: "car",
        startTime: "2:00 p.m.",
        info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        activityName: "Visit the Louvre",
        activityType: "sightseeing",
        startTime: "4:00 p.m.",
        endTime: "7:00 p.m.",
        info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop.",
      },
      {
        activityName: "Return Flight",
        activityType: "flight",
        startTime: "11:00 p.m.",
        endTime: "11:59 p.m.",
        info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      },
    ]
  },
  {
    tripName: "Israel",
    tripDate: date2,
  },
  {
    tripName: "Thailand",
    tripDate: date3,
  }
];

export function fetchTrip(key) {
  const trip = trips[key];
  return {
    type: FETCH_TRIP,
    payload: trip,
  };
}

export function fetchTripList() {
  const allTrips = trips;
  return {
    type: FETCH_TRIPLIST,
    payload: allTrips,
  };
}

export function clearMeasurements() {
  return {
    type: CLEAR_MEASUREMENTS,
    payload: [],
  }
}

export function saveMeasurements(top, index) {
  const measurement = {
    index,
    top,
  };

  return {
    type: SAVE_MEASUREMENTS,
    payload: measurement,
  }
}
