import { NasaNeo, NasaNeoFeed, NearEarthObject, NearEarthObjectFeed } from './types';

const toNearEarthObject = (neo: NasaNeo): NearEarthObject => {
  const approach = neo.close_approach_data[0];
  return {
    id: neo.id,
    name: neo.name,
    isPotentiallyHazardousAsteroid: neo.is_potentially_hazardous_asteroid,
    estimatedDiameterMinKm: neo.estimated_diameter.kilometers.estimated_diameter_min,
    estimatedDiameterMaxKm: neo.estimated_diameter.kilometers.estimated_diameter_max,
    closeApproachDate: approach?.close_approach_date ?? null,
    relativeVelocityKph: approach?.relative_velocity.kilometers_per_hour ?? null,
    missDistanceKm: approach?.miss_distance.kilometers ?? null,
  };
};

export const toNearEarthObjectFeed = (feed: NasaNeoFeed): NearEarthObjectFeed => {
  const byDate = feed.near_earth_objects ?? {};
  const objects = Object.keys(byDate)
    .sort()
    .flatMap(date => byDate[date])
    .map(toNearEarthObject);

  return {
    elementCount: feed.element_count ?? objects.length,
    objects,
  };
};