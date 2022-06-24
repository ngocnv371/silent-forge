export interface CombatStatus {
  addedMaximumLife: number;
  addedMaximumMana: number;
  addedArmour: number;
  addedEvasion: number;
  addedEnergyShield: number;

  addedFireResistance: number;
  addedColdResistance: number;
  addedLightningResistance: number;
  addedChaosResistance: number;

  addedPhysicalDamage: number;
  addedColdDamage: number;
  addedLightningDamage: number;
  addedFireDamage: number;
  addedChaosDamage: number;

  increasedPhysicalDamage: number;
  increasedColdDamage: number;
  increasedLightningDamage: number;
  increasedFireDamage: number;
  increasedChaosDamage: number;

  increasedCriticalChance: number;
  increasedCriticalMultiplier: number;
}

export interface Hit {
  physical: number;
  cold: number;
  lightning: number;
  fire: number;
  chaos: number;
}

export type Damage = Hit;
