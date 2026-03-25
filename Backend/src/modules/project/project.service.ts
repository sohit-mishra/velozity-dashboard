import {
  createProjectRepo,
  getProjectByIdRepo,
  getProjectsRepo,
  updateProjectRepo,
  deleteProjectRepo,
} from "./project.repository.js";

export const createProject = async (data: any, user: any) => {
  return createProjectRepo({
    ...data,
    createdById: user.id,
  });
};

export const getProjects = async (user: any) => {
  if (user.role === "ADMIN") {
    return getProjectsRepo({});
  }

  if (user.role === "PROJECT_MANAGER") {
    return getProjectsRepo({
      createdById: user.id,
    });
  }

  return getProjectsRepo({
    tasks: {
      some: {
        assignedToId: user.id,
      },
    },
  });
};


export const getProjectById = async (id: string, user: any) => {
  const project = await getProjectByIdRepo(id);

  if (!project) throw new Error("Project not found");

  if (
    user.role !== "ADMIN" &&
    project.createdById !== user.id
  ) {
    throw new Error("Unauthorized access to project");
  }

  return project;
};

export const updateProject = async (
  id: string,
  data: any,
  user: any
) => {
  const project = await getProjectByIdRepo(id);

  if (!project) throw new Error("Project not found");

  if (
    user.role !== "ADMIN" &&
    project.createdById !== user.id
  ) {
    throw new Error("Forbidden");
  }

  return updateProjectRepo(id, data);
};

export const deleteProject = async (id: string, user: any) => {
  const project = await getProjectByIdRepo(id);

  if (!project) throw new Error("Project not found");

  if (
    user.role !== "ADMIN" &&
    project.createdById !== user.id
  ) {
    throw new Error("Forbidden");
  }

  return deleteProjectRepo(id);
};