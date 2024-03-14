export enum Role {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',

  USER = 'USER',

  AGENCY = 'AGENCY',
  SURVEYOR = 'SURVEYOR',
}

export type User = {
  id: number
  username: string
  role: Role

  agencyId?: string
}
