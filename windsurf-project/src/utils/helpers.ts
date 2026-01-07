import { useCallback } from 'react';

// Memoized filter functions for better performance
export const useProfileFilters = () => {
  const parseDistance = useCallback((location: string): number => {
    const distance = parseInt(location.split(' ')[0]);
    return isNaN(distance) ? 0 : distance;
  }, []);

  const filterByAge = useCallback((profile: any, ageRange: [number, number]): boolean => {
    const profileAge = profile.age;
    return profileAge >= ageRange[0] && profileAge <= ageRange[1];
  }, []);

  const filterByDistance = useCallback((profile: any, maxDistance: number): boolean => {
    const distance = parseInt(profile.location.split(' ')[0]);
    return distance <= maxDistance;
  }, []);

  const filterByGender = useCallback((profile: any, interestedIn: string[]): boolean => {
    if (!interestedIn || interestedIn.length === 0) return true;
    return interestedIn.includes(profile.gender);
  }, []);

  return {
    parseDistance,
    filterByAge,
    filterByDistance,
    filterByGender,
  };
};

// Optimized profile filtering logic
export const filterProfiles = useCallback((
  profiles: any[],
  ageRange: [number, number],
  maxDistance: number,
  interestedIn: string[]
) => {
  return profiles.filter(profile => {
    // Age filter
    if (profile.age < ageRange[0] || profile.age > ageRange[1]) {
      return false;
    }

    // Distance filter
    const distance = parseInt(profile.location.split(' ')[0]);
    if (distance > maxDistance) {
      return false;
    }

    // Gender preference filter
    if (interestedIn && interestedIn.length > 0) {
      if (!interestedIn.includes(profile.gender)) {
        return false;
      }
    }

    return true;
  });
}, []);
