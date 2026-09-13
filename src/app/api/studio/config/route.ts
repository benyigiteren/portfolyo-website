import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CONFIG_PATH = path.join(process.cwd(), "src", "data", "config.json");
const BACKUP_DIR = path.join(process.cwd(), "src", "data", "backups");

export async function GET() {
  try {
    if (!fs.existsSync(CONFIG_PATH)) {
      return NextResponse.json({ error: "config.json dosyası bulunamadı." }, { status: 404 });
    }
    const content = fs.readFileSync(CONFIG_PATH, "utf-8");
    const data = JSON.parse(content);
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Bilinmeyen hata";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Güvenlik: Sadece yerel ortamda çalıştığından emin ol
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Studio yapılandırma kaydetme işlemi üretim (production) ortamında devre dışıdır." },
        { status: 403 }
      );
    }

    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Geçersiz yapılandırma verisi." }, { status: 400 });
    }

    // Yedekleme klasörünü oluştur
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }

    // Mevcut config'i yedekle
    if (fs.existsSync(CONFIG_PATH)) {
      const current = fs.readFileSync(CONFIG_PATH, "utf-8");
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const backupFile = path.join(BACKUP_DIR, `config-backup-${timestamp}.json`);
      fs.writeFileSync(backupFile, current, "utf-8");
    }

    // Yeni veriyi düzgün formatta (2 boşluk girintili) yaz
    const formatted = JSON.stringify(body, null, 2);
    fs.writeFileSync(CONFIG_PATH, formatted, "utf-8");

    return NextResponse.json({
      success: true,
      message: "Yapılandırma başarıyla kaydedildi.",
      savedAt: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Dosya yazma hatası";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
