
export type Target = {
  type: 'EMAIL_TARGET'
  parameters: IParametersEmail
} | {
  type: 'SMS_TARGET'
  parameters: IParametersSms
};

export interface IParametersEmail {
  email: string;
}
export interface IParametersSms {
  phoneNumber: string;
}

export type PolicyLevel = {
  level: number,
  notified: boolean,
  targets: Target[]
};

export type EP = {
  svcId: string;
  policyLevels: PolicyLevel[]
};
