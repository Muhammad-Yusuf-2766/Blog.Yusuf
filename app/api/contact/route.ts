// app/api/contact/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const { name, email, subject, message } = await req.json()

		if (!name || !message) {
			return NextResponse.json(
				{ ok: false, error: 'name/message required' },
				{ status: 400 }
			)
		}

		const token = process.env.TELEGRAM_BOT_TOKEN!
		const chatId = process.env.TELEGRAM_CHAT_ID!

		const text =
			`📩 New Contact\n\n` +
			`👤 Name: ${name}\n` +
			`📧 Email: ${email || '-'}\n` +
			`🪪 Subject: ${subject || '-'}\n\n` +
			`📝 Message:\n${message}`

		const tgRes = await fetch(
			`https://api.telegram.org/bot${token}/sendMessage`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ chat_id: chatId, text }),
			}
		)

		if (!tgRes.ok) {
			const errText = await tgRes.text()
			return NextResponse.json({ ok: false, error: errText }, { status: 500 })
		}

		return NextResponse.json({ ok: true })
	} catch (e) {
		return NextResponse.json(
			{ ok: false, error: 'Server error' },
			{ status: 500 }
		)
	}
}
