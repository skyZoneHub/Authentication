// src/types/TeamTypes.ts

// Type for the request params, specifically the 'id' of the team member
export type TeamRequestParams = {
  id: string;
};

// Type for the team member data (used in POST and PUT requests)
export type TeamMemberData = {
  name: string;
  email: string;
  role: string;
  addedBy: number;  // Optional field to track who added the member
};
