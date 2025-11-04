"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlareCard } from "@/components/GlareCard";
import { MessageSquare, Phone, Lock, Send, AlertCircle } from "lucide-react";
import { getMessages, addMessage } from "@/lib/data";
import { ForumMessage } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import { useAlert } from "@/hooks/useAlert";
import { useDataSync } from "@/hooks/useDataSync";

const channels = [
  { id: 1, name: "Discussions RP", icon: MessageSquare },
  { id: 2, name: "Planification", icon: Phone },
  { id: 3, name: "Recrutement", icon: MessageSquare },
  { id: 4, name: "Messages Privés", icon: Lock },
];

export default function ForumPage() {
  const { user, isAuthenticated } = useAuth();
  const { alert, AlertComponent: AlertComp } = useAlert();
  const [selectedChannel, setSelectedChannel] = useState(1);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ForumMessage[]>([]);

  useEffect(() => {
    const loadMessages = async () => {
      const messages = await getMessages(selectedChannel);
      setMessages(messages);
    };
    loadMessages();
  }, [selectedChannel]);

  // Synchroniser les messages automatiquement
  useDataSync(async () => {
    const messages = await getMessages(selectedChannel);
    setMessages(messages);
  }, 2000); // Rafraîchir toutes les 2 secondes

  // Vérifier si l'utilisateur peut écrire dans le canal sélectionné
  const canWriteInChannel = (channelId: number): boolean => {
    if (!user) return false;
    // Admin peut tout faire
    if (user.role === "Admin") return true;
    
    // Planification (2) et Recrutement (3) : Seuls Pakhan, Pervyi et Sovetnik peuvent écrire
    if (channelId === 2 || channelId === 3) {
      return user.role === "Pakhan" || user.role === "Pervyi" || user.role === "Sovetnik";
    }
    
    // Autres canaux : tous les membres peuvent écrire
    return true;
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !isAuthenticated || !user) {
      return;
    }

    // Vérifier les permissions
    if (!canWriteInChannel(selectedChannel)) {
      const channelName = channels.find(c => c.id === selectedChannel)?.name || "ce canal";
      alert({
        title: "Permission refusée",
        message: `Vous n'avez pas la permission d'écrire dans ${channelName}. Seuls le Pakhan, le Pervyi et le Sovetnik peuvent écrire dans ce canal.`,
        type: "warning",
      });
      return;
    }

    const newMessage = await addMessage({
      channelId: selectedChannel,
      author: user.username,
      content: message,
      encrypted: selectedChannel === 4, // Messages privés sont chiffrés
    });

    // Rafraîchir immédiatement les messages depuis MongoDB
    const refreshedMessages = await getMessages(selectedChannel);
    setMessages(refreshedMessages);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-charcoal-black aged-paper">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold vintage-text text-patina-gold mb-4">
            Canal de Discussion
          </h1>
          <p className="text-xl text-vintage-cream/80 max-w-2xl mx-auto">
            Messagerie interne sécurisée. Style machine à écrire vintage.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <GlareCard className="aged-paper">
                <h2 className="text-xl font-bold text-patina-gold mb-4 vintage-text uppercase tracking-wider">
                  Canaux
                </h2>
                <div className="space-y-2">
                  {channels.map((channel) => {
                    const Icon = channel.icon;
                    return (
                      <button
                        key={channel.id}
                        onClick={() => setSelectedChannel(channel.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                          selectedChannel === channel.id
                            ? "bg-patina-gold/20 border border-patina-gold/40"
                            : "bg-anthracite/50 hover:bg-anthracite/70"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-5 h-5 text-patina-gold" />
                          <span className="text-sm text-vintage-cream font-medium">
                            {channel.name}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </GlareCard>
            </div>

            <div className="lg:col-span-3">
              <GlareCard className="aged-paper">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-patina-gold vintage-text uppercase tracking-wider">
                    {channels.find((c) => c.id === selectedChannel)?.name}
                  </h2>
                </div>

                <div className="bg-charcoal-black border-2 border-patina-gold/30 rounded-lg p-6 mb-4 min-h-[400px] max-h-[500px] overflow-y-auto">
                  {!isAuthenticated ? (
                    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                      <Lock className="w-16 h-16 text-blood-red/60 mb-4" />
                      <p className="text-xl font-bold text-vintage-cream/80 mb-2">
                        Accès Restreint
                      </p>
                      <p className="text-vintage-cream/60 text-sm max-w-md">
                        Vous devez être connecté en tant que membre pour voir les messages du canal de discussion.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-anthracite/50 rounded-lg p-4 border-l-4 border-patina-gold/40"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-patina-gold">
                            {msg.author}
                          </span>
                          <div className="flex items-center gap-2">
                            {msg.encrypted && (
                              <Lock className="w-4 h-4 text-blood-red" />
                            )}
                            <span className="text-xs text-vintage-cream/60">
                              {msg.time}
                            </span>
                          </div>
                        </div>
                        <p
                          className={`text-sm text-vintage-cream/80 font-mono ${
                            msg.encrypted ? "opacity-70" : ""
                          }`}
                          style={{
                            fontFamily: "'Courier New', monospace",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {msg.encrypted ? "*** MESSAGE CHIFFRÉ ***" : msg.content}
                        </p>
                      </motion.div>
                    ))}
                    </div>
                  )}
                </div>

                {isAuthenticated ? (
                  canWriteInChannel(selectedChannel) ? (
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleSendMessage();
                          }
                        }}
                        placeholder="Tapez votre message..."
                        className="flex-1 bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-4 py-3 text-vintage-cream placeholder:text-vintage-cream/40 focus:outline-none focus:border-patina-gold/60 font-mono"
                        style={{
                          fontFamily: "'Courier New', monospace",
                          letterSpacing: "0.05em",
                        }}
                      />
                      <button
                        onClick={handleSendMessage}
                        className="px-6 py-3 bg-patina-gold text-charcoal-black hover:bg-patina-gold-light transition-colors font-bold uppercase tracking-wider flex items-center gap-2"
                      >
                        <Send className="w-5 h-5" />
                        Envoyer
                      </button>
                    </div>
                  ) : (
                    <div className="text-center p-4 bg-blood-red/10 border-2 border-blood-red/40 rounded-lg">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-blood-red" />
                        <p className="text-blood-red font-bold text-sm uppercase tracking-wider">
                          Accès en lecture seule
                        </p>
                      </div>
                      <p className="text-vintage-cream/70 text-xs">
                        Vous ne pouvez que lire dans ce canal. Seuls le Pakhan, le Pervyi et le Sovetnik peuvent écrire. Montez dans la hiérarchie pour obtenir ce privilège.
                      </p>
                    </div>
                  )
                ) : (
                  <div className="text-center p-4 bg-anthracite/50 rounded-lg">
                    <p className="text-vintage-cream/70 text-sm">
                      Vous devez être connecté pour envoyer des messages
                    </p>
                  </div>
                )}

                <div className="mt-4 flex items-center gap-2 text-xs text-blood-red/70">
                  <Lock className="w-4 h-4" />
                  <span>Messages privés automatiquement chiffrés</span>
                </div>
              </GlareCard>
            </div>
          </div>
        </div>
      </div>
      <AlertComp />
    </div>
  );
}
