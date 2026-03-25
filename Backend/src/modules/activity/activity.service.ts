import { getActivitiesRepo } from "./activity.repository.js";

export const getActivities = async (user: any, projectId?: string) => {
  if (user.role === "ADMIN") {
    return getActivitiesRepo({
      ...(projectId && { projectId }),
    });
  }
 
  if (user.role === "PROJECT_MANAGER") {
    return getActivitiesRepo({
      ...(projectId && { projectId }),
      project: {
        createdById: user.id,
      },
    });
  }

  return getActivitiesRepo({
    ...(projectId && { projectId }),
    task: {
      assignedToId: user.id,
    },
  });
};