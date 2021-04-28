import { EPService } from "../adapters";
import { Pager } from "../service";

export enum Level {
  FIRST = 1,
  SECOND = 2,
  LAST = 3
}

export abstract class PolicyLevel {

  private static levels: PolicyLevel[] = [];
  protected targets: Pager[];

  constructor( protected readonly level: Level) {
    PolicyLevel.levels[level] = this;
  }
  
  abstract nextLevel()

  static getPolicyLevel(level: Level): PolicyLevel {
    return PolicyLevel.levels[level];
  }
}