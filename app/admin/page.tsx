"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlareCard } from "@/components/GlareCard";
import { Users, Plus, Trash2, Edit, FileText, BarChart3, Settings, X, CheckCircle, XCircle, Clock, Eye, UserX } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getAllUsers, updateUser, addUser, deleteUser } from "@/lib/auth";
import { getContracts, addContract, deleteContract, updateContract } from "@/lib/data";
import { User, Contract } from "@/lib/types";
import { RoleBadge } from "@/components/RoleBadge";
import { NewApplicationNotification } from "@/components/NewApplicationNotification";
import { canAccessAdmin, canRemoveUser, canModifyUser, canManageRole, hasPermission } from "@/lib/permissions";
import { useConfirm } from "@/hooks/useConfirm";
import { useAlert } from "@/hooks/useAlert";
import { useDataSync } from "@/hooks/useDataSync";

export default function AdminPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const { confirm, ConfirmComponent: ConfirmComp } = useConfirm();
  const { alert, AlertComponent: AlertComp } = useAlert();
  const [members, setMembers] = useState<User[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMissions: 0,
    totalRevenue: 0,
    reputationPoints: 0,
  });
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddMission, setShowAddMission] = useState(false);
  const [editingMember, setEditingMember] = useState<User | null>(null);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);
  const [newMember, setNewMember] = useState({ username: "", password: "", role: "Bratan", reputation: 0, money: 0 });
  const [newMission, setNewMission] = useState({ type: "Vol", title: "", description: "", location: "", deadline: "", rewardMoney: 0, rewardRep: 0 });
  const [selectedUserForReputation, setSelectedUserForReputation] = useState<User | null>(null);
  const [reputationChange, setReputationChange] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [lastPendingCount, setLastPendingCount] = useState(0);

  const refreshData = async () => {
    // Toujours lire depuis MongoDB pour avoir les données les plus récentes
    try {
      const allUsers = await getAllUsers();
      const allContracts = await getContracts();
      
      setMembers(allUsers);
      setContracts(allContracts);
      
      const activeMissions = allContracts.filter((c) => c.status === "in_progress").length;
      const totalRevenue = allUsers.reduce((sum, u) => sum + (u.money || 0), 0);
      const totalRep = allUsers.reduce((sum, u) => sum + (u.reputation || 0), 0);
      
      setStats({
        totalMembers: allUsers.length,
        activeMissions,
        totalRevenue,
        reputationPoints: totalRep,
      });
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  const handleApproveApplication = async (userId: string) => {
    if (!user) return;

    if (!hasPermission(user.role, "approve_applications")) {
      alert({
        title: "Permission refusée",
        message: "Vous n'avez pas la permission d'approuver les candidatures.",
        type: "danger",
      });
      return;
    }

    confirm({
      title: "Approuver la candidature",
      message: "Approuver cette candidature ? L'utilisateur aura accès complet à la famille.",
      type: "warning",
      confirmText: "Approuver",
      cancelText: "Annuler",
    }, async () => {
      try {
        const userToApprove = members.find(u => u.id === userId);
        if (userToApprove) {
          await updateUser(userId, {
            status: 'approved',
            money: 10000, // Donner l'argent de départ
            reputation: 0,
          });
          // Rafraîchir immédiatement
          refreshData();
          alert({
            title: "Succès",
            message: "Candidature approuvée avec succès",
            type: "success",
          });
          
          // Marquer que l'utilisateur doit voir le guide de bienvenue
          const allUsers = await getAllUsers();
          const approvedUser = allUsers.find(u => u.id === userId);
          if (approvedUser) {
            // Marquer pour afficher le guide au prochain chargement
            localStorage.setItem(`fc_show_welcome_${userId}`, 'true');
            // Réinitialiser le flag "a vu le guide" pour forcer l'affichage
            localStorage.removeItem(`fc_welcome_${userId}`);
          }
        }
      } catch (error) {
        alert({
          title: "Erreur",
          message: "Erreur lors de l'approbation",
          type: "danger",
        });
        console.error(error);
      }
    });
  };

  const handleRejectApplication = async (userId: string) => {
    if (!user) return;

    if (!hasPermission(user.role, "reject_applications")) {
      alert({
        title: "Permission refusée",
        message: "Vous n'avez pas la permission de refuser les candidatures.",
        type: "danger",
      });
      return;
    }

    confirm({
      title: "Refuser la candidature",
      message: "Refuser cette candidature ? L'utilisateur sera rejeté.",
      type: "danger",
      confirmText: "Refuser",
      cancelText: "Annuler",
    }, async () => {
      try {
        await updateUser(userId, {
          status: 'rejected',
        });
        // Rafraîchir immédiatement
        refreshData();
        alert({
          title: "Candidature refusée",
          message: "La candidature a été refusée.",
          type: "info",
        });
      } catch (error) {
        alert({
          title: "Erreur",
          message: "Erreur lors du refus",
          type: "danger",
        });
        console.error(error);
      }
    });
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      refreshData();
    }
  }, [isAuthenticated, user]);

  // Synchroniser les données automatiquement
  useDataSync(() => {
    if (isAuthenticated && user) {
      refreshData();
    }
  }, 2000); // Rafraîchir toutes les 2 secondes

  useEffect(() => {
    if (isAuthenticated && user) {
      const currentPending = members.filter(m => m.status === 'pending').length;
      setPendingCount(currentPending);
      
      // Afficher notification si nouvelle candidature
      if (lastPendingCount > 0 && currentPending > lastPendingCount) {
        setShowNotification(true);
        // Auto-fermer après 10 secondes
        setTimeout(() => setShowNotification(false), 10000);
      }
      
      setLastPendingCount(currentPending);
    }
  }, [members, isAuthenticated, user, lastPendingCount]);

  // Vérifier les nouvelles candidatures périodiquement
  useEffect(() => {
    if (isAuthenticated && user) {
      const interval = setInterval(async () => {
        const allUsers = await getAllUsers();
        const currentPending = allUsers.filter(m => m.status === 'pending').length;
        if (currentPending > pendingCount) {
          setPendingCount(currentPending);
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 10000);
        }
      }, 5000); // Vérifier toutes les 5 secondes

      return () => clearInterval(interval);
    }
  }, [isAuthenticated, user, pendingCount]);

  const handleAddMember = async () => {
    if (!newMember.username || !newMember.password) {
      alert({
        title: "Champs manquants",
        message: "Veuillez remplir tous les champs obligatoires",
        type: "warning",
      });
      return;
    }
    const existing = members.find(m => m.username === newMember.username);
    if (existing) {
      alert({
        title: "Nom d'utilisateur existant",
        message: "Ce nom d'utilisateur existe déjà",
        type: "warning",
      });
      return;
    }
    try {
      await addUser({
        ...newMember,
        role: newMember.role as "Bratan" | "Soldat" | "Avtoritet" | "Vor" | "Sovetnik" | "Pervyi" | "Pakhan" | "Admin",
        email: undefined,
      });
      setNewMember({ username: "", password: "", role: "Bratan", reputation: 0, money: 0 });
      setShowAddMember(false);
      setEditingMember(null);
      refreshData();
      alert({
        title: "Succès",
        message: "Membre ajouté avec succès",
        type: "success",
      });
    } catch (error) {
      alert({
        title: "Erreur",
        message: "Erreur lors de l'ajout du membre",
        type: "danger",
      });
      console.error(error);
    }
  };

  const handleDeleteMember = async (userId: string) => {
    if (!user) return;
    
    const memberToRemove = members.find(m => m.id === userId);
    if (!memberToRemove) return;

    // Vérifier les permissions strictes
    if (!canRemoveUser(user.role, memberToRemove.role)) {
      alert({
        title: "Permission refusée",
        message: `Vous n'avez pas la permission de retirer un membre avec le rôle "${memberToRemove.role}".`,
        type: "danger",
      });
      return;
    }

    confirm({
      title: "Retirer un membre",
      message: `Êtes-vous sûr de vouloir retirer ${memberToRemove.username} (${memberToRemove.role}) de la famille ? Cette action est irréversible.`,
      type: "danger",
      confirmText: "Retirer",
      cancelText: "Annuler",
    }, async () => {
      try {
        await deleteUser(userId);
        // Rafraîchir immédiatement
        refreshData();
        alert({
          title: "Membre retiré",
          message: "Le membre a été retiré de la famille.",
          type: "success",
        });
      } catch (error) {
        alert({
          title: "Erreur",
          message: "Erreur lors de la suppression",
          type: "danger",
        });
        console.error(error);
      }
    });
  };

  const handleEditMember = (member: User) => {
    if (!user) return;
    
    // Vérifier les permissions strictes
    if (!canModifyUser(user.role, member.role)) {
      alert({
        title: "Permission refusée",
        message: `Vous n'avez pas la permission de modifier un membre avec le rôle "${member.role}".`,
        type: "danger",
      });
      return;
    }

    setEditingMember(member);
    setNewMember({ 
      username: member.username, 
      password: "", 
      role: member.role, 
      reputation: member.reputation || 0, 
      money: member.money || 0 
    });
    setShowAddMember(true);
  };

  const handleUpdateMember = async () => {
    if (!editingMember || !user) return;

    // Vérifier les permissions pour modifier le rôle
    if (editingMember.role !== newMember.role) {
      if (!canManageRole(user.role, editingMember.role, newMember.role)) {
        alert({
          title: "Permission refusée",
          message: `Vous n'avez pas la permission de modifier le rôle de ce membre.`,
          type: "danger",
        });
        return;
      }
    }

    // Vérifier les permissions pour modifier le membre
    if (!canModifyUser(user.role, editingMember.role)) {
      alert({
        title: "Permission refusée",
        message: `Vous n'avez pas la permission de modifier ce membre.`,
        type: "danger",
      });
      return;
    }

    try {
      updateUser(editingMember.id, { 
        role: newMember.role as "Bratan" | "Soldat" | "Avtoritet" | "Vor" | "Sovetnik" | "Pervyi" | "Pakhan" | "Admin", 
        reputation: newMember.reputation, 
        money: newMember.money 
      });
      setEditingMember(null);
      setShowAddMember(false);
      setNewMember({ username: "", password: "", role: "Bratan", reputation: 0, money: 0 });
      // Rafraîchir immédiatement
      refreshData();
      alert({
        title: "Succès",
        message: "Membre mis à jour",
        type: "success",
      });
    } catch (error) {
      alert({
        title: "Erreur",
        message: "Erreur lors de la mise à jour",
        type: "danger",
      });
      console.error(error);
    }
  };

  const handleAddMission = async () => {
    if (!user) return;

    if (!newMission.title || !newMission.description || !newMission.location || !newMission.deadline) {
      alert({
        title: "Champs manquants",
        message: "Veuillez remplir tous les champs obligatoires",
        type: "warning",
      });
      return;
    }

    try {
      if (editingContract) {
        if (!hasPermission(user.role, "edit_contracts")) {
          alert({
            title: "Permission refusée",
            message: "Vous n'avez pas la permission de modifier les contrats.",
            type: "danger",
          });
          return;
        }
        await updateContract(editingContract.id, {
          type: newMission.type,
          title: newMission.title,
          description: newMission.description,
          location: newMission.location,
          deadline: newMission.deadline,
          reward: { money: newMission.rewardMoney, reputation: newMission.rewardRep },
        });
        alert({
          title: "Succès",
          message: "Contrat modifié avec succès",
          type: "success",
        });
      } else {
        if (!hasPermission(user.role, "create_contracts")) {
          alert({
            title: "Permission refusée",
            message: "Vous n'avez pas la permission de créer des contrats.",
            type: "danger",
          });
          return;
        }
        await addContract({
          type: newMission.type,
          title: newMission.title,
          description: newMission.description,
          location: newMission.location,
          deadline: newMission.deadline,
          reward: { money: newMission.rewardMoney, reputation: newMission.rewardRep },
          status: "available",
        });
        alert({
          title: "Succès",
          message: "Contrat créé avec succès",
          type: "success",
        });
      }
      setNewMission({ type: "Vol", title: "", description: "", location: "", deadline: "", rewardMoney: 0, rewardRep: 0 });
      setEditingContract(null);
      setShowAddMission(false);
      // Rafraîchir immédiatement
      refreshData();
    } catch (error) {
      alert({
        title: "Erreur",
        message: "Erreur lors de l'opération",
        type: "danger",
      });
      console.error(error);
    }
  };

  const handleEditMission = (mission: Contract) => {
    setEditingContract(mission);
    setNewMission({ 
      type: mission.type, 
      title: mission.title, 
      description: mission.description, 
      location: mission.location, 
      deadline: mission.deadline, 
      rewardMoney: mission.reward.money, 
      rewardRep: mission.reward.reputation 
    });
    setShowAddMission(true);
  };

  const handleDeleteMission = async (missionId: number | string) => {
    if (!user) return;

    if (!hasPermission(user.role, "delete_contracts")) {
      alert({
        title: "Permission refusée",
        message: "Vous n'avez pas la permission de supprimer les contrats.",
        type: "danger",
      });
      return;
    }

    confirm({
      title: "Supprimer la mission",
      message: "Êtes-vous sûr de vouloir supprimer cette mission ?",
      type: "danger",
      confirmText: "Supprimer",
      cancelText: "Annuler",
    }, async () => {
      try {
        await deleteContract(missionId);
        // Rafraîchir immédiatement
        refreshData();
        alert({
          title: "Mission supprimée",
          message: "La mission a été supprimée avec succès.",
          type: "success",
        });
      } catch (error) {
        alert({
          title: "Erreur",
          message: "Erreur lors de la suppression",
          type: "danger",
        });
        console.error(error);
      }
    });
  };

  const handleReputationChange = async () => {
    if (!selectedUserForReputation || !user) return;

    if (!hasPermission(user.role, "modify_reputation")) {
      alert({
        title: "Permission refusée",
        message: "Vous n'avez pas la permission de modifier la réputation.",
        type: "danger",
      });
      return;
    }

    // Vérifier qu'on peut modifier ce membre
    if (!canModifyUser(user.role, selectedUserForReputation.role)) {
      alert({
        title: "Permission refusée",
        message: `Vous n'avez pas la permission de modifier la réputation de ce membre.`,
        type: "danger",
      });
      return;
    }

    try {
      const newReputation = (selectedUserForReputation.reputation || 0) + reputationChange;
      await updateUser(selectedUserForReputation.id, { reputation: Math.max(0, newReputation) });
      refreshData();
      const updatedUser = members.find(m => m.id === selectedUserForReputation.id);
      alert({
        title: "Réputation mise à jour",
        message: `${selectedUserForReputation.username} a maintenant ${Math.max(0, newReputation)} points de réputation.`,
        type: "success",
      });
      setSelectedUserForReputation(null);
      setReputationChange(0);
      // Rafraîchir immédiatement
      refreshData();
    } catch (error) {
      alert({
        title: "Erreur",
        message: "Erreur lors de la mise à jour",
        type: "danger",
      });
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !user || !canAccessAdmin(user.role)) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user || !canAccessAdmin(user.role)) {
    return (
      <div className="min-h-screen bg-charcoal-black aged-paper flex items-center justify-center p-4">
        <GlareCard className="aged-paper text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-patina-gold mb-4 vintage-text">
            Redirection...
          </h2>
          <p className="text-vintage-cream/80">
            Vous allez être redirigé vers la page de connexion admin.
          </p>
        </GlareCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-black aged-paper">
      <NewApplicationNotification 
        isOpen={showNotification} 
        onClose={() => setShowNotification(false)} 
        count={pendingCount}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold vintage-text text-patina-gold mb-4">
            Panel Admin
          </h1>
          <p className="text-lg md:text-xl text-vintage-cream/80 max-w-2xl mx-auto">
            Bureau de détective. Gestion des membres, missions et statistiques.
          </p>
        </motion.div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          {[
            { label: "Membres", value: stats.totalMembers, icon: Users, color: "patina-gold" },
            { label: "Missions Actives", value: stats.activeMissions, icon: FileText, color: "patina-gold" },
            { label: "Revenus Totaux", value: `$${stats.totalRevenue.toLocaleString()}`, icon: BarChart3, color: "patina-gold" },
            { label: "Points Réputation", value: stats.reputationPoints, icon: Settings, color: "blood-red" },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlareCard className="aged-paper text-center h-full">
                  <Icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-patina-gold" />
                  <div className="text-2xl md:text-3xl font-bold text-patina-gold mb-1 vintage-text">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-vintage-cream/70 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </GlareCard>
              </motion.div>
            );
          })}
        </div>

        {/* Sections principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
          {/* Gestion des Membres */}
          <GlareCard className="aged-paper">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-patina-gold vintage-text flex items-center gap-3">
                <Users className="w-5 h-5 md:w-6 md:h-6" />
                Gestion des Membres
              </h2>
              <div className="flex gap-2">
                {user && hasPermission(user.role, "remove_members") && (
                  <button
                    onClick={() => {
                      const membersToRemove = members.filter(m => {
                        if (m.status === 'pending') return false;
                        return canRemoveUser(user.role, m.role);
                      });
                      if (membersToRemove.length === 0) {
                        alert({
                          title: "Aucun membre",
                          message: "Aucun membre disponible à retirer.",
                          type: "info",
                        });
                        return;
                      }
                      const memberList = membersToRemove.map(m => `${m.username} (${m.role})`).join('\n');
                      const selected = prompt(`Membres disponibles à retirer:\n\n${memberList}\n\nEntrez le nom d'utilisateur à retirer:`);
                      if (selected) {
                        const memberToRemove = membersToRemove.find(m => m.username.toLowerCase() === selected.toLowerCase());
                        if (memberToRemove) {
                          handleDeleteMember(memberToRemove.id);
                        } else {
                          alert({
                            title: "Membre non trouvé",
                            message: "Le membre spécifié n'a pas été trouvé.",
                            type: "warning",
                          });
                        }
                      }
                    }}
                    className="px-3 md:px-4 py-2 bg-blood-red text-vintage-cream hover:bg-blood-red/80 transition-colors font-bold uppercase tracking-wider text-xs md:text-sm flex items-center gap-2 whitespace-nowrap"
                  >
                    <UserX className="w-4 h-4" />
                    Retirer un membre
                  </button>
                )}
                {user && hasPermission(user.role, "manage_members") && (
                  <button 
                    onClick={() => {
                      setEditingMember(null);
                      setNewMember({ username: "", password: "", role: "Bratan", reputation: 0, money: 0 });
                      setShowAddMember(true);
                    }}
                    className="px-3 md:px-4 py-2 bg-patina-gold text-charcoal-black hover:bg-patina-gold-light transition-colors font-bold uppercase tracking-wider text-xs md:text-sm flex items-center gap-2 whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter
                  </button>
                )}
              </div>
            </div>

            {/* Formulaire d'ajout/modification de membre */}
            {showAddMember && (
              <div className="mb-6 p-4 md:p-6 bg-anthracite/50 rounded-lg border border-patina-gold/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg md:text-xl font-bold text-patina-gold">
                    {editingMember ? "Modifier le membre" : "Ajouter un nouveau membre"}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddMember(false);
                      setEditingMember(null);
                      setNewMember({ username: "", password: "", role: "Bratan", reputation: 0, money: 0 });
                    }}
                    className="p-1 hover:bg-blood-red/10 rounded transition-colors"
                  >
                    <X className="w-5 h-5 text-blood-red" />
                  </button>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-patina-gold mb-2">Username</label>
                    <input
                      type="text"
                      value={newMember.username}
                      onChange={(e) => setNewMember({ ...newMember, username: e.target.value })}
                      disabled={!!editingMember}
                      className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-3 md:px-4 py-2 text-vintage-cream disabled:opacity-50"
                    />
                  </div>
                  {!editingMember && (
                    <div>
                      <label className="block text-xs md:text-sm font-bold text-patina-gold mb-2">Password</label>
                      <input
                        type="password"
                        value={newMember.password}
                        onChange={(e) => setNewMember({ ...newMember, password: e.target.value })}
                        className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-3 md:px-4 py-2 text-vintage-cream"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-patina-gold mb-2">Rôle</label>
                    <select
                      value={newMember.role}
                      onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                      className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-3 md:px-4 py-2 text-vintage-cream"
                    >
                      <option value="Bratan">Bratan</option>
                      <option value="Soldat">Soldat</option>
                      <option value="Avtoritet">Avtoritet</option>
                      <option value="Vor">Vor</option>
                      <option value="Sovetnik">Sovetnik</option>
                      <option value="Pervyi">Pervyi</option>
                      <option value="Pakhan">Pakhan</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-xs md:text-sm font-bold text-patina-gold mb-2">Réputation</label>
                      <input
                        type="number"
                        value={newMember.reputation}
                        onChange={(e) => setNewMember({ ...newMember, reputation: parseInt(e.target.value) || 0 })}
                        className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-3 md:px-4 py-2 text-vintage-cream"
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-bold text-patina-gold mb-2">Argent</label>
                      <input
                        type="number"
                        value={newMember.money}
                        onChange={(e) => setNewMember({ ...newMember, money: parseInt(e.target.value) || 0 })}
                        className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-3 md:px-4 py-2 text-vintage-cream"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 md:gap-3 pt-2">
                    <button
                      onClick={editingMember ? handleUpdateMember : handleAddMember}
                      className="flex-1 px-3 md:px-4 py-2 bg-patina-gold text-charcoal-black hover:bg-patina-gold-light transition-colors font-bold uppercase tracking-wider text-xs md:text-sm"
                    >
                      {editingMember ? "Mettre à jour" : "Ajouter"}
                    </button>
                    <button
                      onClick={() => {
                        setShowAddMember(false);
                        setEditingMember(null);
                        setNewMember({ username: "", password: "", role: "Bratan", reputation: 0, money: 0 });
                      }}
                      className="flex-1 px-3 md:px-4 py-2 bg-transparent border border-blood-red/40 text-blood-red hover:bg-blood-red/10 transition-colors font-bold uppercase tracking-wider text-xs md:text-sm"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Liste des membres */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {members.length === 0 ? (
                <p className="text-center text-vintage-cream/60 py-8">Aucun membre trouvé</p>
              ) : (
                members.map((member) => (
                  <div
                    key={member.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 md:p-4 bg-anthracite/50 rounded-lg border border-patina-gold/20"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-patina-gold/20 border-2 border-patina-gold/40 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 md:w-6 md:h-6 text-patina-gold" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-patina-gold truncate">{member.username}</p>
                        <div className="flex items-center gap-2 flex-wrap mt-1">
                          <RoleBadge role={member.role} size="sm" />
                          <span className="text-xs md:text-sm text-vintage-cream/70">
                            {member.reputation || 0} réputation • ${(member.money || 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {user && canModifyUser(user.role, member.role) && (
                        <button 
                          onClick={() => handleEditMember(member)}
                          className="p-2 hover:bg-patina-gold/10 rounded transition-colors"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4 md:w-5 md:h-5 text-patina-gold" />
                        </button>
                      )}
                      {user && canRemoveUser(user.role, member.role) && (
                        <button 
                          onClick={() => {
                            handleDeleteMember(member.id);
                          }}
                          className="p-2 hover:bg-blood-red/10 rounded transition-colors"
                          title="Supprimer le compte"
                        >
                          <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-blood-red" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </GlareCard>

          {/* Gestion des Missions */}
          <GlareCard className="aged-paper">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-patina-gold vintage-text flex items-center gap-3">
                <FileText className="w-5 h-5 md:w-6 md:h-6" />
                Missions
              </h2>
              <button 
                onClick={() => {
                  setEditingContract(null);
                  setNewMission({ type: "Vol", title: "", description: "", location: "", deadline: "", rewardMoney: 0, rewardRep: 0 });
                  setShowAddMission(true);
                }}
                className="px-3 md:px-4 py-2 bg-patina-gold text-charcoal-black hover:bg-patina-gold-light transition-colors font-bold uppercase tracking-wider text-xs md:text-sm flex items-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Créer
              </button>
            </div>

            {/* Formulaire d'ajout/modification de contrat */}
            {showAddMission && (
              <div className="mb-6 p-4 md:p-6 bg-anthracite/50 rounded-lg border border-patina-gold/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg md:text-xl font-bold text-patina-gold">
                    {editingContract ? "Modifier le contrat" : "Créer un nouveau contrat"}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddMission(false);
                      setEditingContract(null);
                      setNewMission({ type: "Vol", title: "", description: "", location: "", deadline: "", rewardMoney: 0, rewardRep: 0 });
                    }}
                    className="p-1 hover:bg-blood-red/10 rounded transition-colors"
                  >
                    <X className="w-5 h-5 text-blood-red" />
                  </button>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-patina-gold mb-2">Type</label>
                    <select
                      value={newMission.type}
                      onChange={(e) => setNewMission({ ...newMission, type: e.target.value })}
                      className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-3 md:px-4 py-2 text-vintage-cream"
                    >
                      <option value="Vol">Vol</option>
                      <option value="Extorsion">Extorsion</option>
                      <option value="Assassinat">Assassinat</option>
                      <option value="Trafic">Trafic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-patina-gold mb-2">Titre</label>
                    <input
                      type="text"
                      value={newMission.title}
                      onChange={(e) => setNewMission({ ...newMission, title: e.target.value })}
                      className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-3 md:px-4 py-2 text-vintage-cream"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-patina-gold mb-2">Description</label>
                    <textarea
                      value={newMission.description}
                      onChange={(e) => setNewMission({ ...newMission, description: e.target.value })}
                      className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-3 md:px-4 py-2 text-vintage-cream min-h-[80px] md:min-h-[100px]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-patina-gold mb-2">Localisation</label>
                    <input
                      type="text"
                      value={newMission.location}
                      onChange={(e) => setNewMission({ ...newMission, location: e.target.value })}
                      className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-3 md:px-4 py-2 text-vintage-cream"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-patina-gold mb-2">Date limite (YYYY-MM-DD)</label>
                    <input
                      type="date"
                      value={newMission.deadline}
                      onChange={(e) => setNewMission({ ...newMission, deadline: e.target.value })}
                      className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-3 md:px-4 py-2 text-vintage-cream"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-xs md:text-sm font-bold text-patina-gold mb-2">Récompense Argent</label>
                      <input
                        type="number"
                        value={newMission.rewardMoney}
                        onChange={(e) => setNewMission({ ...newMission, rewardMoney: parseInt(e.target.value) || 0 })}
                        className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-3 md:px-4 py-2 text-vintage-cream"
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-bold text-patina-gold mb-2">Récompense Réputation</label>
                      <input
                        type="number"
                        value={newMission.rewardRep}
                        onChange={(e) => setNewMission({ ...newMission, rewardRep: parseInt(e.target.value) || 0 })}
                        className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-3 md:px-4 py-2 text-vintage-cream"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 md:gap-3 pt-2">
                    <button
                      onClick={handleAddMission}
                      className="flex-1 px-3 md:px-4 py-2 bg-patina-gold text-charcoal-black hover:bg-patina-gold-light transition-colors font-bold uppercase tracking-wider text-xs md:text-sm"
                    >
                      {editingContract ? "Modifier" : "Créer"}
                    </button>
                    <button
                      onClick={() => {
                        setShowAddMission(false);
                        setEditingContract(null);
                        setNewMission({ type: "Vol", title: "", description: "", location: "", deadline: "", rewardMoney: 0, rewardRep: 0 });
                      }}
                      className="flex-1 px-3 md:px-4 py-2 bg-transparent border border-blood-red/40 text-blood-red hover:bg-blood-red/10 transition-colors font-bold uppercase tracking-wider text-xs md:text-sm"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Liste des missions */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {contracts.length === 0 ? (
                <p className="text-center text-vintage-cream/60 py-8">Aucune mission trouvée</p>
              ) : (
                contracts.map((mission) => (
                  <div
                    key={mission.id}
                    className="p-3 md:p-4 bg-anthracite/50 rounded-lg border border-patina-gold/20"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                      <h3 className="font-bold text-vintage-cream truncate">{mission.title}</h3>
                      <span className={`px-2 py-1 text-xs font-bold uppercase whitespace-nowrap flex-shrink-0 ${
                        mission.status === "in_progress"
                          ? "bg-patina-gold/20 border border-patina-gold/40 text-patina-gold"
                          : mission.status === "available"
                          ? "bg-vintage-cream/20 border border-vintage-cream/40 text-vintage-cream"
                          : "bg-blood-red/20 border border-blood-red/40 text-blood-red"
                      }`}>
                        {mission.status === "in_progress" ? "Active" : mission.status === "available" ? "Disponible" : "Terminée"}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-vintage-cream/70 mb-3 truncate">
                      {mission.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => handleEditMission(mission)}
                        className="px-2 md:px-3 py-1 bg-patina-gold/20 border border-patina-gold/40 text-patina-gold hover:bg-patina-gold/30 transition-colors text-xs font-bold uppercase"
                      >
                        Modifier
                      </button>
                      <button 
                        onClick={() => handleDeleteMission(mission.id)}
                        className="px-2 md:px-3 py-1 bg-transparent border border-blood-red/40 text-blood-red hover:bg-blood-red/10 transition-colors text-xs font-bold uppercase"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </GlareCard>
        </div>

        {/* Gestion de la Réputation */}
        <div className="mt-6 md:mt-8">
          <GlareCard className="aged-paper">
            <h2 className="text-xl md:text-2xl font-bold text-patina-gold mb-6 vintage-text flex items-center gap-3">
              <Settings className="w-5 h-5 md:w-6 md:h-6" />
              Gestion de la Réputation
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-bold text-patina-gold mb-2">Sélectionner un membre</label>
                <select
                  value={selectedUserForReputation?.id || ""}
                  onChange={(e) => {
                    const user = members.find(m => m.id === e.target.value);
                    setSelectedUserForReputation(user || null);
                    setReputationChange(0);
                  }}
                  className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-3 md:px-4 py-2 text-vintage-cream mb-4"
                >
                  <option value="">Sélectionner un membre...</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.username} ({member.role}) - {member.reputation || 0} réputation
                    </option>
                  ))}
                </select>
              </div>
              
              {selectedUserForReputation && (
                <div className="space-y-4 p-4 md:p-6 bg-anthracite/50 rounded-lg border border-patina-gold/20">
                  <div>
                    <p className="text-sm text-vintage-cream/80 mb-2">
                      Réputation actuelle: <span className="font-bold text-patina-gold">{selectedUserForReputation.reputation || 0}</span>
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-patina-gold mb-2">Modifier la réputation (+/-)</label>
                    <input
                      type="number"
                      value={reputationChange}
                      onChange={(e) => setReputationChange(parseInt(e.target.value) || 0)}
                      className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-3 md:px-4 py-2 text-vintage-cream"
                      placeholder="Ex: +50 ou -20"
                    />
                  </div>
                  <div className="flex gap-2 md:gap-3">
                    <button
                      onClick={handleReputationChange}
                      className="flex-1 px-3 md:px-4 py-2 bg-patina-gold text-charcoal-black hover:bg-patina-gold-light transition-colors font-bold uppercase tracking-wider text-xs md:text-sm"
                    >
                      Appliquer
                    </button>
                    <button
                      onClick={() => {
                        setSelectedUserForReputation(null);
                        setReputationChange(0);
                      }}
                      className="flex-1 px-3 md:px-4 py-2 bg-transparent border border-blood-red/40 text-blood-red hover:bg-blood-red/10 transition-colors font-bold uppercase tracking-wider text-xs md:text-sm"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              )}
            </div>
          </GlareCard>
        </div>

        {/* Section Candidatures en attente */}
        {members.filter(m => m.status === 'pending').length > 0 && (
          <GlareCard className="aged-paper border-2 border-patina-gold/40 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-6 h-6 md:w-8 md:h-8 text-patina-gold" />
              <h2 className="text-xl md:text-2xl font-bold text-patina-gold vintage-text">
                Candidatures en attente
              </h2>
              <span className="px-3 py-1 bg-patina-gold/20 border border-patina-gold/40 text-patina-gold text-xs font-bold uppercase rounded-full">
                {members.filter(m => m.status === 'pending').length}
              </span>
            </div>
            <div className="space-y-4">
              {members.filter(m => m.status === 'pending').map((applicant) => (
                <motion.div
                  key={applicant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-anthracite/50 rounded-lg p-4 md:p-6 border border-patina-gold/30"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-patina-gold/20 border-2 border-patina-gold/40 rounded-full flex items-center justify-center">
                          <Clock className="w-6 h-6 text-patina-gold animate-pulse" />
                        </div>
                        <div>
                          <h3 className="font-bold text-patina-gold text-lg">{applicant.username}</h3>
                          <p className="text-xs text-vintage-cream/60">
                            Candidature soumise le {applicant.createdAt ? new Date(applicant.createdAt).toLocaleDateString('fr-FR') : 'Date inconnue'}
                          </p>
                        </div>
                      </div>
                      {applicant.applicationData && (
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-patina-gold font-semibold">Pseudo RP:</span>{" "}
                            <span className="text-vintage-cream/80">{applicant.applicationData.pseudo}</span>
                          </div>
                          <div>
                            <span className="text-patina-gold font-semibold">Discord:</span>{" "}
                            <span className="text-vintage-cream/80">{applicant.applicationData.discord}</span>
                          </div>
                          <div>
                            <span className="text-patina-gold font-semibold">Expérience RP:</span>
                            <p className="text-vintage-cream/70 mt-1 italic leading-relaxed">
                              {applicant.applicationData.experience}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-3 flex-shrink-0">
                      <button
                        onClick={() => handleApproveApplication(applicant.id)}
                        className="px-4 py-2 bg-patina-gold text-charcoal-black hover:bg-patina-gold-light transition-colors font-bold uppercase tracking-wider text-xs md:text-sm flex items-center justify-center gap-2 rounded-lg"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approuver
                      </button>
                      <button
                        onClick={() => handleRejectApplication(applicant.id)}
                        className="px-4 py-2 bg-transparent border-2 border-blood-red/40 text-blood-red hover:bg-blood-red/10 hover:border-blood-red/60 transition-colors font-bold uppercase tracking-wider text-xs md:text-sm flex items-center justify-center gap-2 rounded-lg"
                      >
                        <XCircle className="w-4 h-4" />
                        Refuser
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlareCard>
        )}

        {/* Section Candidatures refusées */}
        {members.filter(m => m.status === 'rejected').length > 0 && (
          <GlareCard className="aged-paper border-2 border-blood-red/40 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <UserX className="w-6 h-6 md:w-8 md:h-8 text-blood-red" />
              <h2 className="text-xl md:text-2xl font-bold text-blood-red vintage-text">
                Candidatures refusées
              </h2>
              <span className="px-3 py-1 bg-blood-red/20 border border-blood-red/40 text-blood-red text-xs font-bold uppercase rounded-full">
                {members.filter(m => m.status === 'rejected').length}
              </span>
            </div>
            <div className="space-y-4">
              {members.filter(m => m.status === 'rejected').map((applicant) => (
                <motion.div
                  key={applicant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-anthracite/50 rounded-lg p-4 md:p-6 border border-blood-red/30"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-blood-red/20 border-2 border-blood-red/40 rounded-full flex items-center justify-center">
                          <XCircle className="w-6 h-6 text-blood-red" />
                        </div>
                        <div>
                          <h3 className="font-bold text-blood-red text-lg">{applicant.username}</h3>
                          <p className="text-xs text-vintage-cream/60">
                            Candidature refusée le {applicant.createdAt ? new Date(applicant.createdAt).toLocaleDateString('fr-FR') : 'Date inconnue'}
                          </p>
                        </div>
                      </div>
                      {applicant.applicationData && (
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-blood-red font-semibold">Pseudo RP:</span>{" "}
                            <span className="text-vintage-cream/80">{applicant.applicationData.pseudo}</span>
                          </div>
                          <div>
                            <span className="text-blood-red font-semibold">Discord:</span>{" "}
                            <span className="text-vintage-cream/80">{applicant.applicationData.discord}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-3 flex-shrink-0">
                      {user && canRemoveUser(user.role, applicant.role) && (
                        <button
                          onClick={() => handleDeleteMember(applicant.id)}
                          className="px-4 py-2 bg-transparent border-2 border-blood-red/40 text-blood-red hover:bg-blood-red/10 hover:border-blood-red/60 transition-colors font-bold uppercase tracking-wider text-xs md:text-sm flex items-center justify-center gap-2 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                          Supprimer
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlareCard>
        )}
      </div>
      <ConfirmComp />
      <AlertComp />
    </div>
  );
}
