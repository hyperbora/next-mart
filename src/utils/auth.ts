import { createServerClient } from "@/utils/supabase/server";

/**
 * 특정 유저가 지정된 모든 권한을 가지고 있는지 확인
 * @param userId 유저 ID
 * @param roles 필요한 권한 배열 (예: ["admin", "editor"])
 * @returns boolean
 */
export async function checkRoles(userId: string, roles: string[]) {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("roles")
    .select("role")
    .eq("user_id", userId);

  if (error) throw error;

  const userRoles = data?.map((r) => r.role) ?? [];

  // 모든 권한이 포함되어 있어야 true
  return roles.every((role) => userRoles.includes(role));
}

/**
 * 어드민 권한만 체크하는 헬퍼 함수
 */
export async function checkAdmin(userId: string) {
  return checkRoles(userId, ["admin"]);
}
