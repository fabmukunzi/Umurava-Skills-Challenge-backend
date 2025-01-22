const roles: Record<string, { can: string[] }> = {
  admin: { can: ["create", "edit", "delete", "view"] },
  developer: { can: ["view", "edit"] },
  ui_ux: { can: ["view", "edit"] },
  content_creator: { can: ["view", "edit"] },
};

export default roles;
