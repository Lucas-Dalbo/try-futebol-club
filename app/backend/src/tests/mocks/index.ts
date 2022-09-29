import * as bcrypt from 'bcryptjs';

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