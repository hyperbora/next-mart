/**
 * CLI에서 유저 이메일과 역할(role) 배열을 받아
 * roles 테이블에 추가/삭제하는 스크립트 (JS 버전)
 *
 * 사용법:
 * node scripts/setUserRoles.js 이메일 add:role1,role2
 * node scripts/setUserRoles.js 이메일 remove:role1,role2
 */

require("dotenv").config({ path: ".env.local" });

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // 서비스 롤 키 필수
);

async function main() {
  const email = process.argv[2];
  const actionArg = process.argv[3]; // add:admin,editor 또는 remove:editor

  if (!email || !actionArg) {
    console.error(
      "사용법: node scripts/setUserRoles.js 이메일 add/remove:role1,role2"
    );
    process.exit(1);
  }

  const [action, rolesStr] = actionArg.split(":");
  if (!rolesStr || !["add", "remove"].includes(action)) {
    console.error("사용법: add:role1,role2 또는 remove:role1,role2");
    process.exit(1);
  }

  const roles = rolesStr.split(",").map((r) => r.trim());

  // 1️⃣ 이메일로 유저 조회
  const { data: users, error: fetchError } =
    await supabase.auth.admin.listUsers();
  if (fetchError) throw fetchError;

  const user = users.users.find((u) => u.email === email);
  if (!user) {
    console.error("❌ 해당 이메일의 유저를 찾을 수 없습니다:", email);
    process.exit(1);
  }

  if (action === "add") {
    for (const role of roles) {
      // 이미 존재하면 skip
      const { data: existing } = await supabase
        .from("roles")
        .select("*")
        .eq("user_id", user.id)
        .eq("role", role)
        .single();

      if (!existing) {
        await supabase.from("roles").insert({ user_id: user.id, role });
      }
    }
    console.log(`✅ ${email} → 역할 추가: [${roles.join(", ")}]`);
  } else if (action === "remove") {
    await supabase
      .from("roles")
      .delete()
      .eq("user_id", user.id)
      .in("role", roles);
    console.log(`✅ ${email} → 역할 제거: [${roles.join(", ")}]`);
  }
}

main();
