import * as bcrypt from 'bcryptjs';
import { createJWT } from '../../auth'

export const mockValidUser = {
  email: "ronaldo@fenomeno.com",
  password: bcrypt.hashSync("EuSouRonaldo09"),
};

export const sendValidUser = {
  email: "ronaldo@fenomeno.com",
  password: "EuSouRonaldo09",
}

export const mockInvalidUser = {
  email: "messi@messi.com",
  password: "messiOficial"
}

export const noEmailUser = {
  password: '987654'
}

export const noPasswordUser = {
  email: 'seguranca@zero.com'
}

export const mockToken = createJWT(mockValidUser);

export const roleUser = {
  email: "ronaldo@fenomeno.com",
  password: "EuSouRonaldo09",
  role: "boleiro"
}

export const mockTeams = [
  {
    id: 1,
    teamName: "Avaí/Kindermann"
  },
  {
    id: 2,
    teamName: "Bahia"
  },
  {
    id: 3,
    teamName: "Botafogo"
  },
]