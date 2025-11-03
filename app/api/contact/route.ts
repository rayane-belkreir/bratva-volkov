import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pseudo, channel, message, dossierId } = body;

    // Validation
    if (!pseudo || !channel || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Send email via a service (Resend, SendGrid, etc.)
    // 2. Send to Discord webhook
    // 3. Store in database

    // Example: Discord webhook
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          embeds: [
            {
              title: "Nouveau message de contact",
              fields: [
                { name: "Pseudo RP", value: pseudo },
                { name: "Canal", value: channel },
                { name: "Message", value: message },
                { name: "ID Dossier", value: dossierId || "N/A" },
              ],
              color: 0xc1a35f, // Gold color
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
    }

    // Example: Email (using a service like Resend)
    // const emailService = ...;
    // await emailService.send(...);

    return NextResponse.json(
      { success: true, dossierId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message" },
      { status: 500 }
    );
  }
}

