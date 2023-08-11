export function convertInfluencersToDropdownObjects(influencers) {
    const formattedResponse = influencers.map(influencer => {
        return {
            label: `${influencer.firstName} ${influencer.lastName}`, email: `${influencer.email}`
        };
    });
    return formattedResponse;
}