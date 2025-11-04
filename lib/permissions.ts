import { getTierLevel } from "./hierarchy";

export type Permission = 
  | "view_admin"
  | "manage_members"
  | "remove_members"
  | "approve_applications"
  | "reject_applications"
  | "edit_members"
  | "manage_contracts"
  | "create_contracts"
  | "delete_contracts"
  | "edit_contracts"
  | "manage_reputation"
  | "modify_reputation"
  | "view_all_stats"
  | "manage_roles";

interface RolePermissions {
  [role: string]: Permission[];
}

// Permissions par rôle (strict)
const ROLE_PERMISSIONS: RolePermissions = {
  Admin: [
    "view_admin",
    "manage_members",
    "remove_members",
    "approve_applications",
    "reject_applications",
    "edit_members",
    "manage_contracts",
    "create_contracts",
    "delete_contracts",
    "edit_contracts",
    "manage_reputation",
    "modify_reputation",
    "view_all_stats",
    "manage_roles",
  ],
  Pakhan: [
    "view_admin",
    "manage_members",
    "remove_members", // Peut virer tout le monde sauf Admin
    "approve_applications",
    "reject_applications",
    "edit_members",
    "manage_contracts",
    "create_contracts",
    "delete_contracts",
    "edit_contracts",
    "manage_reputation",
    "modify_reputation",
    "view_all_stats",
    "manage_roles",
  ],
  Pervyi: [
    "view_admin",
    "manage_members",
    "remove_members", // Peut virer les membres level < 6
    "approve_applications",
    "reject_applications",
    "edit_members", // Peut modifier les membres level < 6
    "manage_contracts",
    "create_contracts",
    "delete_contracts",
    "edit_contracts",
    "manage_reputation",
    "modify_reputation",
    "view_all_stats",
  ],
  Sovetnik: [
    "view_admin",
    "manage_members",
    "remove_members", // Peut virer les membres level < 5
    "approve_applications",
    "reject_applications",
    "edit_members", // Peut modifier les membres level < 5
    "manage_contracts",
    "create_contracts",
    "edit_contracts",
    "manage_reputation",
    "modify_reputation",
    "view_all_stats",
  ],
  Vor: [
    "view_admin",
    "manage_members",
    "remove_members", // Peut virer les membres level < 4
    "approve_applications",
    "edit_members", // Peut modifier les membres level < 4
    "manage_contracts",
    "create_contracts",
    "edit_contracts",
    "manage_reputation",
    "modify_reputation",
  ],
  Avtoritet: [
    "view_admin",
    "manage_members",
    "remove_members", // Peut virer les membres level < 3
    "approve_applications",
    "edit_members", // Peut modifier les membres level < 3
    "manage_contracts",
    "create_contracts",
    "edit_contracts",
  ],
  Soldat: [
    "view_admin",
    "manage_members",
    "remove_members", // Peut virer les membres level < 2
    "edit_members", // Peut modifier les membres level < 2
  ],
  Bratan: [],
};

/**
 * Vérifie si un utilisateur a une permission spécifique
 */
export function hasPermission(userRole: string, permission: Permission): boolean {
  // Admin a toujours toutes les permissions
  if (userRole === "Admin") {
    return true;
  }

  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.includes(permission);
}

/**
 * Vérifie si un utilisateur peut modifier un autre utilisateur (basé sur la hiérarchie)
 */
export function canModifyUser(userRole: string, targetUserRole: string): boolean {
  // Admin peut modifier tout le monde (y compris un autre Admin)
  if (userRole === "Admin") {
    return true;
  }

  // Personne ne peut modifier un Admin sauf un autre Admin
  if (targetUserRole === "Admin") {
    return false;
  }

  // Un utilisateur ne peut pas se modifier lui-même pour changer de rôle
  // (mais on vérifie uniquement le niveau ici)

  const userLevel = getTierLevel(userRole);
  const targetLevel = getTierLevel(targetUserRole);

  // Un utilisateur peut modifier uniquement les membres de niveau inférieur
  return userLevel > targetLevel;
}

/**
 * Vérifie si un utilisateur peut supprimer un autre utilisateur (basé sur la hiérarchie)
 */
export function canRemoveUser(userRole: string, targetUserRole: string): boolean {
  // Admin peut supprimer tout le monde (y compris un autre Admin)
  if (userRole === "Admin") {
    return true;
  }

  // Personne ne peut supprimer un Admin sauf un autre Admin
  if (targetUserRole === "Admin") {
    return false;
  }

  // Personne ne peut supprimer le Pakhan sauf Admin
  if (targetUserRole === "Pakhan" && userRole !== "Admin") {
    return false;
  }

  const userLevel = getTierLevel(userRole);
  const targetLevel = getTierLevel(targetUserRole);

  // Un utilisateur peut supprimer uniquement les membres de niveau inférieur
  return userLevel > targetLevel;
}

/**
 * Vérifie si un utilisateur peut modifier le rôle d'un autre utilisateur
 */
export function canManageRole(userRole: string, targetUserRole: string, newRole: string): boolean {
  // Seul Admin peut gérer les rôles
  if (userRole !== "Admin") {
    return false;
  }

  // Admin peut modifier le rôle de tout le monde (y compris un autre Admin)
  return true;
}

/**
 * Retourne toutes les permissions d'un rôle
 */
export function getRolePermissions(role: string): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}

/**
 * Vérifie si un utilisateur peut accéder à la page admin
 */
export function canAccessAdmin(userRole: string): boolean {
  return hasPermission(userRole, "view_admin");
}

