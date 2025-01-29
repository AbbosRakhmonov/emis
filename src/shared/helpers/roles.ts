/**
 * Функция для перевода ключа роли на её название.
 * @param roleKey Ключ роли.
 * @returns Название роли на русском языке.
 */
export function translateRole(roleKey: string): string {
  const roleTranslations: Record<string, string> = {
    isemid_labarant: 'Лаборант',
    isemid_epidim_head: 'Врач-эпидемиолог',
    isemid_epidemiologist: 'Эпидемиолог',
    isemid_super_admin: 'Супер-администратор',
    isemid_admin: 'Администратор',
    isemid_general_practitioner: 'Общий врач',
    isemid_head_doctor: 'Главный врач',
  };

  return roleTranslations[roleKey] || 'Неизвестная роль';
}
