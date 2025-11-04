"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, CheckCircle, XCircle, Target, Clock, Users } from "lucide-react";
import { GlareCard } from "@/components/GlareCard";
import { useAuth } from "@/contexts/AuthContext";
import { getAllUsers } from "@/lib/auth";
import { acceptInvitation, rejectInvitation, getPendingInvitations, cleanupOldInvitations } from "@/lib/invitations";
import { MissionInvitation } from "@/lib/types";
import { getContracts } from "@/lib/data";
import { useConfirm } from "@/hooks/useConfirm";
import { useAlert } from "@/hooks/useAlert";
import { useDataSync } from "@/hooks/useDataSync";

export function MissionInvitations() {
  const { user, updateUserData } = useAuth();
  const { confirm, ConfirmComponent: ConfirmComp } = useConfirm();
  const { alert, AlertComponent: AlertComp } = useAlert();
  const [invitations, setInvitations] = useState<MissionInvitation[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [contracts, setContracts] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      if (user && user.status === 'approved') {
        await cleanupOldInvitations(user.id);
        const pending = await getPendingInvitations(user.id);
        setInvitations(pending);
        const loadedContracts = await getContracts();
        setContracts(loadedContracts);
      }
    };
    loadData();
  }, [user]);

  // Synchroniser les invitations automatiquement
  useDataSync(async () => {
    if (user && user.status === 'approved') {
      await cleanupOldInvitations(user.id);
      const pending = await getPendingInvitations(user.id);
      setInvitations(pending);
      const loadedContracts = await getContracts();
      setContracts(loadedContracts);
    }
  }, 2000); // Rafraîchir toutes les 2 secondes

  const handleAccept = async (contractId: number) => {
    if (!user) return;

    if (await acceptInvitation(user.id, contractId)) {
      // Rafraîchir immédiatement les invitations depuis MongoDB
      const allUsers = await getAllUsers();
      const updatedUser = allUsers.find(u => u.id === user.id);
      if (updatedUser) {
        await updateUserData({
          missionInvitations: updatedUser.missionInvitations,
        });
        const refreshedInvitations = await getPendingInvitations(user.id);
        setInvitations(refreshedInvitations);
      }
      // Rediriger vers les missions
      window.location.href = '/missions';
    } else {
      alert({
        title: "Erreur",
        message: "Erreur lors de l'acceptation de l'invitation.",
        type: "danger",
      });
    }
  };

  const handleReject = (contractId: number) => {
    if (!user) return;

    confirm({
      title: "Refuser l'invitation",
      message: "Êtes-vous sûr de vouloir refuser cette invitation ?",
      type: "warning",
      confirmText: "Refuser",
      cancelText: "Annuler",
    }, async () => {
      if (await rejectInvitation(user.id, contractId)) {
        // Rafraîchir immédiatement les invitations depuis MongoDB
        const allUsers = await getAllUsers();
        const updatedUser = allUsers.find(u => u.id === user.id);
        if (updatedUser) {
          await updateUserData({
            missionInvitations: updatedUser.missionInvitations,
          });
          const refreshedInvitations = await getPendingInvitations(user.id);
          setInvitations(refreshedInvitations);
        }
        alert({
          title: "Invitation refusée",
          message: "L'invitation a été refusée.",
          type: "info",
        });
      } else {
        alert({
          title: "Erreur",
          message: "Erreur lors du refus de l'invitation.",
          type: "danger",
        });
      }
    });
  };

  if (!user || user.status !== 'approved' || invitations.length === 0) {
    return null;
  }

  return (
    <>
      {/* Badge de notification */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 hover:bg-blood-red/10 rounded transition-colors"
        title="Invitations de missions"
      >
        <Mail className="w-5 h-5 text-blood-red" />
        {invitations.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-blood-red text-vintage-cream rounded-full text-xs font-bold flex items-center justify-center">
            {invitations.length}
          </span>
        )}
      </button>

      {/* Popup des invitations */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-charcoal-black/90 backdrop-blur-sm z-50"
            />
            
            {/* Popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ overflow: 'hidden' }}
            >
              <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden custom-scrollbar">
                <GlareCard className="aged-paper border-4 border-blood-red/60 shadow-[0_0_50px_rgba(139,0,0,0.8)]">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blood-red/20 rounded-full border-2 border-blood-red/40 flex items-center justify-center">
                        <Mail className="w-6 h-6 text-blood-red" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-blood-red vintage-text">
                          Invitations de Missions
                        </h2>
                        <p className="text-sm text-vintage-cream/70">
                          {invitations.length} invitation{invitations.length > 1 ? 's' : ''} en attente
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-blood-red/10 rounded transition-colors"
                    >
                      <X className="w-5 h-5 text-blood-red" />
                    </button>
                  </div>

                  {/* Liste des invitations */}
                  <div className="space-y-4">
                    {invitations.map((invitation) => {
                      const contract = contracts.find((c: any) => c.id === invitation.contractId);
                      const isAlreadyInTeam = contract?.teamMembers?.includes(user.username || '');

                      return (
                        <motion.div
                          key={invitation.contractId}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-anthracite/50 border-2 border-blood-red/30 rounded-lg"
                        >
                          <div className="flex items-start gap-4 mb-3">
                            <div className="w-10 h-10 bg-blood-red/20 rounded-full border-2 border-blood-red/40 flex items-center justify-center flex-shrink-0">
                              <Target className="w-5 h-5 text-blood-red" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-bold text-patina-gold mb-1">
                                {invitation.contractTitle}
                              </h3>
                              <p className="text-sm text-vintage-cream/70 mb-2">
                                Invité par <span className="text-patina-gold font-semibold">{invitation.invitedBy}</span>
                              </p>
                              {contract && (
                                <div className="flex items-center gap-4 text-xs text-vintage-cream/60 mb-2">
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>Échéance: {contract.deadline}</span>
                                  </div>
                                  {contract.teamMembers && contract.teamMembers.length > 0 && (
                                    <div className="flex items-center gap-1">
                                      <Users className="w-3 h-3" />
                                      <span>{contract.teamMembers.length} membre{contract.teamMembers.length > 1 ? 's' : ''}</span>
                                    </div>
                                  )}
                                </div>
                              )}
                              {isAlreadyInTeam && (
                                <div className="mt-2 p-2 bg-patina-gold/10 border border-patina-gold/30 rounded text-xs text-patina-gold">
                                  ✓ Vous êtes déjà dans cette équipe
                                </div>
                              )}
                            </div>
                          </div>

                              {!isAlreadyInTeam && (
                            <div className="flex gap-3 mt-4">
                              <button
                                onClick={() => {
                                  handleAccept(invitation.contractId);
                                  setIsOpen(false);
                                }}
                                className="flex-1 px-4 py-2 bg-patina-gold text-charcoal-black hover:bg-patina-gold-light transition-colors font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Accepter
                              </button>
                              <button
                                onClick={() => {
                                  handleReject(invitation.contractId);
                                  if (invitations.length === 1) {
                                    setIsOpen(false);
                                  }
                                }}
                                className="flex-1 px-4 py-2 bg-transparent border-2 border-blood-red/40 text-blood-red hover:bg-blood-red/10 hover:border-blood-red/60 transition-colors font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2"
                              >
                                <XCircle className="w-4 h-4" />
                                Refuser
                              </button>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  {invitations.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-vintage-cream/70">Aucune invitation en attente</p>
                    </div>
                  )}
                </GlareCard>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <ConfirmComp />
      <AlertComp />
    </>
  );
}

