import { z } from "zod"

export type RoleSkillEntry = { role: 0 | 1 | 2; weight: number }

const roleSchema = z.union([z.literal(0), z.literal(1), z.literal(2)])

/** Exactly 3 entries, one per role (0=Healer, 1=Tank, 2=Dps), ordered best role first. */
export const roleSkillsSchema = z
  .array(z.object({ role: roleSchema, weight: z.number().min(0).max(1) }))
  .length(3)
  .refine(
    (entries) => new Set(entries.map((entry) => entry.role)).size === 3,
    { message: "roleSkills must cover each role (0, 1, 2) exactly once" },
  )

export const DEFAULT_ROLE_SKILLS = [
  { role: 0, weight: 0.5 },
  { role: 1, weight: 0.4 },
  { role: 2, weight: 0.4 },
]
