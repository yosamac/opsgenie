
export enum Level {
  FIRST = 1,
  SECOND = 2,
  LAST = 3
}

export type EmailTarget = {
  type: string;
  emailAddress: string;
};

type SmsTarget = {
  type: string;
  phoneNumber: string;
};

export type Target = EmailTarget | SmsTarget;

export abstract class PolicyLevel {

  private static levels: PolicyLevel[] = [];
  protected targets: Target[];

  constructor(
    protected readonly level: Level
  ) {
    PolicyLevel.levels[level] = this;
  }

  abstract nextLevel();

  static getPolicyLevel(level: Level): PolicyLevel {
    return PolicyLevel.levels[level];
  }
}