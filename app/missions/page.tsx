"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlareCard } from "@/components/GlareCard";
import { MemberOnlyPopup } from "@/components/MemberOnlyPopup";
import { CheckCircle, XCircle, DollarSign, TrendingUp, Target, Clock, Lock, Users, UserPlus, UserCheck, UserX, Mail } from "lucide-react";
import { getContracts, updateContract } from "@/lib/data";
import { Contract } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import { updateUser, getAllUsers } from "@/lib/auth";
import { sendInvitation } from "@/lib/invitations";
import { useConfirm } from "@/hooks/useConfirm";
import { useAlert } from "@/hooks/useAlert";
import { useDataSync } from "@/hooks/useDataSync";

export default function MissionsPage() {
  const { user, updateUserData, isAuthenticated } = useAuth();
  const { confirm, ConfirmComponent: ConfirmComp } = useConfirm();
  const { alert, AlertComponent: AlertComp } = useAlert();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowPopup(true);
    }
    const refreshContracts = async () => {
      const contracts = await getContracts();
      setContracts(contracts);
      setLoading(false);
    };
    refreshContracts();
  }, [isAuthenticated]);

  // Synchroniser les données automatiquement
  useDataSync(async () => {
    const contracts = await getContracts();
    setContracts(contracts);
  }, 2000); // Rafraîchir toutes les 2 secondes

  const handleAccept = async (contract: Contract) => {
    if (!user) {
      alert({
        title: "Connexion requise",
        message: "Vous devez être connecté pour accepter une mission",
        type: "warning",
      });
      return;
    }

    // Vérifier si la mission n'est pas déjà lockée
    if (contract.lockedBy && contract.lockedBy !== user.username) {
      alert({
        title: "Mission déjà acceptée",
        message: "Cette mission est déjà acceptée par un autre membre. Vous pouvez demander à rejoindre l'équipe.",
        type: "info",
      });
      return;
    }

    // Vérifier que l'ID est valide
    if (!contract.id) {
      alert({
        title: "Erreur",
        message: "Impossible d'accepter cette mission : ID invalide",
        type: "danger",
      });
      return;
    }

    const contractIdStr = String(contract.id).trim();
    if (contractIdStr.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(contractIdStr)) {
      alert({
        title: "Erreur",
        message: "Impossible d'accepter cette mission : ID invalide (format MongoDB requis)",
        type: "danger",
      });
      return;
    }

    const updatedContract = await updateContract(contractIdStr, {
      status: "in_progress",
      lockedBy: user.username, // Lock la mission pour cet utilisateur
      teamMembers: [user.username], // Ajouter le leader à l'équipe
      teamRequests: [], // Initialiser les demandes
    });

    if (updatedContract) {
      // Rafraîchir immédiatement les contrats
      const refreshedContracts = await getContracts();
      setContracts(refreshedContracts);
      alert({
        title: "Mission acceptée",
        message: `Mission "${contract.title}" acceptée et verrouillée ! Vous pouvez maintenant inviter d'autres membres.`,
        type: "success",
      });
    }
  };

  const handleRefuse = async (contract: Contract) => {
    if (!user) {
      alert({
        title: "Connexion requise",
        message: "Vous devez être connecté pour refuser une mission",
        type: "warning",
      });
      return;
    }

    // Vérifier que l'ID est valide
    if (!contract.id) {
      alert({
        title: "Erreur",
        message: "Impossible de refuser cette mission : ID invalide",
        type: "danger",
      });
      return;
    }

    const contractIdStr = String(contract.id).trim();
    if (contractIdStr.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(contractIdStr)) {
      alert({
        title: "Erreur",
        message: "Impossible de refuser cette mission : ID invalide (format MongoDB requis)",
        type: "danger",
      });
      return;
    }

    const updatedContract = await updateContract(contractIdStr, {
      status: "refused",
    });

    if (updatedContract) {
      // Rafraîchir immédiatement les contrats
      const refreshedContracts = await getContracts();
      setContracts(refreshedContracts);
      alert({
        title: "Mission refusée",
        message: `Mission "${contract.title}" refusée.`,
        type: "info",
      });
    }
  };

  const handleComplete = async (contract: Contract) => {
    if (!user) return;

    // Vérifier que l'utilisateur est celui qui a locké la mission
    if (contract.lockedBy !== user.username) {
      alert({
        title: "Permission refusée",
        message: "Seul le leader de la mission peut la marquer comme terminée.",
        type: "warning",
      });
      return;
    }

    confirm({
      title: "Terminer la mission",
      message: "Êtes-vous sûr de vouloir marquer cette mission comme terminée ? Tous les membres de l'équipe recevront les récompenses.",
      type: "warning",
      confirmText: "Terminer",
      cancelText: "Annuler",
    }, async () => {
      // Donner les récompenses au leader et à tous les membres de l'équipe
      const teamMembers = contract.teamMembers || [user.username];
      const rewardPerMember = {
        money: Math.floor(contract.reward.money / teamMembers.length),
        reputation: Math.floor(contract.reward.reputation / teamMembers.length),
      };

      // Donner les récompenses au leader
      const newMoney = (user.money || 0) + rewardPerMember.money;
      const newReputation = (user.reputation || 0) + rewardPerMember.reputation;

      await updateUser(user.id, {
        money: newMoney,
        reputation: newReputation,
      });
      await updateUserData({
        money: newMoney,
        reputation: newReputation,
      });

      // Donner les récompenses aux autres membres
      const allUsers = await getAllUsers();
      for (const memberUsername of teamMembers) {
        if (memberUsername !== user.username) {
          const member = allUsers.find((u) => u.username === memberUsername);
          if (member) {
            await updateUser(member.id, {
              money: (member.money || 0) + rewardPerMember.money,
              reputation: (member.reputation || 0) + rewardPerMember.reputation,
            });
          }
        }
      }

      // Vérifier que l'ID est valide
      if (!contract.id) {
        alert({
          title: "Erreur",
          message: "Impossible de compléter cette mission : ID invalide",
          type: "danger",
        });
        return;
      }

      const contractIdStr = String(contract.id).trim();
      if (contractIdStr.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(contractIdStr)) {
        alert({
          title: "Erreur",
          message: "Impossible de compléter cette mission : ID invalide (format MongoDB requis)",
          type: "danger",
        });
        return;
      }

      await updateContract(contractIdStr, {
        status: "completed",
      });

      // Rafraîchir immédiatement les contrats
      const refreshedContracts = await getContracts();
      setContracts(refreshedContracts);
      alert({
        title: "Mission complétée",
        message: `Vous avez reçu $${rewardPerMember.money.toLocaleString()} et ${rewardPerMember.reputation} points de réputation. Les autres membres de l'équipe ont également reçu leur part.`,
        type: "success",
      });
    });
  };

  const handleRequestToJoin = async (contract: Contract) => {
    if (!user) return;

    // Vérifier que la mission est lockée
    if (!contract.lockedBy) {
      alert({
        title: "Mission non acceptée",
        message: "Cette mission n'a pas été acceptée. Vous devez d'abord l'accepter.",
        type: "warning",
      });
      return;
    }

    // Vérifier que l'utilisateur n'est pas déjà dans l'équipe
    if (contract.teamMembers?.includes(user.username)) {
      alert({
        title: "Déjà membre",
        message: "Vous faites déjà partie de l'équipe de cette mission.",
        type: "info",
      });
      return;
    }

    // Vérifier si une demande est déjà en attente
    const existingRequest = contract.teamRequests?.find(
      (r) => r.username === user.username && r.status === "pending"
    );
    if (existingRequest) {
      alert({
        title: "Demande en attente",
        message: "Vous avez déjà une demande en attente pour cette mission.",
        type: "info",
      });
      return;
    }

    // Ajouter la demande
    // Vérifier que l'ID est valide
    if (!contract.id) {
      alert({
        title: "Erreur",
        message: "Impossible d'envoyer une invitation : ID invalide",
        type: "danger",
      });
      return;
    }

    const contractIdStr = String(contract.id).trim();
    if (contractIdStr.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(contractIdStr)) {
      alert({
        title: "Erreur",
        message: "Impossible d'envoyer une invitation : ID invalide (format MongoDB requis)",
        type: "danger",
      });
      return;
    }

    const updatedContract = await updateContract(contractIdStr, {
      teamRequests: [
        ...(contract.teamRequests || []),
        {
          username: user.username,
          requestedBy: user.username,
          status: "pending",
        },
      ],
    });

    if (updatedContract) {
      // Rafraîchir immédiatement les contrats
      const refreshedContracts = await getContracts();
      setContracts(refreshedContracts);
      alert({
        title: "Demande envoyée",
        message: `Demande envoyée au leader de la mission "${contract.title}". En attente d'approbation.`,
        type: "success",
      });
    }
  };

  const handleAcceptRequest = async (contract: Contract, requestUsername: string) => {
    if (!user || contract.lockedBy !== user.username) {
      alert({
        title: "Permission refusée",
        message: "Seul le leader de la mission peut accepter les demandes.",
        type: "warning",
      });
      return;
    }

    // Mettre à jour la demande
    const updatedRequests = (contract.teamRequests || []).map((r) =>
      r.username === requestUsername ? { ...r, status: "accepted" as const } : r
    );

    // Ajouter le membre à l'équipe
    const updatedContract = await updateContract(contract.id, {
      teamMembers: [...(contract.teamMembers || []), requestUsername],
      teamRequests: updatedRequests,
    });

    if (updatedContract) {
      // Rafraîchir immédiatement les contrats
      const refreshedContracts = await getContracts();
      setContracts(refreshedContracts);
      alert({
        title: "Membre ajouté",
        message: `${requestUsername} a été ajouté à l'équipe.`,
        type: "success",
      });
    }
  };

  const handleRejectRequest = async (contract: Contract, requestUsername: string) => {
    if (!user || contract.lockedBy !== user.username) {
      alert({
        title: "Permission refusée",
        message: "Seul le leader de la mission peut rejeter les demandes.",
        type: "warning",
      });
      return;
    }

    // Mettre à jour la demande
    const updatedRequests = (contract.teamRequests || []).map((r) =>
      r.username === requestUsername ? { ...r, status: "rejected" as const } : r
    );

    // Vérifier que l'ID est valide
    if (!contract.id) {
      alert({
        title: "Erreur",
        message: "Impossible de refuser l'invitation : ID invalide",
        type: "danger",
      });
      return;
    }

    const contractIdStr = String(contract.id).trim();
    if (contractIdStr.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(contractIdStr)) {
      alert({
        title: "Erreur",
        message: "Impossible de refuser l'invitation : ID invalide (format MongoDB requis)",
        type: "danger",
      });
      return;
    }

    const updatedContract = await updateContract(contractIdStr, {
      teamRequests: updatedRequests,
    });

    if (updatedContract) {
      // Rafraîchir immédiatement les contrats
      const refreshedContracts = await getContracts();
      setContracts(refreshedContracts);
      alert({
        title: "Demande rejetée",
        message: `Demande de ${requestUsername} rejetée.`,
        type: "info",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal-black aged-paper flex items-center justify-center">
        <div className="text-patina-gold">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-black aged-paper">
      <MemberOnlyPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        title="Accès aux Missions"
        message="Vous devez être membre de la famille pour voir et accepter les missions. Rejoignez-nous pour accéder aux contrats disponibles."
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold vintage-text text-patina-gold mb-4">
            Tableau de Missions
          </h1>
          <p className="text-xl text-vintage-cream/80 max-w-2xl mx-auto">
            Contrats en cours. Acceptez ou refusez selon votre stratégie. Chaque décision a des conséquences.
          </p>
        </motion.div>

        {!isAuthenticated ? (
          <div className="max-w-4xl mx-auto">
            <GlareCard className="aged-paper text-center border-2 border-blood-red/40">
              <div className="py-16">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="inline-block mb-6"
                >
                  <div className="w-24 h-24 bg-blood-red/20 rounded-full border-4 border-blood-red/60 flex items-center justify-center mx-auto">
                    <Lock className="w-12 h-12 text-blood-red" />
                  </div>
                </motion.div>
                <h2 className="text-3xl font-bold text-blood-red mb-4 vintage-text">
                  Accès Restreint
                </h2>
                <p className="text-vintage-cream/80 mb-6 text-lg">
                  Vous devez être membre de la famille pour voir et accepter les missions.
                </p>
                <button
                  onClick={() => setShowPopup(true)}
                  className="px-8 py-3 bg-patina-gold text-charcoal-black hover:bg-patina-gold-light transition-colors font-bold uppercase tracking-wider rounded-lg"
                >
                  Devenir Membre
                </button>
              </div>
            </GlareCard>
          </div>
        ) : (
          <div className="relative max-w-6xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal-black via-anthracite to-charcoal-black rounded-lg border-4 border-patina-gold/40 shadow-2xl" />
          <div className="absolute inset-0 bg-[url('/texture-blackboard.jpg')] opacity-20 rounded-lg" />
          <div className="absolute top-4 left-4 w-3 h-3 bg-blood-red rounded-full shadow-lg" />
          <div className="absolute top-4 right-4 w-3 h-3 bg-blood-red rounded-full shadow-lg" />
          <div className="absolute bottom-4 left-4 w-3 h-3 bg-blood-red rounded-full shadow-lg" />
          <div className="absolute bottom-4 right-4 w-3 h-3 bg-blood-red rounded-full shadow-lg" />

          <div className="relative z-10 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contracts.map((contract, index) => (
                <motion.div
                  key={contract.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-charcoal-black/90 border-2 border-patina-gold/30 rounded-lg p-6 shadow-lg relative">
                    <div className="absolute top-2 left-2 w-2 h-2 bg-patina-gold rounded-full" />
                    <div className="absolute top-2 right-2 w-2 h-2 bg-patina-gold rounded-full" />

                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-5 h-5 text-patina-gold" />
                      <span className="text-xs font-bold text-patina-gold uppercase tracking-wider">
                        {contract.type}
                      </span>
                      {contract.status === "in_progress" && (
                        <span className="ml-auto px-2 py-1 bg-patina-gold/20 border border-patina-gold/40 text-patina-gold text-xs font-bold uppercase">
                          En Cours
                        </span>
                      )}
                      {contract.status === "completed" && (
                        <span className="ml-auto px-2 py-1 bg-patina-gold/20 border border-patina-gold/40 text-patina-gold text-xs font-bold uppercase">
                          Terminée
                        </span>
                      )}
                      {contract.status === "refused" && (
                        <span className="ml-auto px-2 py-1 bg-blood-red/20 border border-blood-red/40 text-blood-red text-xs font-bold uppercase">
                          Refusée
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-vintage-cream mb-2 vintage-text">
                      {contract.title}
                    </h3>

                    <p className="text-vintage-cream/70 text-sm mb-4 leading-relaxed">
                      {contract.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-patina-gold/70 mb-4">
                      <Clock className="w-4 h-4" />
                      <span>{contract.location}</span>
                      <span className="text-blood-red">•</span>
                      <span>Échéance: {contract.deadline}</span>
                    </div>

                    {contract.lockedBy && (
                      <div className="mb-4 p-3 bg-patina-gold/10 border border-patina-gold/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-patina-gold" />
                            <span className="text-xs font-bold text-patina-gold uppercase tracking-wider">
                              Mission verrouillée par {contract.lockedBy}
                            </span>
                          </div>
                          {contract.lockedBy === user?.username && (
                            <button
                              onClick={async () => {
                                const allMembers = (await getAllUsers()).filter(u => 
                                  u.status === 'approved' && 
                                  u.username !== user.username &&
                                  !contract.teamMembers?.includes(u.username)
                                );
                                if (allMembers.length === 0) {
                                  alert({
                                    title: "Aucun membre",
                                    message: "Aucun membre disponible à inviter.",
                                    type: "info",
                                  });
                                  return;
                                }
                                const memberList = allMembers.map(m => `${m.username} (${m.role})`).join('\n');
                                const selected = prompt(`Membres disponibles à inviter:\n\n${memberList}\n\nEntrez le nom d'utilisateur à inviter:`);
                                if (selected) {
                                  const memberToInvite = allMembers.find(m => m.username.toLowerCase() === selected.toLowerCase());
                                  if (memberToInvite) {
                                    if (await sendInvitation(contract.id, memberToInvite.username, user.username)) {
                                      // Rafraîchir immédiatement les contrats
                                      const refreshedContracts = await getContracts();
                                      setContracts(refreshedContracts);
                                      alert({
                                        title: "Invitation envoyée",
                                        message: `Invitation envoyée à ${memberToInvite.username}. Il recevra une notification sur son compte.`,
                                        type: "success",
                                      });
                                    } else {
                                      alert({
                                        title: "Erreur",
                                        message: "Erreur lors de l'envoi de l'invitation. Vérifiez que le membre n'a pas déjà été invité.",
                                        type: "danger",
                                      });
                                    }
                                  } else {
                                    alert({
                                      title: "Membre non trouvé",
                                      message: "Le membre spécifié n'a pas été trouvé.",
                                      type: "warning",
                                    });
                                  }
                                }
                              }}
                              className="p-1.5 bg-patina-gold/20 hover:bg-patina-gold/30 rounded transition-colors"
                              title="Inviter un membre"
                            >
                              <Mail className="w-3.5 h-3.5 text-patina-gold" />
                            </button>
                          )}
                        </div>
                        {contract.teamMembers && contract.teamMembers.length > 0 && (
                          <div className="mt-2">
                            <div className="flex items-center gap-2 mb-2">
                              <Users className="w-3 h-3 text-patina-gold" />
                              <span className="text-xs font-semibold text-patina-gold">Équipe ({contract.teamMembers.length}):</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {contract.teamMembers.map((member) => (
                                <span
                                  key={member}
                                  className={`px-2 py-1 rounded text-xs border ${
                                    member === contract.lockedBy
                                      ? "bg-patina-gold/20 border-patina-gold/60 text-patina-gold font-bold"
                                      : "bg-anthracite/50 border-patina-gold/30 text-vintage-cream/80"
                                  }`}
                                >
                                  {member}
                                  {member === contract.lockedBy && " (Leader)"}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {contract.teamRequests && contract.teamRequests.length > 0 && contract.teamRequests.filter(r => r.status === 'pending').length > 0 && (
                      <div className="mb-4 p-3 bg-blood-red/10 border border-blood-red/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <UserPlus className="w-4 h-4 text-blood-red" />
                          <span className="text-xs font-bold text-blood-red uppercase tracking-wider">
                            Demandes en attente ({contract.teamRequests.filter(r => r.status === 'pending').length})
                          </span>
                        </div>
                        <div className="space-y-2 mt-2">
                          {contract.teamRequests
                            .filter((r) => r.status === "pending")
                            .map((request) => (
                              <div
                                key={request.username}
                                className="flex items-center justify-between p-2 bg-anthracite/50 rounded"
                              >
                                <span className="text-xs text-vintage-cream/80">{request.username}</span>
                                {contract.lockedBy === user?.username && (
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleAcceptRequest(contract, request.username)}
                                      className="p-1 bg-patina-gold/20 hover:bg-patina-gold/30 rounded transition-colors"
                                      title="Accepter"
                                    >
                                      <UserCheck className="w-3 h-3 text-patina-gold" />
                                    </button>
                                    <button
                                      onClick={() => handleRejectRequest(contract, request.username)}
                                      className="p-1 bg-blood-red/20 hover:bg-blood-red/30 rounded transition-colors"
                                      title="Rejeter"
                                    >
                                      <UserX className="w-3 h-3 text-blood-red" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    <div className="border-t border-patina-gold/20 pt-4 mb-4">
                      <h4 className="text-sm font-bold text-patina-gold mb-2 uppercase tracking-wider">
                        Récompenses
                      </h4>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-patina-gold" />
                          <span className="text-vintage-cream/80">
                            ${contract.reward.money.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-patina-gold" />
                          <span className="text-vintage-cream/80">
                            +{contract.reward.reputation} réputation
                          </span>
                        </div>
                        {contract.reward.items && (
                          <div className="flex items-center gap-2">
                            <span className="text-vintage-cream/80">
                              {contract.reward.items.join(", ")}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {contract.status === "available" && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleAccept(contract)}
                          className="flex-1 px-4 py-2 bg-patina-gold text-charcoal-black hover:bg-patina-gold-light transition-colors font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Accepter
                        </button>
                        <button
                          onClick={() => handleRefuse(contract)}
                          className="flex-1 px-4 py-2 bg-transparent border-2 border-blood-red/40 text-blood-red hover:bg-blood-red/10 hover:border-blood-red/60 transition-colors font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2"
                        >
                          <XCircle className="w-4 h-4" />
                          Refuser
                        </button>
                      </div>
                    )}

                    {contract.status === "in_progress" && contract.lockedBy && (
                      <div className="space-y-2">
                        {contract.lockedBy !== user?.username && !contract.teamMembers?.includes(user?.username || '') && (
                          <button
                            onClick={() => handleRequestToJoin(contract)}
                            className="w-full px-4 py-2 bg-transparent border-2 border-patina-gold/40 text-patina-gold hover:bg-patina-gold/10 hover:border-patina-gold/60 transition-colors font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2"
                          >
                            <UserPlus className="w-4 h-4" />
                            Demander à rejoindre l'équipe
                          </button>
                        )}
                        {contract.lockedBy === user?.username && (
                          <button
                            onClick={() => handleComplete(contract)}
                            className="w-full px-4 py-2 bg-patina-gold text-charcoal-black hover:bg-patina-gold-light transition-colors font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Marquer comme terminée
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        )}
      </div>
      <ConfirmComp />
      <AlertComp />
    </div>
  );
}
