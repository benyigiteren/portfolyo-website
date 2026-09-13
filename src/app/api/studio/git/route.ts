import { NextResponse } from "next/server";
import { execSync } from "child_process";

export async function GET() {
  try {
    const cwd = process.cwd();

    let branch = "main";
    try {
      branch = execSync("git rev-parse --abbrev-ref HEAD", { cwd, encoding: "utf-8" }).trim();
    } catch {}

    let statusOutput = "";
    try {
      statusOutput = execSync("git status --short", { cwd, encoding: "utf-8" }).trim();
    } catch {}

    let lastCommit = "";
    try {
      lastCommit = execSync("git log -1 --oneline", { cwd, encoding: "utf-8" }).trim();
    } catch {}

    let remoteUrl = "";
    try {
      remoteUrl = execSync("git remote get-url origin", { cwd, encoding: "utf-8" }).trim();
    } catch {}

    let unpushedCount = 0;
    try {
      const revList = execSync(`git rev-list --count origin/${branch}..HEAD`, { cwd, encoding: "utf-8" }).trim();
      unpushedCount = parseInt(revList, 10) || 0;
    } catch {
      // Remote branch henüz izlenmiyor veya senkron değilse
    }

    const isDirty = statusOutput.length > 0;

    return NextResponse.json({
      success: true,
      branch,
      isDirty,
      unpushedCount,
      lastCommit,
      remoteUrl,
      statusLines: statusOutput ? statusOutput.split("\n") : [],
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Git bilgisi okunamadı.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Güvenlik: Sadece yerel ortamda çalıştığından emin ol
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Git push işlemi üretim ortamında güvenlik nedeniyle devre dışıdır." },
        { status: 403 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const message = (body.message && body.message.trim()) || "site: portfolyo içerik ve ayarları güncellendi [Studio]";
    const cwd = process.cwd();

    const logs: string[] = [];

    // 1. Aktif branch adını al
    let branch = "main";
    try {
      branch = execSync("git rev-parse --abbrev-ref HEAD", { cwd, encoding: "utf-8" }).trim();
      logs.push(`Aktif dal: ${branch}`);
    } catch (err: unknown) {
      logs.push(`Branch tespiti uyarısı: ${err instanceof Error ? err.message : String(err)}`);
    }

    // 2. Değişiklikleri stage et
    try {
      const stageCmd = body.stageAll !== false ? "git add -A" : "git add src/data/config.json src/lib/config.ts";
      const stageOut = execSync(stageCmd, { cwd, encoding: "utf-8" });
      logs.push(`Dosyalar hazırlandı (${stageCmd}).`);
      if (stageOut.trim()) logs.push(stageOut.trim());
    } catch (err: unknown) {
      logs.push(`Stage hatası: ${err instanceof Error ? err.message : String(err)}`);
    }

    // 3. Değişiklik var mı kontrol et ve commit oluştur
    let committed = false;
    try {
      const diffCheck = execSync("git diff --cached --quiet", { cwd });
      // diffCheck 0 ile çıkarsa değişiklik yok demektir
      logs.push("Yeni commite eklenecek içerik değişikliği bulunamadı, mevcut commitler kontrol ediliyor.");
    } catch {
      // diffCheck exit 1 ile çıkar = staged değişiklik var!
      try {
        const commitOut = execSync(`git commit -m "${message.replace(/"/g, '\\"')}"`, { cwd, encoding: "utf-8" });
        logs.push(`Commit oluşturuldu: "${message}"`);
        if (commitOut.trim()) logs.push(commitOut.trim());
        committed = true;
      } catch (err: unknown) {
        logs.push(`Commit hatası: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    // 4. GitHub'a Pushla
    let pushSuccess = false;
    let pushOutput = "";
    try {
      pushOutput = execSync(`git push origin ${branch}`, { cwd, encoding: "utf-8", timeout: 45000 });
      logs.push(`GitHub'a başarıyla gönderildi (git push origin ${branch})!`);
      if (pushOutput.trim()) logs.push(pushOutput.trim());
      pushSuccess = true;
    } catch (err: unknown) {
      const errorOutput = err instanceof Error ? (err as any).stderr || err.message : String(err);
      logs.push(`Git Push Hatası: ${errorOutput}`);
      return NextResponse.json(
        {
          success: false,
          error: "GitHub'a gönderim (git push) sırasında bir hata oluştu.",
          output: logs.join("\n"),
          details: errorOutput,
        },
        { status: 500 }
      );
    }

    // 5. Son güncel commit bilgisini al
    let newCommitHash = "";
    try {
      newCommitHash = execSync("git rev-parse --short HEAD", { cwd, encoding: "utf-8" }).trim();
    } catch {}

    return NextResponse.json({
      success: true,
      committed,
      branch,
      commitHash: newCommitHash,
      message,
      logs: logs.join("\n"),
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Git işlemi başarısız.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
