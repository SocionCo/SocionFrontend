export function convertInfluencersToDropdownObjects(influencers) {
    const formattedResponse = influencers.map(influencer => {
        return {
            label: `${influencer.firstName} ${influencer.lastName}`, email: `${influencer.email}`
        };
    });
    return formattedResponse;
}


export function timeAgo(isoTime) {
  if (!isoTime) {return ""}
    const currentTime = new Date();
    const pastTime = new Date(isoTime);
  
    // Calculate the time difference in milliseconds
    const timeDifference = currentTime - pastTime;
  
    // Time difference in seconds
    const seconds = Math.floor(timeDifference / 1000);
  
    // Time difference in minutes
    const minutes = Math.floor(seconds / 60);
  
    // Time difference in hours
    const hours = Math.floor(minutes / 60);
  
    // Time difference in days
    const days = Math.floor(hours / 24);
  
    // Time difference in weeks
    const weeks = Math.floor(days / 7);
  
    // Time difference in years
    const years = Math.floor(days / 365);
  
    if (years > 0) {
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
    
    if (weeks > 0) {
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    }
  
    if (days > 0) {
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
  
    if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
  
    if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
  
    return 'Just now';
  }
  

  export function formatDuration(seconds) {
    if (seconds < 0) {
      return 'Invalid duration';
    }
  
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.round(seconds % 60);
  
    const formattedDuration = [];
  
    if (hours > 0) {
      formattedDuration.push(`${hours}h`);
    }
  
    if (minutes > 0) {
      formattedDuration.push(`${minutes}m`);
    }
  
    if (remainingSeconds > 0) {
      formattedDuration.push(`${remainingSeconds}s`);
    }
  
    return formattedDuration.join(' ');
  }
