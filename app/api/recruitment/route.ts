import { NextRequest, NextResponse } from "next/server";

// Configuration pour l'envoi d'email
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || "radiachakir1982@gmail.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pseudo, discord, experience } = body;

    if (!pseudo || !discord || !experience) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Préparer le contenu de l'email
    const emailSubject = `Nouvelle candidature Bratva Volkov - ${pseudo}`;
    const emailContent = `
Bonjour,

Une nouvelle candidature a été soumise sur le site Bratva Volkov RP.

INFORMATIONS DU CANDIDAT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Pseudo RP: ${pseudo}
Discord: ${discord}
Expérience RP: ${experience}

Date de soumission: ${new Date().toLocaleString('fr-FR', {
  dateStyle: 'full',
  timeStyle: 'long'
})}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Bratva Volkov RP
    `.trim();

    // Essayer d'envoyer via différents services
    // Option 1: Utiliser Resend (recommandé)
    // Option 2: Utiliser SendGrid
    // Option 3: Utiliser un webhook (Discord, Slack)
    
    // Pour l'instant, on va utiliser un service simple
    // L'utilisateur devra configurer son service d'email préféré
    
    // Essayer d'envoyer via l'API Resend si disponible
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (RESEND_API_KEY) {
      try {
        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Bratva Volkov <noreply@bratvavolkov.fr>",
            to: [RECIPIENT_EMAIL],
            subject: emailSubject,
            text: emailContent,
          }),
        });

        if (resendResponse.ok) {
          return NextResponse.json(
            { success: true, message: "Email envoyé avec succès" },
            { status: 200 }
          );
        }
      } catch (error) {
        console.error("Erreur Resend:", error);
      }
    }

    // Si Resend n'est pas configuré, essayer SendGrid
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    
    if (SENDGRID_API_KEY) {
      try {
        const sendgridResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${SENDGRID_API_KEY}`,
          },
          body: JSON.stringify({
            personalizations: [{
              to: [{ email: RECIPIENT_EMAIL }],
              subject: emailSubject,
            }],
            from: { email: "noreply@bratvavolkov.fr", name: "Bratva Volkov" },
            content: [{
              type: "text/plain",
              value: emailContent,
            }],
          }),
        });

        if (sendgridResponse.ok) {
          return NextResponse.json(
            { success: true, message: "Email envoyé avec succès" },
            { status: 200 }
          );
        }
      } catch (error) {
        console.error("Erreur SendGrid:", error);
      }
    }

    // Si aucun service n'est configuré, retourner le contenu pour debug
    // En production, on devrait toujours avoir un service configuré
    console.log("Email à envoyer:", {
      to: RECIPIENT_EMAIL,
      subject: emailSubject,
      content: emailContent,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Candidature enregistrée (email non configuré)",
        emailContent: emailContent, // Pour debug
        note: "Configurez RESEND_API_KEY ou SENDGRID_API_KEY dans .env pour activer l'envoi d'email"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de l'email" },
      { status: 500 }
    );
  }
}
